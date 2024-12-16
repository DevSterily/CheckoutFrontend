import React from "react";
import {
  Container,
  Description,
  PaymentContainer,
  PaymentImage,
  PaymentTitle,
  PaymentValue,
  Status,
  TextContainer,
  Title,
} from "./Pix.style";
function Pix({ paymentData }) {
  return (
    <Container>
      <TextContainer>
        <Title>Quase lá...</Title>
        <Description>
          Pague seu Pix dentro de <strong>29:57</strong> para garantir sua
          compra.
        </Description>
        <Status>Aguardando pagamento</Status>
      </TextContainer>
      <PaymentContainer>
        <PaymentTitle>
          Abra seu aplicativo de pagamento onde você utiliza o Pix e escolha a
          opção <strong>Ler QR Code</strong>
        </PaymentTitle>
        <PaymentImage
          alt="Pix"
          src={paymentData?.last_transaction?.qr_code_url}
        />
        <PaymentValue>
          Valor do Pix: <strong>R$ 51,00</strong>
        </PaymentValue>
      </PaymentContainer>
    </Container>
  );
}
export default Pix;
