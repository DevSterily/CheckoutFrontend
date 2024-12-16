import React, { useEffect, useState } from "react";
import {
  AddressContainer,
  Button,
  City,
  Container,
  Disclaimer,
  Header,
  InputDefault,
  Label,
  Step,
  Title,
  NewAddressButton,
  DeliveryCard,
  RadioButton,
  DeliveryTitle,
  DeliveryDescription,
  EditIcon,
  DeleteIcon,
  DeliveryLabel,
  DeliveryPrice,
  DeliveryDiscount,
  ArrowRight,
  FinalEditIcon,
  StyledCheckIcon,
  DeliveryFinalTitle,
  DeliveryFinalText,
  StyledForm,
  StyledInputMask,
  ErrorMessage,
  StyledLoading,
  BackButton,
} from "./Delivery.style";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { cancelEditingIdentification } from "../../../redux/identificationSlice";
import {
  setAddresses,
  newAddress,
  listAddress,
  selectAddress,
  editAddresses,
  finishDelivery,
  editDelivery,
  setCostumerId,
} from "../../../redux/deliverySlice";

const validationSchema = Yup.object({
  zipCode: Yup.string()
    .required("Campo obrigatório.")
    .matches(/^\d{5}-\d{3}$/, "CEP inválido."),
  number: Yup.string().required("Campo obrigatório."),
  recipient: Yup.string()
    .required("Campo obrigatório.")
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+(?: [A-Za-zÀ-ÖØ-öø-ÿ0-9]+)+$/,
      "Digite seu nome completo."
    )
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "O nome deve conter apenas letras e espaços."),
  additionalData: Yup.string(),
});

