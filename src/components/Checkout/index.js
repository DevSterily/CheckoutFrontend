import React, { useState } from "react";
import { StyledCheckout, Container } from "./Checkout.style";
import CheckoutStepper from "./CheckoutStepper";
import Identification from "./Identification";
import Delivery from "./Delivery";
import Payment from "./Payment";
import Summary from "./Summary";
import { useSelector } from "react-redux";
import Pix from "./Payment/Pix";
import Boleto from "./Payment/Boleto";
import Credito from "./Payment/Credito";
import axios from "axios";

function Checkout() {
  const { paymentData } = useSelector((state) => state.payment);

  const [isPaid, setIsPaid] = useState(false);

  const checkPayment = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/payment/${paymentData.paymentId}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
      .then((results) => {
        setIsPaid(results.data.status === "paid");
      })
      .catch(() => {
        return;
      });
  };

  if (paymentData) {
    setInterval(() => {
      checkPayment();
    }, 10000);
  }

  return (
    <StyledCheckout>
      {(!paymentData ||
        paymentData?.last_transaction?.status === "not_authorized") && (
        <>
          <CheckoutStepper />
          <Container>
            <div class="steps">
              <Identification />
              <Delivery />
            </div>
            <Payment />
            <Summary />
          </Container>
        </>
      )}
      {!isPaid &&
        paymentData &&
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
      {isPaid && <Credito />}
    </StyledCheckout>
  );
}

export default Checkout;
