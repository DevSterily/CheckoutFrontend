import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { Check } from "@mui/icons-material";

import {
  BankItem,
  BankLink,
  BankList,
  BarCodeContainer,
  Button,
  Container,
  CopyButton,
  EmailContainer,
  PaymentContainer,
  PaymentInstructions,
  PaymentLabel,
  PaymentTitle,
  PaymentValue,
  TextContainer,
  Title,
} from "./Boleto.style";
function Boleto({ paymentData }) {
  const [showCopiado, setShowCopiado] = useState(false);

  return (
    <Container>
      <TextContainer>
        <Title>Seu pedido foi realizado.</Title>
        <EmailContainer>
          Você receberá um e-mail com todos os detalhes de sua compra.
        </EmailContainer>
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
        <PaymentValue>
          <BarCodeContainer>
            {paymentData?.last_transaction?.line}
          </BarCodeContainer>
          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(
                paymentData?.last_transaction?.line
              );
              setShowCopiado(true);
              setTimeout(() => {
                setShowCopiado(false);
              }, 2000);
            }}
          >
            <CopyAllIcon />
            COPIAR
          </CopyButton>
        </PaymentValue>

        <BankList>
          <BankItem>
            <BankLink href="http://www.bb.com.br" target="_blank">
              <img
                loading="lazy"
                src="https://github.bubbstore.com/formas-de-pagamento/banco-do-brasil.svg"
                alt="Banco do Brasil"
              />
            </BankLink>
          </BankItem>
          <BankItem>
            <BankLink href="http://www.itau.com.br" target="_blank">
              <img
                loading="lazy"
                src="https://github.bubbstore.com/formas-de-pagamento/itau.svg"
                alt="Itaú"
              />
            </BankLink>
          </BankItem>
          <BankItem>
            <BankLink href="http://www.bradesco.com.br" target="_blank">
              <img
                loading="lazy"
                src="https://github.bubbstore.com/formas-de-pagamento/bradesco.svg"
                alt="Bradesco"
              />
            </BankLink>
          </BankItem>
          <BankItem>
            <BankLink href="http://www.santander.com.br" target="_blank">
              <img
                loading="lazy"
                src="https://github.bubbstore.com/formas-de-pagamento/santander.svg"
                alt="Santander"
              />
            </BankLink>
          </BankItem>
          <BankItem>
            <BankLink href="http://www.caixa.com.br" target="_blank">
              <img
                loading="lazy"
                src="https://github.bubbstore.com/formas-de-pagamento/caixa.svg"
                alt="Caixa"
              />
            </BankLink>
          </BankItem>
        </BankList>

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
export default Boleto;
