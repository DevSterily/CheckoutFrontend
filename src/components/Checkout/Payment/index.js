import React, { useEffect, useState } from "react";
import {
  BarcodeIcon,
  Button,
  Container,
  CreditContainer,
  Disclaimer,
  ErrorMessage,
  Header,
  Icon,
  InputDefault,
  Label,
  PaymentCard,
  PaymentDisclaimer,
  PaymentList,
  PaymentTitle,
  PaymentTotal,
  PixIcon,
  RadioButton,
  Select,
  Step,
  StyledHelpIcon,
  StyledInputMask,
  StyledLockIcon,
  Title,
} from "./Payment.style";
import Plastic from "react-plastic";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPayment } from "../../../redux/paymentSlice";
import * as Yup from "yup";
import { isValidCPF } from "../../../utils/isValidCpf";
import { Formik, Field } from "formik";

const validationSchema = Yup.object({
  cardNumber: Yup.string().required("Campo obrigatório."),
  cardExpiry: Yup.string()
    .required("Campo obrigatório.")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Mês inválido"),
  cardCvc: Yup.string().required("Campo obrigatório."),
  cardName: Yup.string()
    .required("Campo obrigatório.")
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+(?: [A-Za-zÀ-ÖØ-öø-ÿ0-9]+)+$/,
      "Digite seu nome completo."
    )
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "O nome deve conter apenas letras e espaços."),
  cardCpf: Yup.string()
    .required("Campo obrigatório.")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Digite um CPF válido.")
    .test(
      "is-valid-cpf",
      "Digite um CPF válido.",
      (value) => value && isValidCPF(value)
    ),
});

