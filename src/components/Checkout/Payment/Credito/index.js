import React from "react";
import { Container, Description, TextContainer, Title } from "./Credito.style";
function Credito() {
  return (
    <Container>
      <TextContainer>
        <Title>Seu pedido foi realizado.</Title>
        <Description>
          Você receberá um e-mail com todos os detalhes de sua compra.
        </Description>
      </TextContainer>
    </Container>
  );
}
export default Credito;
