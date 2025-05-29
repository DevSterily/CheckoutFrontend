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
import SmartphoneTwoToneIcon from '@mui/icons-material/SmartphoneTwoTone';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import {Check} from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import { formatPrice } from "../../../../utils/formatPrice";
import axios from "axios";
function Pix({ paymentData }) {
  // Define o tempo inicial em segundos (30 minutos = 1800 segundos)
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [showCopiado, setShowCopiado] = useState(false);

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
          setIsPaid(results.data.status === 'paid');
        })
        .catch((err) => {
          return;
        });
  }

  useEffect(() => {
    setInterval(() => {
      checkPayment();
    }, 10000)
  // eslint-disable-next-line
  }, []);

  console.log(paymentData)

  return (
    <Container>
      <TextContainer>
        <Title>Quase lá...</Title>
        <Description>
          Pague seu Pix dentro de <strong>{formatTime(timeLeft)}</strong> para
          garantir sua compra.
        </Description>
        <Status isPaid={isPaid}>{ isPaid ? 'Pagamento aprovado' : 'Aguardando pagamento' }</Status>
      </TextContainer>
      <PaymentContainer>
        <PaymentTitle>
          Abra seu aplicativo de pagamento onde você utiliza o Pix e escolha a
          opção <strong style={{color: '#725bc2'}}>Ler QR Code</strong>
        </PaymentTitle>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '14px', color: '#666', fontWeight: '500' }}>
          <SmartphoneTwoToneIcon />
          <span>Aponte a câmera do seu celular</span>
        </div>
        <PaymentImage
          alt="Pix"
          src={paymentData?.last_transaction?.qr_code_url}
        />
        <PaymentValue>
          Valor do Pix:{" "}
          <strong style={{color: '#44C485'}}>{formatPrice(paymentData?.last_transaction?.amount)}</strong>
        </PaymentValue>

        <div style={{fontSize: '13px', color: '#666', marginTop: '10px', maxWidth: '330px', textAlign: 'center', fontWeight: '400'}}>
          <span>Você também pode pagar escolhendo a opção</span>
          <span>Pix Copia e Cola no seu aplicativo de pagamento ou Internet Banking (banco online). Neste caso, copie o código clicando no botão abaixo:</span>
        </div>
        {showCopiado && <Alert display="hidden" icon={<Check fontSize="inherit" />} severity="success">
          Copiado !
        </Alert>}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: '10px', padding: '10px 15px', backgroundColor: '#f5f5f5', borderRadius: '5px', color: '#333' }}
          onClick={() => {
            navigator.clipboard.writeText(paymentData?.last_transaction?.qr_code);
            setShowCopiado(true);
            setTimeout(() => {
              setShowCopiado(false);
            }, 2000);
          }}
        >
          <CopyAllIcon />
          Copiar Codigo
        </div>
      </PaymentContainer>
    </Container>
  );
}
export default Pix;
