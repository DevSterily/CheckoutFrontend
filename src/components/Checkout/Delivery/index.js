import React, { useEffect, useState, useRef } from "react";
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
  ZipCodeContainer,
} from "./Delivery.style";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { cancelEditingIdentification } from "../../../redux/identificationSlice";
import {
  newAddress,
  selectAddress,
  editAddresses,
  finishDelivery,
  editDelivery,
  setCostumerId,
} from "../../../redux/deliverySlice";
import { setCheckoutData } from "../../../redux/summarySlice";

const validationSchema = Yup.object({
  zipCode: Yup.string()
    .required("Campo obrigatório.")
    .matches(/^\d{5}-\d{3}$/, "CEP inválido."),
  number: Yup.string().required("Campo obrigatório."),
  recipient: Yup.string()
    .required("Campo obrigatório.")
    .trim()
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+(?: [A-Za-zÀ-ÖØ-öø-ÿ0-9]+)+$/,
      "Digite seu nome completo."
    )
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "O nome deve conter apenas letras e espaços."),
  additionalData: Yup.string().trim(),
});

function Delivery() {
  const { hasFinished: lastStepHasFinished, isEditing: isEditingLastStep } =
    useSelector((state) => state.identification);

  const { isEditing: paymentEditing } = useSelector((state) => state.payment);

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

  const formikRef = useRef(null); // Referência ao Formik
  const [address, setAddress] = useState(undefined);
  const [hasError, setHasError] = useState(false);
  const [hasCalledApi, setHasCalledApi] = useState(false);
  const [shouldFocusOnNumber, setShouldFocusOnNumber] = useState(false);

  // useEffect(() => {
  // 	const storedName = localStorage.getItem("Sterily_Buyer_Name");
  // 	if (storedName && formikRef.current) {
  // 		formikRef.current.setFieldValue("recipient", storedName); // Atualiza o valor no Formik
  // 	}
  // }, []); // Executa apenas uma vez ao montar o componente

  const [lastZipCode, setLastZipCode] = useState();
  const getAddress = async (zipCode) => {
    setLastZipCode(zipCode);

    if (lastZipCode && zipCode && lastZipCode.trim() === zipCode.trim()) {
      return;
    }
    try {
      await axios
        .get(`https://brasilapi.com.br/api/cep/v1/${zipCode}`)
        .then((results) => {
          const storedName = localStorage.getItem("Sterily_Buyer_Name");
          if (storedName && formikRef.current) {
            formikRef.current.setFieldValue("recipient", storedName); // Atualiza o valor no Formik
          }

          setHasError(false);
          if (
            results.data &&
            results?.data?.street === "" &&
            results?.data?.neighborhood === "" &&
            addresses[0]?.street !== "" &&
            addresses[0]?.neighborhood !== ""
          ) {
            setAddress({
              ...results.data,
              street: addresses[0]?.street,
              neighborhood: addresses[0]?.neighborhood,
            });
          } else {
            setAddress(results.data);
          }
          setHasCalledApi(false);
          if (!results.data.street || results?.data?.street === "") {
            setShouldFocusOnNumber(false);
          } else {
            setShouldFocusOnNumber(true);
          }

          // Verificação de bairro removida - não é mais necessária
        })
        .catch(() => {
          setHasError(address.cep === zipCode ? false : true);
          setHasCalledApi(false);
        });

      // setInitialValues({
      // 	...initialValues,
      // 	recipient: localStorage.getItem("Sterily_Buyer_Name"),
      // });
    } catch (error) {
      setHasError(true);
      setHasCalledApi(false);
    }
  };

  console.log(localStorage.getItem("Sterily_Buyer_Name"));

  // Foca no campo número apenas quando a API do CEP retorna uma rua
  useEffect(() => {
    if (
      shouldFocusOnNumber &&
      address &&
      address.street &&
      address.street !== "" &&
      hasCalledApi === false
    ) {
      // Pequeno delay para garantir que o campo esteja renderizado
      setTimeout(() => {
        const numberInput = document.querySelector('input[name="number"]');
        if (numberInput) {
          numberInput.focus();
        }
      }, 200);
      // Reset da flag para evitar foco em edições manuais
      setShouldFocusOnNumber(false);
    }
  }, [shouldFocusOnNumber, address, hasCalledApi]);

  const [initialValues, setInitialValues] = useState({
    zipCode: "",
    number: "",
    // recipient: recipientName,
    recipient: localStorage.getItem("Sterily_Buyer_Name"),
    additionalData: "",
  });

  // useEffect(() => {
  // 	setInitialValues((prevValues) => ({
  // 		...prevValues,
  // 		recipient: localStorage.getItem("Sterily_Buyer_Name") || "", // Atualiza o nome do localStorage
  // 	}));
  // }, []);

  // useEffect(() => {
  // 	setInitialValues({
  // 		zipCode: "",
  // 		number: "",
  // 		// recipient: recipientName || "",
  // 		recipient: localStorage.getItem("Sterily_Buyer_Name"),
  // 		additionalData: "",
  // 	});
  // }, [recipientName]);

  // const [currentEditingAddress, setCurrentEditingAddress] = useState(undefined);

  const dispatch = useDispatch();

  // Carrega os dados do endereço confirmado quando o usuário voltar para editar
  useEffect(() => {
    if (addresses.length > 0) {
      const savedAddress = addresses[0];
      setInitialValues({
        zipCode: savedAddress.zipCode,
        number: savedAddress.number,
        recipient: savedAddress.recipient,
        additionalData: savedAddress.additionalData || "",
      });
      setAddress({
        street: savedAddress.street,
        neighborhood: savedAddress.neighborhood,
        city: savedAddress.city,
        state: savedAddress.state,
        cep: savedAddress.cep,
      });
      setLastZipCode(savedAddress.cep.replace("-", ""));

      dispatch(newAddress());
    }
    // eslint-disable-next-line
  }, [isEditing, hasFinished]);

  const handleSetAddresses = (payload) => {
    const queryParams = new URLSearchParams(window.location.search);
    const cartId = queryParams.get("cartId");

    const updatedAddress = {
      ...address,
      recipient: payload.recipient?.trim(),
      additionalData: payload.additionalData?.trim(),
      number: payload.number?.trim(),
      zipCode: payload.zipCode?.trim(),
    };

    dispatch(editAddresses([updatedAddress]));

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/cart/${cartId}`,
        {
          status: "ENDERECO CLIENTE CAPTURADOS",
          dados_capturados: {
            cep: payload.zipCode,
            bairro: address.neighborhood.trim(),
            cidade: address.city.trim(),
            estado: address.state.trim(),
            numero: parseInt(payload.number.trim()),
            complemento: payload.additionalData.trim() || "",
            endereco: address.street.trim(),
          },
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
      .then(() => {
        dispatch(
          setCheckoutData({
            ...data,
            dados_capturados: {
              ...data?.dados_capturados,
              cep: payload.zipCode,
              bairro: address.neighborhood.trim(),
              cidade: address.city.trim(),
              estado: address.state.trim(),
              numero: parseInt(payload.number.trim()),
              complemento: payload.additionalData.trim() || "",
              endereco: address.street.trim(),
            },
          })
        );
      });
    dispatch(finishDelivery());
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

  // const addNewAddress = () => {
  //   setInitialValues({
  //     zipCode: "",
  //     number: "",
  //     recipient: localStorage.getItem("Sterily_Buyer_Name"),
  //     additionalData: "",
  //   });
  //   setAddress(undefined);
  //   dispatch(newAddress());
  // };

  // const goBack = () => {
  //   dispatch(listAddress());
  // };

  const handleSelectedAddress = (index) => {
    dispatch(selectAddress(index));
  };

  // const handleEditAddress = (index) => {
  //   setCurrentEditingAddress(index);
  //   dispatch(newAddress());
  //   setInitialValues(addresses[index]);

  //   setAddress({
  //     street: addresses[index].street,
  //     neighborhood: addresses[index].neighborhood,
  //     city: addresses[index].city,
  //     state: addresses[index].state,
  //     cep: addresses[index].cep,
  //   });
  // };

  // const handleDeleteAddress = (indexAddress) => {
  //   dispatch(
  //     editAddresses([...addresses.filter((_, index) => index !== indexAddress)])
  //   );
  // };

  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.removeItem("STERILY_CHECKOUT_ADDRESS");
      localStorage.setItem(
        "STERILY_CHECKOUT_ADDRESS",
        JSON.stringify(addresses)
      );
      handleSelectedAddress(0);
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
          return;
        });
    }
    // eslint-disable-next-line
  }, [data]);

  const hasDeliveryTax = data?.resumo?.total < 10000;

  const shouldHideOnMobile =
    (isEditingLastStep && !lastStepHasFinished) || paymentEditing;

  return (
    <Container
      id="step-2"
      onClick={editData}
      success={
        (isEditingLastStep && lastStepHasFinished) ||
        (!isEditing && hasFinished)
      }
      closed={!lastStepHasFinished}
      shouldHideOnMobile={shouldHideOnMobile}
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
            <Tooltip
              title="Editar"
              placement="top"
              arrow
              disableHoverListener={false}
              disableFocusListener={false}
              disableTouchListener={false}
              enterTouchDelay={0}
              leaveTouchDelay={3000}
            >
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
      {!isEditingLastStep && lastStepHasFinished && step === 1 && isEditing && (
        <>
          <Disclaimer>Cadastre ou selecione um endereço</Disclaimer>
          <Formik
            innerRef={formikRef} // Passa a referência ao Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSetAddresses(values);
            }}
          >
            {({ errors, touched, values, setFieldValue }) => {
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
                !hasError &&
                lastZipCode !== values.zipCode.replace("-", "")
              ) {
                setHasCalledApi(true);
                getAddress(values.zipCode.replace("-", ""));
              }

              return (
                <StyledForm autoComplete="off">
                  {/* {addresses.length >= 1 && (
                    <BackButton onClick={goBack}>{`< Voltar`}</BackButton>
                  )} */}
                  <Label>CEP</Label>
                  <ZipCodeContainer>
                    <Field
                      name="zipCode"
                      as={StyledInputMask}
                      mask="99999-999"
                      small
                      error={hasError || (touched.zipCode && !!errors.zipCode)}
                      isValid={
                        !hasCalledApi &&
                        !hasError &&
                        values.zipCode &&
                        !errors.zipCode
                      }
                      disabled={hasCalledApi}
                      autoComplete="postal-code"
                      data-form-type="other"
                    />

                    {hasCalledApi && <StyledLoading color="inherit" />}
                    {(hasError || (touched.zipCode && errors.zipCode)) && (
                      <ErrorMessage>
                        {errors.zipCode || "CEP inválido."}
                      </ErrorMessage>
                    )}
                  </ZipCodeContainer>
                  {address && !hasError && (
                    <>
                      <City>
                        {address.city} / {address.state}
                      </City>
                      <Label>Endereço</Label>
                      <InputDefault
                        isValid={address?.street && address?.street !== ""}
                        value={address?.street}
                        onChange={(e) => {
                          setAddress({ ...address, street: e.target.value });
                          setShouldFocusOnNumber(false);
                        }}
                      ></InputDefault>
                      <AddressContainer>
                        <div>
                          <Label>Número</Label>
                          <Field
                            name="number"
                            as={InputDefault}
                            number
                            error={touched.number && !!errors.number}
                            isValid={values.number && !errors.number}
                            autoComplete="off"
                            data-form-type="other"
                          />
                          {touched.number && errors.number && (
                            <ErrorMessage>{errors.number}</ErrorMessage>
                          )}
                        </div>
                        <div>
                          <Label>Bairro</Label>
                          <InputDefault
                            isValid={
                              address?.neighborhood &&
                              address?.neighborhood !== ""
                            }
                            value={address?.neighborhood}
                            onChange={(e) => {
                              setAddress({
                                ...address,
                                neighborhood: e.target.value,
                              });
                            }}
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
                        id="recipient"
                        name="recipient"
                        as={InputDefault}
                        error={touched.recipient && !!errors.recipient}
                        isValid={values.recipient && !errors.recipient}
                        autoComplete="name"
                        data-form-type="other"
                      />
                      {touched.recipient && errors.recipient && (
                        <ErrorMessage>{errors.recipient}</ErrorMessage>
                      )}
                      <Button type="submit">
                        IR PARA PAGAMENTO
                        <ArrowRight />
                      </Button>
                    </>
                  )}
                </StyledForm>
              );
            }}
          </Formik>
        </>
      )}
      {/* {!isEditingLastStep && step === 2 && isEditing && (
        <>
          <DisclaimerSelectAddress>
            Cadastre ou selecione um endereço
          </DisclaimerSelectAddress>
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
                <Tooltip
                  title="Editar"
                  placement="top"
                  arrow
                  disableHoverListener={false}
                  disableFocusListener={false}
                  disableTouchListener={false}
                  enterTouchDelay={0}
                  leaveTouchDelay={3000}
                >
                  <IconButton
                    type="edit"
                    onClick={() => {
                      handleEditAddress(index);
                    }}
                  >
                    <IconWrapper icon="assets/img/icons/pencil-edit.svg" />
                    <IconText>Editar</IconText>
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Excluir"
                  placement="top"
                  arrow
                  disableHoverListener={false}
                  disableFocusListener={false}
                  disableTouchListener={false}
                  enterTouchDelay={0}
                  leaveTouchDelay={3000}
                >
                  <IconButton
                    type="delete"
                    onClick={() => {
                      handleDeleteAddress(index);
                    }}
                  >
                    <IconWrapper icon="assets/img/icons/delete.svg" />
                    <IconText>Excluir</IconText>
                  </IconButton>
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
            IR PARA PAGAMENTO
            <ArrowRight />
          </Button>
        </>
      )}
        */}
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
