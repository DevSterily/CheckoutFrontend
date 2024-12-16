import React from "react";
import { StyledCheckout, Container } from "./Checkout.style";
import Identification from "./Identification";
import Delivery from "./Delivery";
import Payment from "./Payment";
import Summary from "./Summary";
import { useSelector } from "react-redux";
import Pix from "./Payment/Pix";
import Boleto from "./Payment/Boleto";
import Credito from "./Payment/Credito";

function Checkout() {
  const { paymentData } = useSelector((state) => state.payment);

  return (
    <StyledCheckout>
      {(!paymentData ||
        paymentData?.last_transaction?.status === "not_authorized") && (
        <Container>
          <div class="group">
            <Identification />
            <Delivery />
          </div>
          <Payment />
          <Summary />
        </Container>
      )}
      {paymentData &&
        paymentData?.last_transaction &&
        paymentData?.last_transaction?.transaction_type === "pix" && (
          <Pix paymentData={paymentData} />
        )}
      {paymentData &&
        paymentData?.last_transaction &&
        paymentData?.last_transaction?.transaction_type === "boleto" && (
          <Boleto paymentData={paymentData} />
        )}
      {paymentData &&
        paymentData?.last_transaction &&
        paymentData?.last_transaction?.transaction_type === "credit_card" &&
        paymentData?.last_transaction?.status !== "not_authorized" && (
          <Credito />
        )}
    </StyledCheckout>
  );
}

export default Checkout;
