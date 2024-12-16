import React from "react";
import { useSelector } from "react-redux";
import {
  Background,
  Description,
  StyledCircularProgress,
  Title,
} from "./Loading.style";
import { useEffect } from "react";

function Loading() {
  const { isLoading } = useSelector((state) => state.payment);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  if (isLoading)
    return (
      <Background>
        <StyledCircularProgress />
        <Title>aguarde...</Title>
        <Description>
          Estamos processando seu pedido. Não feche essa tela.
        </Description>
      </Background>
    );
}

export default Loading;
