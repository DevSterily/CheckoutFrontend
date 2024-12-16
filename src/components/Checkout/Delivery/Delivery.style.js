import styled from "styled-components";
import CheckIcon from '@mui/icons-material/Check';
import InputMask from "react-input-mask";
import { Form } from "formik";
import { CircularProgress } from "@mui/material";

export const Container = styled.div`
  border: ${(props) => props.success ? 'none' : '2px solid #999999'};
  cursor: ${(props) => props.success ? 'pointer' : 'default'};
  background: ${(props) => props.success ? '#f9fdf7' : '#fff'};
  border-radius: 5px;
  margin: 0;
  padding: 30px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  position: relative;

  ${(props) => props.closed && `
    pointer-events: none;
    opacity: .5;
    border: none !important;
  `};

  @media (max-width: 1060px) {
    display: ${(props) => props.success ? 'none' : 'flex'};
    max-width: 500px;
    min-width: 500px;
    margin-top: 0px;
  }

  @media (max-width: 520px) {
    display: ${(props) => props.success ? 'none' : 'flex'};
    max-width: 50%;
    min-width: 50%;
    margin-top: 0px;
  }

  @media (max-width: 400px) {
    max-width: 80% !important;
    min-width: 80%;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const Step = styled.span`
  background: ${(props) => props.success ? '#36b376' : '#333'};
  color: #fff;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  line-height: 22px;
  width: 21px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.closed && `
    background: #ccc !important;
  `};
`

export const Title = styled.p`
  line-height: 21px;
  font-weight: 700;
  color: ${(props) => props.success ? '#36b376' : '#666667'};
  font-size: 18px;
`

export const Disclaimer = styled.p`
  margin-top: 8px !important;
  line-height: 1.4;
  font-size: 13px;
  color: #666667;
  margin-bottom: 20px !important;
`

export const Label = styled.p`
  color: #333;
  font-size: 13px;
  margin-bottom: 6px !important;
`

export const InputDefault = styled.input`
  display: flex;
  margin: 0;
  background: ${(props) => (props.error ? '#feecef' : '#fff')};
  border: ${(props) => (props.error ? '1px solid #e50f38' : '1px solid #d0d0d0')};
  border-radius: 5px;
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 14px;
  outline: none;
  padding: 16px 35px 15px 20px;
  margin-bottom: ${(props) => (props.error ? '0px' : '15px')};
  max-width: ${(props) => (props.small ? '200px' : 'initial')};
  width: ${(props) => ((props.phone && '100%') ||( props.number && '40px') || 'initial')};
  border-top-left-radius: ${(props) => (props.phone ? '0 !important' : '5px')};
  border-bottom-left-radius: ${(props) => (props.phone ? '0 !important' : '5px')};

  &:focus {
    background: #f4f6f8;
    border-color: #333;
  }

  background-image: ${(props) =>
    props.isValid
      ? `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2336b376"%3E%3Cpath d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4L9 16.2z"/%3E%3C/svg%3E')`
      : "none"};
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1.5rem;
`

export const InputMobileContainer = styled.div`
  display: flex;
`

export const InputMobileCode = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 0 !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  text-size-adjust: 100%;
  background: #f4f6f8;
  border: 1px solid #d0d0d0;
  border-collapse: separate;
  border-radius: 8px;
  color: #333;
  font-size: 13px;
  font-weight: 500;
  height: 45px;
  line-height: 14px;
  white-space: nowrap;
  width: 64px;
  padding: 0 8px;
`

export const Button = styled.button`
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
  
  &:hover {
    opacity: .8;
  }
`

export const ErrorMessage = styled.p`
  color: #e50f38;
  font-size: 11px;
  line-height: 1.3;
  margin: 7px 0 15px !important;
  text-align: left;
`

export const AddressContainer = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  gap: 10px;

  > div {
    display: flex;
    flex-direction: column;
  }
`

export const City = styled.p`
  margin: 15px 0 10px -5px !important;
  color: #666;
  font-size: 13px;
`

export const NewAddressButton = styled.a`
  padding: 6px 0px;
  font-size: 13px;
  font-weight: 500;
  color: #725BC2;
  border: 0;
  cursor: pointer;
  text-transform: uppercase;
  margin-bottom: 8px;
  margin-top: 20px;
  background: transparent;
  font-family: 'Montserrat', sans-serif;

  &:hover {
    opacity: .8;
  }
