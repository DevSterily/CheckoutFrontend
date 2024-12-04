import React, { useState } from "react";
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
  ArrowRight,
  FinalEditIcon,
  StyledCheckIcon,
  DeliveryFinalTitle,
  DeliveryFinalText,
} from "./Delivery.style";
import { Tooltip } from "@mui/material";

function Delivery() {
  const [isOpened, setIsOpened] = useState(true);
  const [step, setStep] = useState(1);
  const [isFilled, setIsFilled] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const handleOpen = () => {
    setIsOpened(!isOpened);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleFilled = () => {
    setIsFilled(!isFilled);
  };

  const data = {
    cep: "01310-000",
    location: "São Paulo / SP",
    address: "Avenida Paulista",
    number: 123,
    neighbour: "Bela Vista",
    recipient: "Lucas de Aguiar Coimbra",
  };

  return (
    <Container success={isFilled} closed={!isOpened}>
      <Header>
        <Step success={isFilled} closed={!isOpened}>
          2
        </Step>
        <Title success={isFilled}>Entrega</Title>
        {isFilled && (
          <>
            <StyledCheckIcon />
            <Tooltip title="Editar" placement="top" arrow>
              <FinalEditIcon onClick={handleFilled} />
            </Tooltip>
          </>
        )}
      </Header>
      {!isOpened && (
        <Disclaimer>
          Preencha suas informações pessoais para continuar
        </Disclaimer>
      )}
      {isOpened && step === 1 && (
        <>
          <Disclaimer>Cadastre ou selecione um endereço</Disclaimer>
          <Label>CEP</Label>
          <InputDefault small value={data.cep}></InputDefault>
          <City>{data.location}</City>
          <Label>Endereço</Label>
          <InputDefault value={data.address}></InputDefault>
          <AddressContainer>
            <div>
              <Label>Número</Label>
              <InputDefault number value={data.number}></InputDefault>
            </div>
            <div>
              <Label>Bairro</Label>
              <InputDefault value={data.neighbour}></InputDefault>
            </div>
          </AddressContainer>
          <Label>
            Complemento <small>{`(opcional)`}</small>
          </Label>
          <InputDefault></InputDefault>
          <Label>Destinatário</Label>
          <InputDefault value={data.recipient}></InputDefault>
          <Button onClick={nextStep}>Salvar</Button>
        </>
      )}
      {step === 2 && !isFilled && (
        <>
          <NewAddressButton>+ Novo Endereço</NewAddressButton>
          <DeliveryCard checked>
            <RadioButton checked></RadioButton>
            <DeliveryTitle>Rua 1, 123 - Bairro X</DeliveryTitle>
            <DeliveryDescription>
              São Paulo-SP | CEP 123456-789
            </DeliveryDescription>
            <Tooltip title="Editar" placement="top" arrow>
              <EditIcon></EditIcon>
            </Tooltip>
            <Tooltip title="Excluir" placement="top" arrow>
              <DeleteIcon></DeleteIcon>
            </Tooltip>
          </DeliveryCard>
          <DeliveryCard>
            <RadioButton></RadioButton>
            <DeliveryTitle>Rua 1, 123 - Bairro X</DeliveryTitle>
            <DeliveryDescription>
              São Paulo-SP | CEP 123456-789
            </DeliveryDescription>
            <Tooltip title="Editar" placement="top" arrow>
              <EditIcon></EditIcon>
            </Tooltip>
            <Tooltip title="Excluir" placement="top" arrow>
              <DeleteIcon></DeleteIcon>
            </Tooltip>
          </DeliveryCard>
          <DeliveryLabel>Escolha uma forma de entrega:</DeliveryLabel>
          <DeliveryCard shipping checked>
            <RadioButton checked></RadioButton>
            <DeliveryTitle big>Rápida - 1 a 4 dias</DeliveryTitle>
            <DeliveryDescription big>Entrega garantida</DeliveryDescription>
            <DeliveryPrice>R$ 18,00</DeliveryPrice>
            <DeliveryDiscount>Grátis</DeliveryDiscount>
          </DeliveryCard>
          <Button onClick={handleFilled}>
            Continuar
            <ArrowRight />
          </Button>
        </>
      )}
      {isFilled && (
        <>
          <DeliveryFinalTitle>Endereço para entrega:</DeliveryFinalTitle>
          <DeliveryFinalText>
            Rua Capitão Alberto Mendes Júnior, 123 - Centro
          </DeliveryFinalText>
          <DeliveryFinalText>Leme-SP | CEP 13610-000</DeliveryFinalText>
          <DeliveryFinalTitle>Forma de entrega:</DeliveryFinalTitle>
          <DeliveryFinalText>Rápida - 1 a 4 dias Grátis</DeliveryFinalText>
        </>
      )}
    </Container>
  );
}

export default Delivery;