function Delivery() {
  const {
    hasFinished: lastStepHasFinished,
    isEditing: isEditingLastStep,
    name: recipientName,
  } = useSelector((state) => state.identification);

  const { hasFinished, addresses, step, selectedAddress, isEditing } =
    useSelector((state) => state.delivery);

  const { data } = useSelector((state) => state.summary);

  useEffect(() => {
    if (lastStepHasFinished) {
      const currentStep = document.getElementById("step-2");
      if (currentStep) {
        const elementPosition =
          currentStep.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - 10;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  }, [lastStepHasFinished]);

  const [address, setAddress] = useState(undefined);
  const [hasError, setHasError] = useState(false);
  const [hasCalledApi, setHasCalledApi] = useState(false);

  const [lastZipCode, setLastZipCode] = useState();
  const getAddress = async (zipCode) => {
    setLastZipCode(zipCode);
    try {
      await axios
        .get(`https://brasilapi.com.br/api/cep/v1/${zipCode}`)
        .then((results) => {
          setHasError(false);
          setAddress(results.data);
          setHasCalledApi(false);
        })
        .catch(() => {
          setHasError(address.cep === zipCode ? false : true);
          setHasCalledApi(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [initialValues, setInitialValues] = useState({
    zipCode: "",
    number: "",
    recipient: recipientName,
    additionalData: "",
  });

  useEffect(() => {
    setInitialValues({
      zipCode: "",
      number: "",
      recipient: recipientName || "",
      additionalData: "",
    });
  }, [recipientName]);

  const [currentEditingAddress, setCurrentEditingAddress] = useState(undefined);

  const dispatch = useDispatch();
  const handleSetAddresses = (payload) => {
    if (currentEditingAddress >= 0) {
      dispatch(
        editAddresses([
          ...addresses.filter((_, index) => index !== currentEditingAddress),
          { ...payload, ...address },
        ])
      );
      setCurrentEditingAddress(undefined);
      setAddress(undefined);
    } else {
      dispatch(setAddresses({ ...payload, ...address }));
      const queryParams = new URLSearchParams(window.location.search);
      const cartId = queryParams.get("cartId");
      axios.put(
        `${process.env.REACT_APP_API_URL}/cart/${cartId}`,
        {
          status: "ENDERECO CLIENTE CAPTURADOS",
          dados_capturados: {
            cep: payload.zipCode,
            bairro: address.neighborhood,
            cidade: address.city,
            estado: address.state,
            numero: parseInt(payload.number),
            complemento: payload.additionalData || "",
            endereco: address.street,
          },
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );
      setAddress(undefined);
    }
  };

  const editData = () => {
    if (isEditingLastStep && lastStepHasFinished) {
      dispatch(cancelEditingIdentification());
    } else {
      if (!isEditing) {
        dispatch(editDelivery());
      }
    }
  };

  const addNewAddress = () => {
    setInitialValues({
      zipCode: "",
      number: "",
      recipient: recipientName,
      additionalData: "",
    });
    setAddress(undefined);
    dispatch(newAddress());
  };

  const goBack = () => {
    dispatch(listAddress());
  };

  const handleSelectedAddress = (index) => {
    dispatch(selectAddress(index));
  };

  const handleEditAddress = (index) => {
    setCurrentEditingAddress(index);
    dispatch(newAddress());
    setInitialValues(addresses[index]);
  };

  const handleDeleteAddress = (indexAddress) => {
    dispatch(
      editAddresses([...addresses.filter((_, index) => index !== indexAddress)])
    );
  };

  const handleFinishDelivery = () => {
    dispatch(finishDelivery());
  };

  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.removeItem("STERILY_CHECKOUT_ADDRESS");
      localStorage.setItem(
        "STERILY_CHECKOUT_ADDRESS",
        JSON.stringify(addresses)
      );
      handleSelectedAddress(addresses.length - 1);
    } else {
      addNewAddress();
    }
    // eslint-disable-next-line
  }, [addresses]);

  useEffect(() => {
    localStorage.removeItem("STERILY_CHECKOUT_DELIVERY_SA");
    localStorage.setItem("STERILY_CHECKOUT_DELIVERY_SA", selectedAddress);
  }, [selectedAddress]);

  useEffect(() => {
    const cachedData =
      data &&
      data.dados_capturados &&
      data.dados_capturados.endereco &&
      data.dados_capturados.numero &&
      data.dados_capturados.cidade &&
      data.dados_capturados.estado &&
      data.dados_capturados.bairro &&
      data.dados_capturados.cep &&
      data.dados_capturados.nome;
    if (cachedData) {
      const cachedDataObject = {
        zipCode: data.dados_capturados.cep,
        number: data.dados_capturados.numero.toString(),
        recipient: data.dados_capturados.nome,
        additionalData: data.dados_capturados.complemento || "",
        cep: data.dados_capturados.cep,
        state: data.dados_capturados.estado,
        city: data.dados_capturados.cidade,
        neighborhood: data.dados_capturados.bairro,
        street: data.dados_capturados.endereco,
      };
      dispatch(editAddresses([cachedDataObject]));
      handleSelectedAddress(0);
      dispatch(finishDelivery());
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/customer`,
          {
            name: data.dados_capturados.nome,
            type: "individual",
            gender: "male",
            email: data.dados_capturados.email,
            document_type: "cpf",
            document: data.dados_capturados.cpf,
            address_country: "BR",
            address_state: data.dados_capturados.estado,
            address_city: data.dados_capturados.cidade,
            address_zip_code: data.dados_capturados.cep.replace("-", ""),
            address_line_1: data.dados_capturados.endereco,
            address_line_2: data.dados_capturados.complemento || "",
            phones_mobile_phone_country_code: "55",
            phones_mobile_phone_area_code: data.dados_capturados.celular
              .split(" ")[0]
              .replace("(", "")
              .replace(")", ""),
            phones_mobile_phone_number: data.dados_capturados.celular
              .split(" ")[1]
              .replace("-", ""),
            phones_home_phone_country_code: "55",
            phones_home_phone_area_code: data.dados_capturados.celular
              .split(" ")[0]
              .replace("(", "")
              .replace(")", ""),
            phones_home_phone_number: data.dados_capturados.celular
              .split(" ")[1]
              .replace("-", "")
              .substring(1),
            birthdate: "19-07-1990",
          },
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
          }
        )
        .then((results) => {
          dispatch(setCostumerId(results.data.id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [data]);

  const hasDeliveryTax = data?.resumo?.total < 10000;

  return (
    <Container
      id="step-2"
      onClick={editData}
      success={
        (isEditingLastStep && lastStepHasFinished) ||
        (!isEditing && hasFinished)
      }
      closed={!lastStepHasFinished}
    >
      <Header>
        <Step
          success={!isEditing && hasFinished}
          closed={isEditingLastStep || !lastStepHasFinished}
        >
          2
        </Step>
        <Title success={!isEditing && hasFinished}>Entrega</Title>
        {!isEditing && hasFinished && (
          <>
            <StyledCheckIcon />
            <Tooltip title="Editar" placement="top" arrow>
              <FinalEditIcon />
            </Tooltip>
          </>
        )}
      </Header>
      {!lastStepHasFinished && (
        <Disclaimer>
          Preencha suas informações pessoais para continuar
        </Disclaimer>
      )}
      {!isEditingLastStep && lastStepHasFinished && step === 1 && (
        <>
          <Disclaimer>Cadastre ou selecione um endereço</Disclaimer>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSetAddresses(values);
            }}
          >
            {({ errors, touched, values }) => {
              const zipCodeRegex = /^\d{5}-\d{3}$/;
              if (
                hasError &&
                values.zipCode.length === 9 &&
                zipCodeRegex.test(values.zipCode) &&
                lastZipCode !== values.zipCode.replace("-", "")
              ) {
                setHasError(false);
              }
              if (
                values.zipCode.length === 9 &&
                zipCodeRegex.test(values.zipCode) &&
                (!address || address.cep !== values.zipCode.replace("-", "")) &&
                !hasCalledApi &&
                !hasError
              ) {
                setHasCalledApi(true);
                getAddress(values.zipCode.replace("-", ""));
              }

              return (
                <StyledForm>
                  {addresses.length >= 1 && (
                    <BackButton onClick={goBack}>{`< Voltar`}</BackButton>
                  )}
                  <Label>CEP</Label>
                  <Field
                    name="zipCode"
                    as={StyledInputMask}
                    mask="99999-999"
                    small
                    error={hasError || (touched.zipCode && !!errors.zipCode)}
                    isValid={
                      !hasCalledApi &&
                      !hasError &&
                      touched.zipCode &&
                      !errors.zipCode
                    }
                    disabled={hasCalledApi}
                  />
                  {hasCalledApi && <StyledLoading color="inherit" />}
                  {(hasError || (touched.zipCode && errors.zipCode)) && (
                    <ErrorMessage>
                      {errors.zipCode || "CEP inválido."}
                    </ErrorMessage>
                  )}
                  {address && !hasError && (
                    <>
                      <City>
                        {address.city} / {address.state}
                      </City>
                      <Label>Endereço</Label>
                      <InputDefault
                        disabled
                        isValid
                        value={address?.street}
                      ></InputDefault>
                      <AddressContainer>
                        <div>
                          <Label>Número</Label>
                          <Field
                            name="number"
                            as={InputDefault}
                            number
                            error={touched.number && !!errors.number}
                            isValid={touched.number}
                          />
                          {touched.number && errors.number && (
                            <ErrorMessage>{errors.number}</ErrorMessage>
                          )}
                        </div>
                        <div>
                          <Label>Bairro</Label>
                          <InputDefault
                            disabled
                            isValid
                            value={address.neighborhood}
                          ></InputDefault>
                        </div>
                      </AddressContainer>
                      <Label>
                        Complemento <small>{`(opcional)`}</small>
                      </Label>
                      <Field
                        name="additionalData"
                        as={InputDefault}
                        isValid={touched.additionalData}
                      />
                      <Label>Destinatário</Label>
                      <Field
                        name="recipient"
                        as={InputDefault}
                        error={touched.recipient && !!errors.recipient}
                        isValid={touched.recipient && !errors.recipient}
                      />
                      {touched.recipient && errors.recipient && (
                        <ErrorMessage>{errors.recipient}</ErrorMessage>
                      )}
                      <Button type="submit">Salvar</Button>
                    </>
                  )}
                </StyledForm>
              );
            }}
          </Formik>
        </>
      )}
      {!isEditingLastStep && step === 2 && isEditing && (
        <>
          <NewAddressButton onClick={addNewAddress}>
            + Novo Endereço
          </NewAddressButton>
          {addresses.map((address, index) => {
            return (
              <DeliveryCard
                onClick={() => {
                  handleSelectedAddress(index);
                }}
                key={index}
                checked={selectedAddress === index}
              >
                <RadioButton checked={selectedAddress === index}></RadioButton>
                <DeliveryTitle>
                  {address?.street}, {address.number} - {address.neighborhood}
                </DeliveryTitle>
                <DeliveryDescription>
                  {address.city}-{address.state} | CEP {address.zipCode}
                </DeliveryDescription>
                <Tooltip title="Editar" placement="top" arrow>
                  <EditIcon
                    onClick={() => {
                      handleEditAddress(index);
                    }}
                  />
                </Tooltip>
                <Tooltip title="Excluir" placement="top" arrow>
                  <DeleteIcon
                    onClick={() => {
                      handleDeleteAddress(index);
                    }}
                  />
                </Tooltip>
              </DeliveryCard>
            );
          })}
          <DeliveryLabel>Escolha uma forma de entrega:</DeliveryLabel>
          <DeliveryCard shipping checked>
            <RadioButton checked></RadioButton>
            <DeliveryTitle big>Rápida - 1 a 4 dias</DeliveryTitle>
            <DeliveryDescription big>Entrega garantida</DeliveryDescription>
            <DeliveryPrice free={!hasDeliveryTax}>R$ 18,00</DeliveryPrice>
            {!hasDeliveryTax && <DeliveryDiscount>Grátis</DeliveryDiscount>}
          </DeliveryCard>
          <Button onClick={handleFinishDelivery}>
            Continuar
            <ArrowRight />
          </Button>
        </>
      )}
      {!isEditing && hasFinished && (
        <>
          <DeliveryFinalTitle>Endereço para entrega:</DeliveryFinalTitle>
          <DeliveryFinalText>
            {`${addresses[selectedAddress]?.street}, ${addresses[selectedAddress]?.number} - ${addresses[selectedAddress]?.neighborhood}`}
          </DeliveryFinalText>
          <DeliveryFinalText>{`${addresses[selectedAddress]?.city}-${addresses[selectedAddress]?.state} | CEP ${addresses[selectedAddress]?.cep}`}</DeliveryFinalText>
          <DeliveryFinalTitle>Forma de entrega:</DeliveryFinalTitle>
          <DeliveryFinalText>
            Rápida - 1 a 4 dias {hasDeliveryTax ? "R$ 18,00" : "Grátis"}
          </DeliveryFinalText>
        </>
      )}
    </Container>
  );
}

export default Delivery;
