import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  min-height: 50vh;

  @media (max-width: 1060px) {
    display: flex;
    flex-direction: column;
  }
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
export const Description = styled.p`
  width: 60%;
  color: #333;
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
  background: white;
  border-radius: 8px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,.05);
`
export const PaymentTitle = styled.p`
  font-size: 14px;
  text-align: center;
`
export const PaymentImage = styled.img`
  height: 200px;
  width: 200px;
`
export const PaymentValue = styled.p``