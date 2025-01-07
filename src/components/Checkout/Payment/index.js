import React, { useEffect, useState } from "react";
import {
  BarcodeIcon,
  Button,
  CardErrorButton,
  CardErrorDescription,
  CardErrorTitle,
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
import { Box, Modal, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoading,
  setPayment,
  setPaymentTransaction,
} from "../../../redux/paymentSlice";
import * as Yup from "yup";
import { isValidCPF } from "../../../utils/isValidCpf";
import { Formik, Field } from "formik";
import axios from "axios";
import { formatPrice } from "../../../utils/formatPrice";

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
  const { hasFinished: lastStepHasFinished, costumerId } = useSelector(
    (state) => state.delivery
  );

  const { data } = useSelector((state) => state.summary);
  console.log(data);

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

  const [paymentData, setPaymentData] = useState();
  const [cardToken, setCardToken] = useState();
  const handlePayment = async (type) => {
    dispatch(setIsLoading(true));
    setCardError(false);
    const allCostumers = await axios.get(
      `${process.env.REACT_APP_API_URL}/customer`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      }
    );
    await axios.get("https://api.ipify.org?format=json").then((results) => {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/payment`,
          {
            cartId: data?.id,
            customerId:
              costumerId ||
              allCostumers.data.find((item) => {
                return item.document === data?.dados_capturados?.cpf;
              })?.id,
            paymentMethod: type,
            cardToken: cardToken || undefined,
            installment: installment || undefined,
            shipping: {
              recipient_name: data?.dados_capturados?.nome,
              recipient_phone: data?.dados_capturados?.celular,
              address: {
                country: "BR",
                state: data?.dados_capturados?.estado,
                city: data?.dados_capturados?.cidade,
                zip_code: data?.dados_capturados?.cep?.replace("-", ""),
                line_1: data?.dados_capturados?.endereco,
                line_2: data?.dados_capturados?.complemento || "",
              },
            },
            ip: results.data.ip,
          },
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
          }
        )
        .then((results) => {
          setPaymentData(results.data);
          dispatch(setPaymentTransaction(results.data));
          dispatch(setIsLoading(false));

          if (results.data.last_transaction.status === "not_authorized") {
            setCardError(true);
            dispatch(setIsLoading(false));
          }
        })
        .catch((error) => {
          console.log("error", error);
          setCardError(true);
          dispatch(setIsLoading(false));
        });
    });
  };

  useEffect(() => {
    if (paymentData) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/payment/${paymentData.paymentId}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
          }
        )
        .then((results) => {
          console.log(results.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [paymentData]);

  const [installment, setInstallment] = useState(1);
  const [cardError, setCardError] = useState();
  const generateCardToken = (payload) => {
    axios
      .post(
        "https://api.pagar.me/core/v5/tokens?appId=pk_test_rjyBpo9lT6TrMdEg",
        {
          card: {
            number: payload.cardNumber.replace(/\s+/g, ""),
            holder_name: payload.cardName,
            exp_month: payload.cardExpiry.split("/")[0],
            exp_year: payload.cardExpiry.split("/")[1],
            cvv: payload.cardCvc,
          },
          type: "card",
        }
      )
      .then((results) => {
        setCardToken(results.data.id);
      })
      .catch(() => {
        setCardError(true);
      });
  };

  useEffect(() => {
    if (cardToken) {
      handlePayment("CREDIT_CARD");
    }
    // eslint-disable-next-line
  }, [cardToken]);

  function handleFees(total) {
    // Tabela de juros para cada número de parcelas (em porcentagem)
    const fees = [
      0, // 1x - Sem juros
      2.0, // 2x - 2,00% de juros
      2.9, // 3x - 2,90% de juros
      3.2, // 4x - 3,20% de juros
      4.03, // 5x - 4,03% de juros
      4.31, // 6x - 4,31% de juros
      5.31, // 7x - 5,31% de juros
      5.63, // 8x - 5,63% de juros
      6.38, // 9x - 6,38% de juros
      7.3, // 10x - 7,30% de juros
      8.0, // 11x - 8,00% de juros
      8.57, // 12x - 8,57% de juros
    ];

    // Calcula os valores por parcela considerando os juros
    const installments = fees.map((fee, index) => {
      const installment = index + 1;
      const totalWithFee = total * (1 + fee / 100);
      return `${installment}x de ${formatPrice(
        (totalWithFee / installment).toFixed(2)
      )} ${index !== 0 ? "*" : ""}`; // Formata para 2 casas decimais
    });

    if (data?.resumo?.total / 100 <= 50) return installments.slice(0, 6);
    return installments;
  }

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
                    generateCardToken(values);
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
                        <Select>
                          {handleFees(
                            data?.resumo?.totalWithDiscount
                              ? data?.resumo?.totalWithDiscount < 10000
                                ? data?.resumo?.totalWithDiscount + 1800
                                : data?.resumo?.totalWithDiscount
                              : data?.resumo?.total < 10000
                              ? data?.resumo?.total + 1800
                              : data?.resumo?.total
                          ).map((item, index) => {
                            return (
                              <option
                                onClick={() => {
                                  setInstallment(index + 1);
                                }}
                                key={index}
                              >
                                {item}
                              </option>
                            );
                          })}
                        </Select>
                        <span>
                          Preencha o cartão para selecionar as parcelas
                        </span>
                        <Button
                          onClick={() => {
                            generateCardToken(values);
                          }}
                          type="submit"
                        >
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
                <PaymentTotal>
                  Valor no Pix:{" "}
                  {formatPrice(
                    data?.resumo?.totalWithDiscount
                      ? data?.resumo?.totalWithDiscount < 10000
                        ? data?.resumo?.totalWithDiscount + 1800
                        : data?.resumo?.totalWithDiscount
                      : data?.resumo?.total < 10000
                      ? data?.resumo?.total + 1800
                      : data?.resumo?.total
                  )}
                </PaymentTotal>
                <Button
                  onClick={() => {
                    handlePayment("PIX");
                  }}
                >
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
                <PaymentTotal>
                  Valor no boleto:{" "}
                  {formatPrice(
                    data?.resumo?.totalWithDiscount
                      ? data?.resumo?.totalWithDiscount < 10000
                        ? data?.resumo?.totalWithDiscount + 1800
                        : data?.resumo?.totalWithDiscount
                      : data?.resumo?.total < 10000
                      ? data?.resumo?.total + 1800
                      : data?.resumo?.total
                  )}
                </PaymentTotal>
                <Button
                  onClick={() => {
                    handlePayment("BOLETO");
                  }}
                >
                  <StyledLockIcon />
                  Comprar agora
                </Button>
              </>
            )}
          </PaymentCard>
        </>
      )}
      <Modal
        open={cardError}
        onClose={() => {
          setCardError(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #e50f38",
            boxShadow: 24,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            p: 4,
          }}
        >
          <CardErrorTitle>Ops, temos um problema</CardErrorTitle>
          <CardErrorDescription id="modal-modal-description" sx={{ mt: 2 }}>
            Infelizmente o seu pedido não foi aprovado
          </CardErrorDescription>
          <CardErrorButton
            onClick={() => {
              setCardError(false);
            }}
          >
            TENTAR NOVAMENTE
          </CardErrorButton>
        </Box>
      </Modal>
    </Container>
  );
}

export default Payment;
