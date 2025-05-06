import { CircularProgress } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  box-shadow: 0 4px 12px rgba(0,0,0,.05);
  background: #fff;
  /* border: 2px solid transparent; */
  border-radius: 5px;
  margin: 0;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;

  .group {
    margin-top: 15px;
  }

  @media (max-width: 1060px) {
    max-width: 500px;
    min-width: 500px;

    .group {
      order: 2;
      border-top: 1px solid #eee;
      margin-top: 10px;
      padding-top: 10px;
    }
  }

  @media (max-width: 520px) {
    max-width: 65%;
    min-width: 65%;
  }

   @media (max-width: 400px) {
    max-width: 80%;
    min-width: 80%;
  }
`;

export const Title = styled.span`
  color: #333 !important;
  margin-top: 7px;
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
`;

export const CouponLabel = styled.span`
  /* margin-top: 15px; */
  color: #333 !important;
  font-size: 13px;
  margin-bottom: 6px;
`;

export const CouponContainer = styled.div`
  display: flex;
  align-items: center;
  postion: relative;
`;

export const CouponInput = styled.input`
  height: 36px;
  max-width: 211px;
  padding-left: 44px;
  width: 100%;
  margin: 0;
  background: #fff;
  color: #333;
  font-weight: 400;
  font-family: 'Montserrat', sans-serif;
  line-height: 14px;
  outline: none;
  overflow: clip;
  border-radius: 5px;
  border: 1px solid #d0d0d0;
  
  &:focus {
    background: #f4f6f8;
    border-color: #333;
  }
`;

export const CouponIcon = styled.i`
  margin-left: 11px;
  pointer-events: none;
  position: relative;
  background: url(assets/img/icons/promocode-tag.svg) no-repeat;
  height: 23px;
  width: 24px;
  position: absolute;
`;

export const CouponButton = styled.button`
  width: auto;
  margin: 0;
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 500;
  height: 36px;
  color: #725BC2;
  border-radius: 5px;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  background: transparent;
  border: none;
  font-family: 'Montserrat', sans-serif;

  &:hover {
    text-decoration: underline;
  }
`;

export const PriceTotal = styled.div`
  background: #f4f6f8;
  border-radius: 4px;
  font-weight: 400;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const DescriptionContainer = styled.div`
  color: #333;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 1;
  padding: 9px 0;
  font-weight: 500;
`;

export const TotalContainer = styled.div`
  color: #44C485;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 1;
  padding: 9px 0;
  padding-bottom: 6px;
  padding-top: 12px;
  font-weight: 700;
  
  > p:last-of-type {
    font-size: 16px;
  }
`;

export const ItemsContainer = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: start;
  border-top: ${(props) => (props.isFirstItem ? "none" : "1px solid #eee")};
`;

export const ItemImage = styled.img`
  display: inline-block;
  max-height: 60px;
  object-fit: contain;
  width: 60px;
`;

export const ItemDetails = styled.div`
  padding-left: 15px;
  font-size: 12px;
`;

export const ItemName = styled.p`
  line-height: 1.4;
  color: #888;
  margin-bottom: 10px !important;
  max-width: 80%;
`;
export const ItemVariaton = styled.p`
  display: inline-block;
  line-height: 1.4;
  margin-left: -3px !important;
  padding: 0 3px;
  color: #666;
  font-weight: 700;
`;

export const ItemPrice = styled.p`
  line-height: 1.5;
  margin-top: 14px !important;
`;

export const QuantityContainer = styled.div`
  position: relative;
  margin-top: 11px; 
  max-width: 197px;
`;

export const QuantityRemove = styled.a`
  left: 0;
  padding: 16px 17px;
  font-size: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const RemoveIcon = styled.i`
  background: url(assets/img/icons/quantity-less.svg) no-repeat;
  height: 2px;
  width: 15px;
  display: flex;
`;

export const QuantityInput = styled.input`
  width: 100%;
  background-color: #f5f5f5;
  border: 0;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  margin: 0;
  padding: 9px;
  text-align: center;
  max-height: 35px;
  height: 100%;
  border-radius: 5px;
  color: #333;
  line-height: 14px;
  margin: 0;
  outline: none;
`;

export const QuantityAdd = styled.a`
  right: 0;
  padding: 10px 17px;
  font-size: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const AddIcon = styled.i`
  background: url(assets/img/icons/quantity-more.svg) no-repeat;
  height: 15px;
  width: 15px;
  display: flex;
`;

export const Delete = styled.i`
  background: url(assets/img/icons/delete.svg) no-repeat;
  height: 15px;
  width: 15px;
  display: flex;
  margin-left: 15px;
  position: absolute;
  right: 30px;
  cursor: pointer;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  width: 215px;
  height: 100%;
  background: #f5f5f5;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled(CircularProgress)`
  height: 20px !important;
  width: 20px !important;
  color: #999999 !important;
`;

export const ErrorMessage = styled.p`
  color: #e50f38;
  font-size: 11px;
  line-height: 1.3;
  margin: 7px 0 15px !important;
  text-align: left;
`;

export const ModalErrorTitle = styled.p`
  color: #333;
  font-size: 24px;
  font-weight: 700;
`;

export const ModalErrorDescription = styled.p`
  margin-top: 10px !important;
  color: #333;
`;

export const ModalErrorButtonOutline = styled.button`
  margin: 0;
  width: 100%;
  min-height: 50px;
  line-height: 26px;
  border: 2px solid #e50f38;
  background: transparent;
  color: #e50f38;
  padding: 12px 20px;
  font-size: 16px;
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
  margin-top: 40px;

  &:hover {
    opacity: .8;
  }
`;

export const ModalErrorButtonFilled = styled.button`
  margin: 0;
  width: 100%;
  min-height: 50px;
  line-height: 26px;
  background-color: #58B62F;
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
  margin-top: 10px;

  &:hover {
    opacity: .8;
  }
`;
