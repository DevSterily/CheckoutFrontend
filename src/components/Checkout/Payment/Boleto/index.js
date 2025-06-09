import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import {Check} from '@mui/icons-material';

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
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [showCopiado, setShowCopiado] = useState(false);

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
        <PaymentValue>{paymentData?.last_transaction?.line}
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '5px 5px', backgroundColor: '#f5f5f5', borderRadius: '5px', color: '#333' }}
          onClick={() => {
            navigator.clipboard.writeText(paymentData?.last_transaction?.line);
            setShowCopiado(true);
            setTimeout(() => {
              setShowCopiado(false);
            }, 2000);
          }}
        >
          <CopyAllIcon />
          Copiar
        </div>
        </PaymentValue>

        {/* <div style={{fontSize: '13px', color: '#666', marginTop: '10px', maxWidth: '330px', textAlign: 'center', fontWeight: '400'}}>
          <span>Você também pode pagar escolhendo a opção</span>
          <span>Pix Copia e Cola no seu aplicativo de pagamento ou Internet Banking (banco online). Neste caso, copie o código clicando no botão abaixo:</span>
        </div> */}
        {showCopiado && <Alert display="hidden" icon={<Check fontSize="inherit" />} severity="success">
          Copiado !
        </Alert>}
        
      </PaymentContainer>
    </Container>
  );
}
export default Boleto;
