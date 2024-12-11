import React from "react";
import {
  AddIcon,
  Container,
  CouponButton,
  CouponContainer,
  CouponIcon,
  CouponInput,
  CouponLabel,
  Delete,
  DescriptionContainer,
  ItemDetails,
  ItemImage,
  ItemName,
  ItemPrice,
  ItemsContainer,
  ItemVariaton,
  PriceTotal,
  QuantityAdd,
  QuantityContainer,
  QuantityInput,
  QuantityRemove,
  RemoveIcon,
  Title,
  TotalContainer,
} from "./Summary.style";
import { Tooltip } from "@mui/material";

function Summary() {
  const items = [
    {
      image: "assets/img/product.avif",
      name: "Magic Clean",
      variation: "Pacote: 03 Unidades",
      price: "R$ 81,00",
      quantity: 1,
    },
    {
      image: "assets/img/product.avif",
      name: "Magic Clean",
      variation: "Pacote: 03 Unidades",
      price: "R$ 81,00",
      quantity: 1,
    },
  ];

  return (
    <Container>
      <Title>Resumo</Title>
      <div class="group">
      <CouponLabel>Tem um cupom?</CouponLabel>
      <CouponContainer>
        <CouponIcon />
        <CouponInput
          type="text"
          name="code"
          id="promocode"
          placeholder="Código do cupom"
          required
        />
        <CouponButton>Adicionar</CouponButton>
      </CouponContainer>
      <PriceTotal>
        <DescriptionContainer>
          <p>Produtos</p>
          <p>R$ 162,00</p>
        </DescriptionContainer>
        <DescriptionContainer>
          <p>Frete</p>
          <p>Grátis</p>
        </DescriptionContainer>
        <TotalContainer>
          <p>Total</p>
          <p>R$ 162,00</p>
        </TotalContainer>
      </PriceTotal>
      </div>
      {items.map((item, index) => {
        return (
          <ItemsContainer key={index} isFirstItem={index === 0}>
            <ItemImage src={item.image} alt={item.name} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemVariaton>{item.variation}</ItemVariaton>
              <ItemPrice>{item.price}</ItemPrice>
              <QuantityContainer>
                <QuantityRemove>
                  <RemoveIcon></RemoveIcon>
                </QuantityRemove>
                <QuantityInput value={item.quantity}></QuantityInput>
                <QuantityAdd>
                  <AddIcon></AddIcon>
                </QuantityAdd>
              </QuantityContainer>
            </ItemDetails>
            <Tooltip title="Excluir" placement="top" arrow>
              <Delete />
            </Tooltip>
          </ItemsContainer>
        );
      })}
    </Container>
  );
}

export default Summary;
