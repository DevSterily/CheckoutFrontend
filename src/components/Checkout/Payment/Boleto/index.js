import React from "react";
import {
  Button,
  Container,
  PaymentContainer,
  PaymentInstructions,
  PaymentLabel,
  PaymentTitle,
  PaymentValue,
  TextContainer,
  Title,
} from "./Boleto.style";
function Boleto({ paymentData }) {
  return (
    <Container>
      <TextContainer>
        <Title>Seu pedido foi realizado.</Title>
        <Button
          onClick={() => {
            window.open(paymentData?.last_transaction?.pdf, "_blank");
          }}
        >
          IMPRIMIR BOLETO
        </Button>
      </TextContainer>
      <PaymentContainer>
        <PaymentTitle>Instruções</PaymentTitle>
        <PaymentInstructions>
          1. Imprima seu boleto e pague-o no banco<br></br>
          2. Você também pode pagar pela internet usando o código de barras:
        </PaymentInstructions>
        <PaymentLabel>CÓDIGO DE BARRAS DO BOLETO</PaymentLabel>
        <PaymentValue>{paymentData?.last_transaction?.line}</PaymentValue>
      </PaymentContainer>
    </Container>
  );
}
export default Boleto;
