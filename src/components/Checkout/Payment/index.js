import React from 'react';
import { Container, Disclaimer, Header, PaymentCard, PaymentTitle, RadioButton, Step, Title } from './Payment.style';

function Payment() {

  return (
    <Container>
      <Header>
        <Step>3</Step>
        <Title>Pagamento</Title>
      </Header>
      <Disclaimer>
        Escolha uma forma de pagamento
      </Disclaimer>
      <PaymentCard checked>
        <RadioButton checked></RadioButton>
        <PaymentTitle big>Cartão de crédito</PaymentTitle>
      </PaymentCard>
      <PaymentCard>
        <RadioButton></RadioButton>
        <PaymentTitle big>Pix</PaymentTitle>
      </PaymentCard>
      <PaymentCard>
        <RadioButton></RadioButton>
        <PaymentTitle big>Boleto</PaymentTitle>
      </PaymentCard>
    </Container>
  )
}

export default Payment;