`

export const BackButton = styled.a`
  padding: 6px 0px;
  font-size: 13px;
  font-weight: 500;
  color: #725BC2;
  border: 0;
  cursor: pointer;
  text-transform: uppercase;
  margin-bottom: 8px;
  background: transparent;
  font-family: 'Montserrat', sans-serif;

  &:hover {
    opacity: .8;
  }
`


export const DeliveryCard = styled.div`
  background: ${(props) => props.checked ? '#f4f6f8' : '#fff'};
  border: 1px solid ${(props) => props.checked ? '#333' : '#d0d0d0'};
  border-radius: 5px;
  color: #333;
  cursor: pointer;
  display: block;
  font-size: 11px;
  line-height: 14px;
  margin: 0 0 10px;
  padding: 11px 15px;
  position: relative;
  ${(props) => props.shipping && `
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `};


  &:hover {
    background: #f4f6f8;
    border: 1px solid #333;
  }
`

export const RadioButton = styled.input.attrs({ type: "radio" })`
  height: 25px;
  width: 18px;
  cursor: pointer;
  margin: 0px;
  position: absolute;

   &:checked::before {
    content: "";
    width: 6px;
    height: 6px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  &:checked::after {
    content: "";
    width: 20px;
    height: 20px;
    background-color: #333;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const DeliveryTitle = styled.p`
  font-weight: 500;
  margin-left: 30px !important;
  font-size: ${(props) => props.big ? '12px' : '11px'};
  width: 70%;
`

export const DeliveryDescription = styled.p`
  margin-left: 30px !important;
  font-size: ${(props) => props.big ? '12px' : '11px'};
`

export const EditIcon = styled.i`
  background: url(assets/img/icons/pencil-edit.svg) no-repeat;
  height: 15px;
  width: 15px;
  display: flex;
  position: absolute;
  top: 10px;
  right: 40px;
  cursor: pointer;
  z-index: 2;
`

export const DeleteIcon = styled.i`
  background: url(assets/img/icons/delete.svg) no-repeat;
  height: 15px;
  width: 15px;
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 2;
`

export const DeliveryLabel = styled.p`
  border-top: 1px solid #eee;
  padding: 15px 0;
  font-size: 13px;
  color: #333;
  margin-top: 10px !important;
`

export const DeliveryPrice = styled.p`
  color: ${(props) => props.free ? '#999' : '#333'};
  text-decoration: ${(props) => props.free ? 'line-through' : 'none'};
  line-height: 1.4em;
  font-size: 12px;
  position: absolute;
  right: 15px;
  top: ${(props) => props.free ? '12px' : '24px'};
`

export const DeliveryDiscount = styled.p`
  font-size: 12px;
  color: #333;
  position: absolute;
  right: 15px;
  bottom: 10px;
`

export const ArrowRight = styled.i`
  background: url(assets/img/icons/right.svg) no-repeat;
  height: 13px;
  width: 17px;
  display: flex;
`

export const StyledCheckIcon = styled(CheckIcon)`
  fill: #36b376 !important;
`

export const FinalEditIcon = styled.i`
  background: url(assets/img/icons/pencil-edit.svg) no-repeat;
  height: 15px;
  width: 15px;
  display: flex;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 2;
`

export const DeliveryFinalTitle = styled.p`
  font-size: 14px;
  color: #333;
  font-weight: 500;
  margin-top: 20px !important;
  margin-bottom: 5px !important;
`

export const DeliveryFinalText = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px !important;
`

export const StyledInputMask = styled(InputMask)`
  display: flex;
  margin: 0;
  background: ${(props) => (props.error ? '#feecef' : '#fff')};
  border: ${(props) => (props.error ? '1px solid #e50f38' : '1px solid #d0d0d0')};
  border-radius: 5px;
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 14px;
  outline: none;
  padding: 16px 35px 15px 20px;
  margin-bottom: ${(props) => (props.error ? '0px' : '15px')};
  max-width: ${(props) => (props.small ? '200px' : 'initial')};
  width: ${(props) => ((props.phone && '100%') ||( props.number && '40px') || 'initial')};
  border-top-left-radius: ${(props) => (props.phone ? '0 !important' : '5px')};
  border-bottom-left-radius: ${(props) => (props.phone ? '0 !important' : '5px')};

  &:focus {
    background: #f4f6f8;
    border-color: #333;
  }

  background-image: ${(props) =>
    props.isValid
      ? `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2336b376"%3E%3Cpath d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4L9 16.2z"/%3E%3C/svg%3E')`
      : "none"};
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1.5rem;
`

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`

export const StyledLoading = styled(CircularProgress)`
  width: 10px !important;
  height: 10px !important;
  position: absolute;
  top: 135px;
  right: 120px;
`