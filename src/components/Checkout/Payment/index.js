import React, { useState } from "react";
import {
  BarcodeIcon,
  Button,
  Container,
  CreditContainer,
  Disclaimer,
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
  StyledLockIcon,
  Title,
} from "./Payment.style";
import Plastic from "react-plastic";
import { Tooltip } from "@mui/material";
function Payment() {
  // eslint-disable-next-line no-unused-vars
  const [isOpened, setIsOpened] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [payment, setPayment] = useState("credit");

  const icons = [
    { slug: "amex", icon: "assets/img/payment/card-amex.svg" },
    { slug: "visa", icon: "assets/img/payment/card-visa.svg" },
    { slug: "diners", icon: "assets/img/payment/card-diners.svg" },
    { slug: "mastercard", icon: "assets/img/payment/card-mastercard.svg" },
    { slug: "discover", icon: "assets/img/payment/card-discover.svg" },
    { slug: "aura", icon: "assets/img/payment/card-aura.svg" },
  ];

  return (
    <Container closed={!isOpened}>
      <Header>
        <Step closed={!isOpened}>3</Step>
        <Title>Pagamento</Title>
      </Header>
      {!isOpened && (
        <Disclaimer>
          Preencha suas informações de entrega para continuar
        </Disclaimer>
      )}
      {isOpened && (
        <>
          {" "}
          <Disclaimer>Escolha uma forma de pagamento</Disclaimer>
          <PaymentCard checked>
            <RadioButton checked></RadioButton>
            <PaymentTitle selected big>
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
            <Plastic
              type=""
              name="NOME E SOBRENOME"
              expiry="••/••"
              number="••••••••••••••••"
              cvc="•••"
            />
            <Label>Número do cartão</Label>
            <InputDefault placeholder="1234 1234 1234 1234"></InputDefault>
            <CreditContainer>
              <div>
                <Label>
                  Validade <small>(mês/ano)</small>
                </Label>
                <InputDefault small placeholder="MM/AA"></InputDefault>
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
                <InputDefault small></InputDefault>
              </div>
            </CreditContainer>
            <Label>Nome e sobrenome do titular</Label>
            <InputDefault placeholder="ex.: Maria de Almeida Cruz"></InputDefault>
            <Label>CPF do titular</Label>
            <InputDefault placeholder="000.000.000-00"></InputDefault>
            <Label>Nº de Parcelas</Label>
            <Select disabled>
              <option selected>---</option>
            </Select>
            <span>Preencha o cartão para selecionar as parcelas</span>
            <Button>
              <StyledLockIcon />
              Comprar agora
            </Button>
          </PaymentCard>
          <PaymentCard>
            <RadioButton></RadioButton>
            <PaymentTitle big>
              <PixIcon></PixIcon>Pix
            </PaymentTitle>
            {payment === "pix" && (
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
          <PaymentCard>
            <RadioButton></RadioButton>
            <PaymentTitle big>
              <BarcodeIcon></BarcodeIcon>Boleto
            </PaymentTitle>
            {payment === "barcode" && (
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
