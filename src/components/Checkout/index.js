import React, { useState, useEffect } from "react";
import { StyledCheckout, Container } from "./Checkout.style";
import CheckoutStepper from "./CheckoutStepper";
import Identification from "./Identification";
import Delivery from "./Delivery";
import Payment from "./Payment";
import Summary from "./Summary";
import CheckoutFinished from "./CheckoutFinished";
import { useSelector } from "react-redux";
import Pix from "./Payment/Pix";
import Boleto from "./Payment/Boleto";
import Credito from "./Payment/Credito";
import axios from "axios";

function Checkout() {
  const { paymentData } = useSelector((state) => state.payment);

  const [showCheckoutFinished, setShowCheckoutFinished] = useState(false);

  const checkPaymentByCartId = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const cartId = queryParams.get("cartId");

    if (cartId) {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/payment/cart/${cartId}`, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
          })
          .then((results) => {
            if (results.data.id) {
              setShowCheckoutFinished(true);
            }
          });
      } catch (error) {
        console.log("No payment found for cart ID:", cartId);
      }
    }
  };

  useEffect(() => {
    checkPaymentByCartId();
  }, []);

  if (showCheckoutFinished) {
    return <CheckoutFinished />;
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
