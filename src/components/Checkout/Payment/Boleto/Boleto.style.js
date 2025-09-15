import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 50vh;
  box-sizing: border-box;
  width: 100%;
  max-width: 100vw;

  gap: 20px;

  @media (max-width: 768px) {
  }

  @media (max-width: 520px) {
    padding: 30px !important;
  }
`;
export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const EmailContainer = styled.p`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

export const Title = styled.p`
  font-size: 35px;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  text-align: center;
  color: #666;

  @media (max-width: 520px) {
    font-size: 28px;
  }
`;
export const Button = styled.button`
  margin: 0;
  width: 100%;
  min-height: 50px;
  line-height: 26px;
  background-color: #999999;
  color: #fff;
  padding: 12px 20px;
  font-size: 16px;
  border: 0;
  border-radius: 5px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  z-index: 9;
  margin-bottom: 20px;

  &:hover {
    opacity: 0.8;
  }
`;

export const Status = styled.p`
  background: #ffffd1;
  width: 100%;
  max-width: 50%;
  font-size: 14px;
  color: #bf9500;
  padding: 5px;
  text-align: center;
  border-radius: 8px;
`;
export const PaymentContainer = styled.div`
  background: #fcf8e3;
  border: 1px solid #faebcc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  align-items: center;
  gap: 10px;
  /* width: 700px;
  background-color: aqua; */

  @media (max-width: 520px) {
    padding: 20px !important;
    width: 80vw;
  }
`;
export const PaymentTitle = styled.p`
  font-size: 17px;
  font-family: "Nunito", sans-serif;
  color: #666667;
  text-align: center;
`;
export const PaymentInstructions = styled.p`
  font-size: 14px;
  text-align: center;
  color: #8a6d3b;

  @media (max-width: 520px) {
    font-size: 13px;
  }
`;

export const PaymentLabel = styled.p`
  font-size: 11px;
  font-weight: 700;
  color: #4d4d4d;
  align-self: flex-start;
  margin-top: 10px !important;
`;

// flex: 1, wordBreak: "break-all"
export const BarCodeContainer = styled.span`
  font-size: 15px;
  flex: 1;
  word-break: break-all;
  padding: 5px;
`;

export const PaymentValue = styled.p`
  border-radius: 8px;
  background: #ddd;
  color: #333;
  font-weight: 700;
  padding: 5px 10px;
  border: 1px dotted #333;
  display: flex;
  text-align: left;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  width: 600px;
  flex-wrap: wrap;

  @media (max-width: 650px) {
    width: auto;
    flex-wrap: nowrap;
  }

  @media (max-width: 520px) {
    max-width: 80vw;
    width: 100%;
    word-break: break-all;
    font-size: 12px;
  }
`;

export const BankList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 0;
  list-style: none;
  flex-wrap: wrap;

  @media (max-width: 520px) {
    gap: 3px;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const BankItem = styled.li`
  display: flex;
  align-items: center;
`;

export const BankLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  img {
    width: 45px;
    height: 30px;
  }

  @media (max-width: 520px) {
    img {
      width: 45px;
      height: 30px;
    }
  }
`;

export const CopyButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  font-size: 12px;
  background-color: #999999;
  border-radius: 4px;
  color: #ffffff;
  white-space: nowrap;
  margin-left: auto;
  gap: 6px;
  transition: background-color 0.2s ease;
  height: fit-content;
  flex-shrink: 0;

  &:hover {
    background-color: #777777;
  }

  @media (max-width: 520px) {
    font-size: 10px;
    padding: 6px 8px;
    gap: 4px;
  }
`;
