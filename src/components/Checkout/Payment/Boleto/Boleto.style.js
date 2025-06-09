import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 50vh;
  gap: 20px;
`
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const Title = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: #666;
`
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
  font-family: 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  z-index: 9;
  
  &:hover {
    opacity: .8;
  }
`

export const Status = styled.p`
  background: #ffffd1;
  width: 100%;
  max-width: 50%;
  font-size: 14px;
  color: #bf9500;
  padding: 5px;
  text-align: center;
  border-radius: 8px;
`
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
    width: 80vw;
  }
`
export const PaymentTitle = styled.p`
  font-size: 14px;
  text-align: center;
`
export const PaymentInstructions = styled.p`
  font-size: 14px;
  text-align: center;
  color: #917a50;
`

export const PaymentLabel = styled.p`
  font-size: 12px;
  font-weight: 700;
  margin-top: 10px !important;
`

export const PaymentValue = styled.p`
  border-radius: 8px;
  background: #ddd;
  color: #333;
  font-weight: 700;
  padding: 5px 10px;
  border: 1px dotted #333;
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  width: 600px;

  @media (max-width: 650px) {
    width: auto;
    flex-direction: column;
  }

  @media (max-width: 520px) {
    max-width: 80vw;
    width: 100%;
    word-break: break-all;
    
  }
`