function Payment() {
  const { hasFinished: lastStepHasFinished } = useSelector(
    (state) => state.delivery
  );

  const { selectedPayment } = useSelector((state) => state.payment);

  useEffect(() => {
    if (lastStepHasFinished) {
      const currentStep = document.getElementById("step-3");
      if (currentStep) {
        const elementPosition =
          currentStep.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - 10;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  }, [lastStepHasFinished]);

  const dispatch = useDispatch();
  const handleSetPayment = (payment) => {
    dispatch(setPayment(payment));
  };

  // eslint-disable-next-line no-unused-vars

  const icons = [
    { slug: "amex", icon: "assets/img/payment/card-amex.svg" },
    { slug: "visa", icon: "assets/img/payment/card-visa.svg" },
    { slug: "diners", icon: "assets/img/payment/card-diners.svg" },
    { slug: "mastercard", icon: "assets/img/payment/card-mastercard.svg" },
    { slug: "discover", icon: "assets/img/payment/card-discover.svg" },
    { slug: "aura", icon: "assets/img/payment/card-aura.svg" },
  ];

  const [isBackCard, setIsBackCard] = useState(false);
  const handleBackCard = () => {
    setIsBackCard(!isBackCard);
  };

  const handleFlag = (number) => {
    const cardNumber = number.replace(/\s+/g, "");

    const flags = [
      { name: "visa", regex: /^4/ },
      { name: "mastercard", regex: /^5[1-5]/ },
      { name: "amex", regex: /^3[47]/ },
      { name: "dinersclub", regex: /^3(?:0[0-5]|[68])/ },
    ];

    for (let flag of flags) {
      if (flag.regex.test(cardNumber)) {
        return flag.name;
      }
    }
  };

  const initialValues = {
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
    cardCpf: "",
  };

  return (
    <Container id="step-3" closed={!lastStepHasFinished}>
      <Header>
        <Step closed={!lastStepHasFinished}>3</Step>
        <Title>Pagamento</Title>
      </Header>
      {!lastStepHasFinished && (
        <Disclaimer>
          Preencha suas informações de entrega para continuar
        </Disclaimer>
      )}
      {lastStepHasFinished && (
        <>
          {" "}
          <Disclaimer>Escolha uma forma de pagamento</Disclaimer>
          <PaymentCard
            onClick={() => {
              handleSetPayment("credit");
            }}
            checked={selectedPayment === "credit"}
          >
            <RadioButton checked={selectedPayment === "credit"} />
            <PaymentTitle selected={selectedPayment === "credit"} big>
              Cartão de crédito
            </PaymentTitle>
            <PaymentList>
              {icons.map((payment) => {
                return (
                  <Icon
                    src={payment.icon}
                    alt={payment.slug}
                    key={payment.slug}
                  />
                );
              })}
            </PaymentList>
            {selectedPayment === "credit" && (
              <>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  {({ errors, touched, values }) => {
                    return (
                      <>
                        <Plastic
                          type={handleFlag(values.cardNumber)}
                          name={values.cardName || "NOME E SOBRENOME"}
                          expiry={values.cardExpiry || "__/__"}
                          number={values.cardNumber || "••••••••••••••••"}
                          cvc={values.cardCvc || "•••"}
                          back={isBackCard}
                        />
                        <Label>Número do cartão</Label>
                        <Field
                          name="cardNumber"
                          as={StyledInputMask}
                          mask="9999 9999 9999 9999"
                          placeholder="1234 1234 1234 1234"
                          error={touched.cardNumber && !!errors.cardNumber}
                          isValid={touched.cardNumber && !errors.cardNumber}
                        />
                        {touched.cardNumber && errors.cardNumber && (
                          <ErrorMessage>{errors.cardNumber}</ErrorMessage>
                        )}
                        <CreditContainer>
                          <div>
                            <Label>
                              Validade <small>(mês/ano)</small>
                            </Label>
                            <Field
                              name="cardExpiry"
                              as={StyledInputMask}
                              mask="99/99"
                              small
                              placeholder="MM/AA"
                              error={touched.cardExpiry && !!errors.cardExpiry}
                              isValid={touched.cardExpiry && !errors.cardExpiry}
                            />
                            {touched.cardExpiry && errors.cardExpiry && (
                              <ErrorMessage>{errors.cardExpiry}</ErrorMessage>
                            )}
                          </div>
                          <div>
                            <Label>
                              Cód. de segurança{" "}
                              <Tooltip
                                title="3 dígitos no verso do cartão. Amex: 4 dígitos na frente."
                                placement="top"
                                arrow
                              >
                                <StyledHelpIcon />
                              </Tooltip>
                            </Label>
                            <Field
                              name="cardCvc"
                              as={InputDefault}
                              small
                              onFocus={handleBackCard}
                              onBlur={handleBackCard}
                              maxlength="4"
                              error={touched.cardCvc && !!errors.cardCvc}
                              isValid={touched.cardCvc && !errors.cardCvc}
                            />
                            {touched.cardCvc && errors.cardCvc && (
                              <ErrorMessage>{errors.cardCvc}</ErrorMessage>
                            )}
                          </div>
                        </CreditContainer>
                        <Label>Nome e sobrenome do titular</Label>
                        <Field
                          as={InputDefault}
                          name="cardName"
                          placeholder="ex.: Maria de Almeida Cruz"
                          error={touched.cardName && !!errors.cardName}
                          isValid={touched.cardName && !errors.cardName}
                        />
                        {touched.cardName && errors.cardName && (
                          <ErrorMessage>{errors.cardName}</ErrorMessage>
                        )}
                        <Label>CPF do titular</Label>
                        <Field
                          name="cardCpf"
                          error={touched.cardCpf && !!errors.cardCpf}
                          isValid={touched.cardCpf && !errors.cardCpf}
                          as={StyledInputMask}
                          mask="999.999.999-99"
                          placeholder="000.000.000-00"
                        />
                        {touched.cardCpf && errors.cardCpf && (
                          <ErrorMessage>{errors.cardCpf}</ErrorMessage>
                        )}
                        <Label>Nº de Parcelas</Label>
                        <Select disabled>
                          <option selected>---</option>
                        </Select>
                        <span>
                          Preencha o cartão para selecionar as parcelas
                        </span>
                        <Button>
                          <StyledLockIcon />
                          Comprar agora
                        </Button>
                      </>
                    );
                  }}
                </Formik>
              </>
            )}
          </PaymentCard>
          <PaymentCard
            onClick={() => {
              handleSetPayment("pix");
            }}
            checked={selectedPayment === "pix"}
          >
            <RadioButton checked={selectedPayment === "pix"} />
            <PaymentTitle selected={selectedPayment === "pix"} big>
              <PixIcon></PixIcon>Pix
            </PaymentTitle>
            {selectedPayment === "pix" && (
              <>
                <PaymentDisclaimer>
                  A confirmação de pagamento é realizada em poucos minutos.
                  Utilize o aplicativo do seu banco para pagar.
                </PaymentDisclaimer>
                <PaymentTotal>Valor no Pix: R$ 199,00</PaymentTotal>
                <Button>
                  <StyledLockIcon />
                  Comprar agora
                </Button>
              </>
            )}
          </PaymentCard>
          <PaymentCard
            onClick={() => {
              handleSetPayment("barcode");
            }}
            checked={selectedPayment === "barcode"}
          >
            <RadioButton checked={selectedPayment === "barcode"} />
            <PaymentTitle selected={selectedPayment === "barcode"} big>
              <BarcodeIcon></BarcodeIcon>Boleto
            </PaymentTitle>
            {selectedPayment === "barcode" && (
              <>
                <PaymentDisclaimer>
                  Somente quando recebermos a confirmação, em até 48h úteis após
                  o pagamento, seguiremos com o envio das suas compras. O prazo
                  de entrega passa a ser contado somente após a confirmação do
                  pagamento.
                </PaymentDisclaimer>
                <PaymentTotal>Valor no boleto: R$ 199,00</PaymentTotal>
                <Button>
                  <StyledLockIcon />
                  Comprar agora
                </Button>
              </>
            )}
          </PaymentCard>
        </>
      )}
    </Container>
  );
}

export default Payment;
