import React from "react";
import {
  AddressContainer,
  Button,
  City,
  Container,
  Disclaimer,
  Header,
  InputDefault,
  Label,
  Step,
  Title,
  NewAddressButton,
  DeliveryCard,
  RadioButton,
  DeliveryTitle,
  DeliveryDescription,
  EditIcon,
  DeleteIcon,
  DeliveryLabel,
  DeliveryPrice,
  DeliveryDiscount,
  ArrowRight
} from "./Delivery.style";
import { Tooltip } from "@mui/material";
function Delivery() {
  return (
    <Container>
      <Header>
        <Step>2</Step>
        <Title>Entrega</Title>
      </Header>
      <Disclaimer>
        Cadastre ou selecione um endereço
      </Disclaimer>
      <Label>CEP</Label>
      <InputDefault small value="00000-000"></InputDefault>
      <City>São Paulo / SP</City>
      <Label>Endereço</Label>
      <InputDefault value="Rua Teste"></InputDefault>
      <AddressContainer>
        <div><Label>Número</Label>
        <InputDefault number value="123"></InputDefault></div>
        <div><Label>Bairro</Label>
        <InputDefault value="Bairro Teste"></InputDefault></div>
      </AddressContainer>
      <Label>Complemento <small>{`(opcional)`}</small></Label>
      <InputDefault></InputDefault>
      <Label>Destinatário</Label>
      <InputDefault value="Fulano"></InputDefault>
      <Button>Salvar</Button>
      <NewAddressButton>+ Novo Endereço</NewAddressButton>
      <DeliveryCard checked>
        <RadioButton checked></RadioButton>
        <DeliveryTitle>Rua 1, 123 - Bairro X</DeliveryTitle>
        <DeliveryDescription>São Paulo-SP | CEP 123456-789</DeliveryDescription>
        <Tooltip title="Editar" placement="top" arrow><EditIcon></EditIcon></Tooltip>
        <Tooltip title="Excluir" placement="top" arrow><DeleteIcon></DeleteIcon></Tooltip>
      </DeliveryCard>
      <DeliveryCard>
        <RadioButton></RadioButton>
        <DeliveryTitle>Rua 1, 123 - Bairro X</DeliveryTitle>
        <DeliveryDescription>São Paulo-SP | CEP 123456-789</DeliveryDescription>
        <Tooltip title="Editar" placement="top" arrow><EditIcon></EditIcon></Tooltip>
        <Tooltip title="Excluir" placement="top" arrow><DeleteIcon></DeleteIcon></Tooltip>
      </DeliveryCard>
      <DeliveryLabel>Escolha uma forma de entrega:</DeliveryLabel>
      <DeliveryCard shipping checked>
        <RadioButton checked></RadioButton>
        <DeliveryTitle big>Rápida - 1 a 4 dias</DeliveryTitle>
        <DeliveryDescription big>Entrega garantida</DeliveryDescription>
        <DeliveryPrice>R$ 18,00</DeliveryPrice>
        <DeliveryDiscount>Grátis</DeliveryDiscount>
      </DeliveryCard>
      <Button>Continuar<ArrowRight /></Button>
    </Container>
  );
}

export default Delivery;
