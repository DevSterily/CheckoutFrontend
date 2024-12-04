import React, { useState } from "react";
import {
  ArrowRight,
  Button,
  Container,
  Disclaimer,
  EditIcon,
  ErrorMessage,
  Header,
  IdentificationFinalText,
  IdentificationFinalTitle,
  InputDefault,
  InputMobileCode,
  InputMobileContainer,
  Label,
  Step,
  StyledCheckIcon,
  Title,
} from "./Identification.style";
import { Tooltip } from "@mui/material";
import InputMask from "react-input-mask";

function Identification() {
  const [isFilled, setIsFilled] = useState(false);
  const handleOpening = () => {
    setIsFilled(!isFilled);
  };

  const data = {
    name: "Lucas de Aguiar Coimbra",
    email: "lucas.coimbra@usabit.com.br",
    cpf: "123.456.789-00",
    mobile: "(19) 99425-3921",
  };
  return (
    <Container success={isFilled}>
      <Header>
        <Step success={isFilled}>1</Step>
        <Title success={isFilled}>Identifique-se</Title>
        {isFilled && (
          <>
            <StyledCheckIcon />
            <Tooltip title="Editar" placement="top" arrow>
              <EditIcon onClick={handleOpening} />
            </Tooltip>
          </>
        )}
      </Header>
      {!isFilled && (
        <>
          <Disclaimer>
            Utilizaremos seu e-mail para: Identificar seu perfil, histórico de
            compra, notificação de pedidos e carrinho de compras.
          </Disclaimer>
          <Label>Nome completo</Label>
          <InputDefault
            value={data.name}
            error={false}
            placeholder="ex.: Maria de Almeida Cruz"
          ></InputDefault>
          {false && <ErrorMessage>Campo obrigatório.</ErrorMessage>}
          <Label>E-mail</Label>
          <InputDefault
            value={data.email}
            placeholder="ex.: maria@gmail.com"
          ></InputDefault>
          <Label>CPF</Label>
          <InputDefault
            as={InputMask}
            mask="999.999.999-99"
            value={data.cpf}
            small
            placeholder="000.000.000-00"
          />
          <Label>Celular / WhatsApp</Label>
          <InputMobileContainer>
            <InputMobileCode>+55</InputMobileCode>
            <InputDefault
              as={InputMask}
              mask="(99) 99999-9999"
              value={data.mobile}
              phone
              placeholder="(00) 00000-0000"
            ></InputDefault>
          </InputMobileContainer>
          <Button onClick={handleOpening}>
            Continuar
            <ArrowRight />
          </Button>
        </>
      )}
      {isFilled && (
        <>
          <IdentificationFinalTitle>{data.name}</IdentificationFinalTitle>
          <IdentificationFinalText>{data.email}</IdentificationFinalText>
          <IdentificationFinalText>CPF {data.cpf}</IdentificationFinalText>
        </>
      )}
    </Container>
  );
}

export default Identification;
