import styled from "styled-components";

export const Container = styled.div`
  background-color: #f8f9fa;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.6;

  @media (max-width: 1060px) {
    padding: 50px 38px;
  }

  @media (max-width: 480px) {
    padding: 30px 38px;
  }
`;

export const PaymentMethodsHolder = styled.div`
  margin-bottom: 30px;
`;

export const Title = styled.div`
  font-size: 13px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  margin-bottom: 15px;
  justify-content: center;
  display: flex;
  color: #666666;

  @media (max-width: 1060px) {
    font-size: 13px;
    justify-content: center;
    display: flex;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    justify-content: start;
    display: flex-start;
    margin-bottom: 5px;
  }
`;

export const PaymentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (max-width: 1060px) {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 480px) {
    justify-content: start;
    align-items: start;
  }
`;

export const PaymentIcon = styled.img`
  width: 39px;
  height: 26px;
  margin: 6px;
  object-fit: contain;

  @media (max-width: 1060px) {
    margin: 5px;
    width: 39px;
    height: 26px;
  }

  @media (max-width: 480px) {
    margin: 5px;
    width: 29px;
    height: 19px;
  }
`;

export const LineBreak = styled.span`
  &.hide {
    display: none;
  }
`;

export const StoreInfoHolder = styled.div`
  margin-bottom: 25px;
`;

export const StoreName = styled.div`
  font-size: 11px;
  font-weight: 400;
  margin-bottom: 4px;
  font-family: "Montserrat", sans-serif;
  color: #666666;
  text-align: center;

  @media (max-width: 1060px) {
    font-size: 11px;
    justify-content: center;
    display: flex;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    justify-content: start;
    display: flex-start;
  }
`;

export const Address = styled.div`
  font-size: 11px;
  color: #666666;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 1060px) {
    text-align: center;
  }

  @media (max-width: 480px) {
    text-align: start;
  }
  @media (max-width: 391px) {
    max-width: 230px;
  }
`;

export const SpaceHandler = styled.div`
  margin-bottom: 4px;
`;

export const StoreDocument = styled.div`
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  display: flex;
  gap: 8px;
  justify-content: center;

  @media (max-width: 670px) {
    text-align: center;
    display: block;
  }

  @media (max-width: 480px) {
    text-align: start;
    display: block;
  }
`;

export const HolderStoreName = styled.span`
  font-size: 11px;
  display: block;
  margin-bottom: 4px;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;
  color: #666666;
  text-align: center;

  @media (max-width: 1060px) {
    text-align: center;
  }

  @media (max-width: 480px) {
    text-align: start;
  }

  &.concatenated {
    display: none;

    @media (min-width: 391px) {
      display: block;
    }
  }

  &:not(.concatenated) {
    @media (min-width: 391px) {
      display: none;
    }
  }
`;

export const HolderDocument = styled.span`
  display: block;
  font-size: 11px;
`;

export const Cnpj = styled.span`
  font-weight: 400;
  font-size: 11px;
  font-family: "Montserrat", sans-serif;
  color: #666666;
  text-align: center;
  display: block;

  @media (max-width: 670px) {
    display: block;
  }

  @media (max-width: 1060px) {
    text-align: center;
  }

  @media (max-width: 480px) {
    text-align: start;
  }

  @media (min-width: 391px) {
    display: none;
  }
`;

export const ContactHolder = styled.div`
  margin-bottom: 25px;
  font-size: 11px;
  font-family: "Montserrat", sans-serif;
  color: #666666;
  text-align: center;

  @media (max-width: 670px) {
    text-align: center;
  }

  @media (max-width: 1060px) {
    text-align: center;
  }

  @media (max-width: 480px) {
    text-align: start;
  }
`;

export const WhatsApp = styled.span`
  display: inline-block;
  margin-right: 5px;

  @media (max-width: 670px) {
    display: block;
    margin-right: 0;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  &.concatenated {
    display: none;

    @media (min-width: 391px) {
      display: block;
    }
  }

  &:not(.concatenated) {
    @media (min-width: 391px) {
      display: none;
    }
  }
`;

export const Email = styled.span`
  display: inline-block;

  @media (max-width: 670px) {
    display: block;
  }

  @media (min-width: 391px) {
    display: none;
  }
`;

export const InlineBlock = styled.span`
  display: inline-block;
`;

export const ItemSecurity = styled.img`
  text-align: center;
  margin: 20px auto 0;
  display: block;

  @media (min-width: 1060px) {
    margin: 20px auto 0;
    display: block;
    text-align: center;
  }

  @media (max-width: 480px) {
    margin: 20px 0 0 0;
    display: block;
    text-align: start;
  }
`;
