import React, { useEffect, useState } from "react";
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
import { formatPrice } from "../../../../utils/formatPrice";
function Pix({ paymentData }) {
  // Define o tempo inicial em segundos (30 minutos = 1800 segundos)
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    // Verifica se o tempo acabou
    if (timeLeft <= 0) return;

    // Atualiza o tempo a cada segundo
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Limpa o timer quando o componente é desmontado ou o tempo é atualizado
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Formata o tempo em minutos e segundos
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };
  return (
    <Container>
      <TextContainer>
        <Title>Quase lá...</Title>
        <Description>
          Pague seu Pix dentro de <strong>{formatTime(timeLeft)}</strong> para
          garantir sua compra.
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
          Valor do Pix:{" "}
          <strong>{formatPrice(paymentData?.last_transaction?.amount)}</strong>
        </PaymentValue>
      </PaymentContainer>
    </Container>
  );
}
export default Pix;
