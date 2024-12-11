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
  editDelivery
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

  const { hasFinished, addresses, step, selectedAddress, isEditing } = useSelector(
    (state) => state.delivery
  );

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
      localStorage.removeItem('STERILY_CHECKOUT_ADDRESS')
      localStorage.setItem('STERILY_CHECKOUT_ADDRESS', JSON.stringify(addresses))
      handleSelectedAddress(addresses.length - 1);
    } else {
      addNewAddress();
    }
    // eslint-disable-next-line
  }, [addresses]);

  useEffect(() => {
    localStorage.removeItem('STERILY_CHECKOUT_DELIVERY_SA')
    localStorage.setItem('STERILY_CHECKOUT_DELIVERY_SA', selectedAddress)
  }, [selectedAddress])

  useEffect(() => {
    const cachedData = localStorage.getItem('STERILY_CHECKOUT_ADDRESS')
    const cachedSa = localStorage.getItem('STERILY_CHECKOUT_DELIVERY_SA')
    if(addresses.length <= 0 && cachedData && cachedSa) {
      dispatch(editAddresses(JSON.parse(cachedData)))
      handleSelectedAddress(parseInt(cachedSa));
      dispatch(finishDelivery());
    }
  // eslint-disable-next-line
  }, [])

  return (
    <Container
      id="step-2"
      onClick={editData}
      success={(isEditingLastStep && lastStepHasFinished) || (!isEditing && hasFinished)}
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
            <DeliveryPrice>R$ 18,00</DeliveryPrice>
            <DeliveryDiscount>Grátis</DeliveryDiscount>
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
          <DeliveryFinalText>Rápida - 1 a 4 dias Grátis</DeliveryFinalText>
        </>
      )}
    </Container>
  );
}

export default Delivery;
