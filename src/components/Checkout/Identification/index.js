import React, { useEffect, useState } from "react";
import {
	ArrowRight,
	Button,
	Container,
	Disclaimer,
	EditIcon,
	ErrorMessage,
	Header,
	IdentificationFinalText,
	IdentificationFinalTitle,
	InputDefault,
	InputMobileCode,
	InputMobileContainer,
	Label,
	Step,
	StyledCheckIcon,
	StyledForm,
	StyledInputMask,
	Title,
} from "./Identification.style";
import { Tooltip } from "@mui/material";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { isValidCPF } from "../../../utils/isValidCpf";
import { useDispatch, useSelector } from "react-redux";
import {
	setIdentification,
	handleEditingIdentification,
} from "../../../redux/identificationSlice";
import axios from "axios";

const validationSchema = Yup.object({
	name: Yup.string()
		.required("Campo obrigatório.")
		.matches(
			/^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+(?: [A-Za-zÀ-ÖØ-öø-ÿ0-9]+)+$/,
			"Digite seu nome completo.",
		)
		.matches(/^[a-zA-ZÀ-ÿ\s]+$/, "O nome deve conter apenas letras e espaços."),
	email: Yup.string()
		.required("Campo obrigatório.")
		.email("Digite um e-mail válido.")
		.matches(
			/^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/,
			"Digite um e-mail válido.",
		),
	cpf: Yup.string()
		.required("Campo obrigatório.")
		.matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Digite um CPF válido.")
		.test(
			"is-valid-cpf",
			"Digite um CPF válido.",
			(value) => value && isValidCPF(value),
		),
	mobile: Yup.string()
		.required("Campo obrigatório.")
		.matches(
			/^\(?\d{2}\)? ?9\d{4}-?\d{4}$/,
			"Digite um número de celular válido.",
		),
});

function Identification() {
	const { hasFinished, isEditing, name, email, cpf } = useSelector(
		(state) => state.identification,
	);

	const { data } = useSelector((state) => state.summary);

	const [initialValues, setInitialValues] = useState({
		name: "",
		email: "",
		cpf: "",
		mobile: "",
	});

	const dispatch = useDispatch();
	const handleSetIdentification = (payload) => {
		dispatch(setIdentification(payload));

		localStorage.setItem("Sterily_Buyer_Name", payload.name);

		const queryParams = new URLSearchParams(window.location.search);
		const cartId = queryParams.get("cartId");
		axios.put(
			`${process.env.REACT_APP_API_URL}/cart/${cartId}`,
			{
				status: "DADOS CLIENTE CAPTURADOS",
				dados_capturados: {
					nome: payload.name,
					email: payload.email,
					cpf: payload.cpf,
					celular: payload.mobile,
				},
			},
			{
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
				},
			},
		);
	};

	useEffect(() => {
		const cachedData =
			data?.dados_capturados?.nome &&
			data.dados_capturados.email &&
			data.dados_capturados.cpf &&
			data.dados_capturados.nome &&
			data.dados_capturados.celular;
		if (cachedData) {
			const cachedDataObject = {
				name: data.dados_capturados.nome,
				email: data.dados_capturados.email,
				mobile: data.dados_capturados.celular,
				cpf: data.dados_capturados.cpf,
			};
			setInitialValues(cachedDataObject);
			handleSetIdentification(cachedDataObject);
		}
		// eslint-disable-next-line
	}, [data]);

	const editData = () => {
		if (!isEditing) {
			dispatch(handleEditingIdentification());
		}
	};
	return (
		<Container
			onClick={editData}
			id="step-1"
			success={!isEditing && hasFinished}
		>
			<Header>
				<Step success={!isEditing && hasFinished}>1</Step>
				<Title success={!isEditing && hasFinished}>Identifique-se</Title>
				{!isEditing && hasFinished && (
					<>
						<StyledCheckIcon />
						<Tooltip title="Editar" placement="top" arrow>
							<EditIcon />
						</Tooltip>
					</>
				)}
			</Header>
			{isEditing && (
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						handleSetIdentification(values);
					}}
				>
					{({ errors, touched, setFieldValue }) => (
						<StyledForm>
							<Disclaimer>
								Utilizaremos seu e-mail para: Identificar seu perfil, histórico
								de compra, notificação de pedidos e carrinho de compras.
							</Disclaimer>

							<Label>Nome completo</Label>
							<Field
								name="name"
								as={InputDefault}
								placeholder="ex.: Maria de Almeida Cruz"
								error={touched.name && !!errors.name}
								isValid={touched.name && !errors.name}
							/>
							{touched.name && errors.name && (
								<ErrorMessage>{errors.name}</ErrorMessage>
							)}

							<Label>E-mail</Label>
							<Field
								name="email"
								as={InputDefault}
								placeholder="ex.: maria@gmail.com"
								error={touched.email && !!errors.email}
								isValid={touched.email && !errors.email}
								onChange={(e) => {
									const lowerCaseEmail = e.target.value.toLowerCase();
									e.target.value = lowerCaseEmail; // Atualiza o valor no campo
									setFieldValue("email", lowerCaseEmail); // Atualiza o valor no Formik
								}}
							/>
							{touched.email && errors.email && (
								<ErrorMessage>{errors.email}</ErrorMessage>
							)}

							<Label>CPF</Label>
							<Field
								name="cpf"
								as={StyledInputMask}
								mask="999.999.999-99"
								small
								placeholder="000.000.000-00"
								error={touched.cpf && !!errors.cpf}
								isValid={touched.cpf && !errors.cpf}
							/>
							{touched.cpf && errors.cpf && (
								<ErrorMessage>{errors.cpf}</ErrorMessage>
							)}

							<Label>Celular / WhatsApp</Label>
							<InputMobileContainer>
								<InputMobileCode>+55</InputMobileCode>
								<Field
									name="mobile"
									as={StyledInputMask}
									mask="(99) 99999-9999"
									phone
									placeholder="(00) 00000-0000"
									error={touched.mobile && !!errors.mobile}
									isValid={touched.mobile && !errors.mobile}
								/>
							</InputMobileContainer>
							{touched.mobile && errors.mobile && (
								<ErrorMessage>{errors.mobile}</ErrorMessage>
							)}

							<Button type="submit">
								Continuar
								<ArrowRight />
							</Button>
						</StyledForm>
					)}
				</Formik>
			)}
			{!isEditing && hasFinished && (
				<>
					<IdentificationFinalTitle>{name}</IdentificationFinalTitle>
					<IdentificationFinalText>{email}</IdentificationFinalText>
					<IdentificationFinalText>CPF {cpf}</IdentificationFinalText>
				</>
			)}
		</Container>
	);
}

export default Identification;
