import React, { useEffect, useState } from "react";
import {
  Container,
  CopyCodeButton,
  Description,
  GatewayContainer,
  GatewayLabel,
  GatewayLogo,
  InstructionsContainer,
  LoadingDots,
  PaymentContainer,
  PaymentImage,
  PaymentTitle,
  PaymentValue,
  Status,
  TextContainer,
  TimeDisplay,
  Title,
} from "./Pix.style";
import SmartphoneTwoToneIcon from "@mui/icons-material/SmartphoneTwoTone";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { Check } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import { formatPrice } from "../../../../utils/formatPrice";
import axios from "axios";
import { useResponsive } from "../../../../hooks/useResponsive";
function Pix({ paymentData }) {
  // Define o tempo inicial em segundos (30 minutos = 1800 segundos)
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [showCopiado, setShowCopiado] = useState(false);
  const { isDesktop } = useResponsive();
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

  const [isPaid, setIsPaid] = useState(false);

  const checkPayment = async () => {
    await axios
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
        setIsPaid(results.data.status === "paid");
      })
      .catch((err) => {
        return;
      });
  };

  useEffect(() => {
    setInterval(() => {
      checkPayment();
    }, 10000);
    // eslint-disable-next-line
  }, []);

  console.log(paymentData);

  return (
    <Container>
      <TextContainer>
        <Title>Quase lá...</Title>
        <Description>
          Pague seu Pix dentro de{" "}
          <TimeDisplay>{formatTime(timeLeft)}</TimeDisplay> para garantir sua
          compra.
        </Description>
        <Status isPaid={isPaid}>
          {isPaid ? (
            "Pagamento aprovado"
          ) : (
            <>
              Aguardando pagamento
              <LoadingDots>
                <span></span>
                <span></span>
                <span></span>
              </LoadingDots>
            </>
          )}
        </Status>
      </TextContainer>
      <PaymentContainer>
        {isDesktop && (
          <>
            <PaymentTitle>
              Abra seu aplicativo de pagamento onde você utiliza o Pix e escolha
              a opção <strong style={{ color: "#725bc2" }}>Ler QR Code</strong>
            </PaymentTitle>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                fontSize: "14px",
                color: "#666",
                fontWeight: "500",
              }}
            >
              <SmartphoneTwoToneIcon />
              <span>Aponte a câmera do seu celular</span>
            </div>

            <PaymentImage
              alt="Pix"
              src={paymentData?.last_transaction?.qr_code_url}
            />
          </>
        )}
        <PaymentValue>
          Valor do Pix:{" "}
          <strong style={{ color: "#44C485" }}>
            {formatPrice(paymentData?.last_transaction?.amount)}
          </strong>
        </PaymentValue>
        <CopyCodeButton
          onClick={() => {
            navigator.clipboard.writeText(
              paymentData?.last_transaction?.qr_code
            );
            setShowCopiado(true);
            setTimeout(() => {
              setShowCopiado(false);
            }, 2000);
          }}
        >
          <CopyAllIcon />
          Copiar Codigo
        </CopyCodeButton>
        <InstructionsContainer>
          <span>
            Após copiar o código, abra seu aplicativo de pagamento onde você
            utiliza o Pix.
          </span>
          <br />
          <br />
          <span>
            Escolha a opção{" "}
            <strong style={{ color: "#725bc2" }}>Pix Copia e Cola</strong> e
            insira o código copiado
          </span>
        </InstructionsContainer>

        <GatewayContainer>
          <GatewayLabel>Pix processado por</GatewayLabel>
          <GatewayLogo
            loading="lazy"
            src="https://icons.yampi.me/svg/pagarmev5.svg?v1"
            alt="Logo pagarmev5"
          />
        </GatewayContainer>

        {showCopiado && (
          <Alert
            display="hidden"
            icon={<Check fontSize="inherit" />}
            severity="success"
          >
            Copiado !
          </Alert>
        )}
      </PaymentContainer>
    </Container>
  );
}
export default Pix;
