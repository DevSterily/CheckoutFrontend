import React from "react";
import {
  ArrowRight,
  Button,
  Container,
  Disclaimer,
  ErrorMessage,
  Header,
  InputDefault,
  InputMobileCode,
  InputMobileContainer,
  Label,
  Step,
  Title,
} from "./Identification.style";
function Identification() {
  return (
    <Container>
      <Header>
        <Step>1</Step>
        <Title>Identifique-se</Title>
      </Header>
      <Disclaimer>
        Utilizaremos seu e-mail para: Identificar seu perfil, histórico de
        compra, notificação de pedidos e carrinho de compras.
      </Disclaimer>
      <Label>Nome completo</Label>
      <InputDefault
        error
        placeholder="ex.: Maria de Almeida Cruz"
      ></InputDefault>
      <ErrorMessage>Campo obrigatório.</ErrorMessage>
      <Label>E-mail</Label>
      <InputDefault placeholder="ex.: maria@gmail.com"></InputDefault>
      <Label>CPF</Label>
      <InputDefault small placeholder="000.000.000-00"></InputDefault>
      <Label>Celular / WhatsApp</Label>
      <InputMobileContainer>
        <InputMobileCode>+55</InputMobileCode>
        <InputDefault phone placeholder="(00) 00000-0000"></InputDefault>
      </InputMobileContainer>
      <Button>
        Continuar
        <ArrowRight />
      </Button>
    </Container>
  );
}

export default Identification;
