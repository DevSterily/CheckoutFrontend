import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  min-height: 50vh;

  @media (max-width: 1060px) {
    display: flex;
    flex-direction: column;
    padding: 0px 16px 0 16px;
  }
`;
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media (max-width: 1060px) {
    align-items: center;
    font-size: 17px;
    color: #666667;
    width: 100%;
    margin-bottom: 37px;
  }
`;
export const Title = styled.p`
  font-size: 30px;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  color: #666667;

  @media (max-width: 1060px) {
    padding-top: 20px;
  }
`;
export const Description = styled.p`
  width: 80%;
  color: #333;

  @media (max-width: 1060px) {
    font-size: 17px;
    color: #666667;
    width: 80%;
  }
`;
export const Status = styled.p`
  background: ${(props) => (props.isPaid ? "#f9fdf7" : "#ffffd1")};
  width: 100%;
  max-width: 50%;
  font-size: 14px;
  color: ${(props) => (props.isPaid ? "#36b376" : "#bf9500")};
  padding: 12px 32px 12px 32px;
  text-align: center;
  border-radius: 28px;

  @media (max-width: 1060px) {
    font-size: 15px;
    color: #bf9500;
    width: 70%;

    max-width: 100%;
  }
`;
export const PaymentContainer = styled.div`
  background: white;
  border-radius: 8px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 1060px) {
    padding: 30px 40px;
    max-width: 100%;
  }
`;
export const PaymentTitle = styled.p`
  font-size: 14px;
  text-align: center;
`;
export const PaymentImage = styled.img`
  height: 200px;
  width: 200px;
`;
export const PaymentValue = styled.p`
  margin-top: 40px;
`;

export const InstructionsContainer = styled.div`
  font-size: 14px;
  color: #333;
  margin-top: 10px;
  max-width: 330px;
  text-align: center;
  font-weight: 500;
  line-height: 1.4;
`;

export const TimeDisplay = styled.strong`
  display: inline-block;
  min-width: 50px;
  text-align: center;
`;

export const CopyCodeButton = styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  cursor: pointer;
  width: 85%;
  justify-content: center;
  padding: 12px 15px;
  background-color: #666666;
  font-weight: 700;
  border-radius: 5px;
  color: #fff;
  gap: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e8e8e8;
  }

  &:active {
    background-color: #ddd;
  }
`;

export const LoadingDots = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 15px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #bf9500;
    animation: loadingDots 1.4s infinite ease-in-out both;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }

    &:nth-child(3) {
      animation-delay: 0s;
    }
  }

  @keyframes loadingDots {
    0%,
    80%,
    100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
