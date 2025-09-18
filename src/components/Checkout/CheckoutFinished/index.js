import React, { useEffect, useState } from "react";
import {
  StyledFinishedContainer,
  FinishedContainer,
  ContentWrapper,
  SuccessIcon,
  CheckIcon,
  Title,
  Description,
  CountdownCard,
  CountdownText,
  CountdownNumber,
  LoadingSpinner,
  RedirectButton,
  EmailBold,
} from "./CheckoutFinished.style";
import { useSelector } from "react-redux";

function CheckoutFinished() {
  const [countdown, setCountdown] = useState(5);

  const { data: cartData } = useSelector((state) => state.summary);

  const customerEmail = cartData?.dados_capturados?.email || "";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href =
            "https://www.sterilybrasil.com/collections/linha-sterily";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <StyledFinishedContainer>
      <FinishedContainer>
        <ContentWrapper>
          <SuccessIcon>
            <CheckIcon>✓</CheckIcon>
          </SuccessIcon>

          <Title>Checkout já finalizado!</Title>

          <Description>
            Este carrinho já possui um pagamento processado. Todas as
            informações já foram enviadas para{" "}
            {customerEmail ? (
              <EmailBold>{customerEmail}</EmailBold>
            ) : (
              "o seu email"
            )}
            .
          </Description>

          <CountdownCard>
            <CountdownText>
              Você será redirecionado automaticamente em{" "}
              <CountdownNumber>{countdown}</CountdownNumber> segundos
            </CountdownText>
          </CountdownCard>

          <LoadingSpinner />

          <RedirectButton
            onClick={() => {
              window.location.href =
                "https://www.sterilybrasil.com/collections/linha-sterily";
            }}
          >
            Ir para a loja agora
          </RedirectButton>
        </ContentWrapper>
      </FinishedContainer>
    </StyledFinishedContainer>
  );
}

export default CheckoutFinished;
