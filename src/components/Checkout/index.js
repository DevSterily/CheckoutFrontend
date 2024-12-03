import React from "react";
import { StyledCheckout, Container } from "./Checkout.style";
import Identification from "./Identification";
import Delivery from "./Delivery";
import Payment from "./Payment";
import Summary from "./Summary";

function Checkout() {
  return (
    <StyledCheckout>
      <Container>
        <Identification />
        <Payment />
        <Summary />
        <Delivery />
      </Container>
    </StyledCheckout>
  );
}

export default Checkout;
