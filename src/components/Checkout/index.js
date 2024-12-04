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
        <div>
          <Identification />
          <Delivery />
        </div>
        <Payment />
        <Summary />
      </Container>
    </StyledCheckout>
  );
}

export default Checkout;
