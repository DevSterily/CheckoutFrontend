import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import InputMask from "react-input-mask";
import { Form } from "formik";

export const Container = styled.div`
  border: ${(props) => (props.success ? "none" : "2px solid #999999")};
  cursor: ${(props) => (props.success ? "pointer" : "default")};
  background: ${(props) => (props.success ? "#f9fdf7" : "#fff")};
  border-radius: 5px;
  margin: 0;
  padding: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;

  @media (max-width: 1060px) {
    padding: 30px 14px;
    box-sizing: border-box;
    display: ${(props) =>
      props.success || props.shouldHideOnMobile ? "none" : "flex"};
    max-width: 500px;
    min-width: 500px;
  }

  @media (max-width: 520px) {
    padding: 30px 14px;
    display: ${(props) =>
      props.success || props.shouldHideOnMobile ? "none" : "flex"};
    box-sizing: border-box;
    border: none;
    max-width: 100%;
    min-width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Step = styled.span`
  background: ${(props) => (props.success ? "#36b376" : "#333")};
  color: #fff;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;

  width: 21px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Title = styled.p`
  line-height: 21px;
  font-weight: 700;
  color: ${(props) => (props.success ? "#36b376" : "#666667")};
  font-size: 18px;

  @media (max-width: 1060px) {
    font-size: 17px;
    font-family: "Nunito", sans-serif;
  }
`;

export const Disclaimer = styled.p`
  margin-top: 8px !important;
  line-height: 1.4;
  font-size: 13px;
  color: #666667;
  margin-bottom: 20px !important;
`;

export const Label = styled.p`
  color: #333;
  font-size: 13px;

  margin-bottom: 6px !important;
`;

export const InputDefault = styled.input`
  display: flex;
  margin: 0;
  background: ${(props) => (props.error ? "#feecef" : "#fff")};
  border: ${(props) =>
    props.error ? "1px solid #e50f38" : "1px solid #d0d0d0"};
  border-radius: 5px;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 14px;
  max-height: 12px;
  outline: none;
  padding: 16px 35px 15px 20px;
  margin-bottom: ${(props) => (props.error ? "0px" : "15px")};
  max-width: ${(props) => (props.small ? "200px" : "initial")};
  width: ${(props) => (props.phone ? "100%" : "initial")};
  border-top-left-radius: ${(props) => (props.phone ? "0 !important" : "5px")};
  border-bottom-left-radius: ${(props) =>
    props.phone ? "0 !important" : "5px"};

  &:focus {
    background: #f4f6f8;
    border-color: #333;
    background-image: ${(props) =>
      props.isValid
        ? `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2336b376"%3E%3Cpath d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4L9 16.2z"/%3E%3C/svg%3E')`
        : "none"};
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 1.5rem;
  }

  background-image: ${(props) =>
    props.isValid
      ? `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2336b376"%3E%3Cpath d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4L9 16.2z"/%3E%3C/svg%3E')`
      : "none"};
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1.5rem;
`;

export const InputMobileContainer = styled.div`
  display: flex;
`;

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
  max-height: 43px;
  line-height: 14px;
  white-space: nowrap;
  width: 64px;
  padding: 0 8px;
`;

export const Button = styled.button`
  margin: 0;
  width: 100%;
  min-height: 50px;
  line-height: 26px;
  background-color: #58b62f;
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
  margin-top: 20px !important;
  gap: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 1060px) {
    margin-top: 10px !important;
  }
`;

export const ErrorMessage = styled.p`
  color: #e50f38;
  font-size: 11px;
  line-height: 1.3;
  margin: 7px 0 15px !important;
  text-align: left;
`;

export const ArrowRight = styled.i`
  background: url(assets/img/icons/right.svg) no-repeat;
  height: 13px;
  width: 17px;
  display: flex;
`;

export const StyledCheckIcon = styled(CheckIcon)`
  fill: #36b376 !important;
`;

export const EditIcon = styled.i`
  background: url(assets/img/icons/pencil-edit.svg) no-repeat;
  height: 15px;
  width: 15px;
  display: flex;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 2;
`;

export const IdentificationFinalTitle = styled.p`
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin-top: 20px !important;
  margin-bottom: 10px !important;
`;

export const IdentificationFinalText = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px !important;
`;

export const StyledInputMask = styled(InputMask)`
  display: flex;
  margin: 0;
  background: ${(props) => (props.error ? "#feecef" : "#fff")};
  border: ${(props) =>
    props.error ? "1px solid #e50f38" : "1px solid #d0d0d0"};
  border-radius: 5px;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 14px;
  max-height: 12px;
  outline: none;
  padding: 16px 35px 15px 20px;
  margin-bottom: ${(props) => (props.error ? "0px" : "15px")};
  max-width: ${(props) => (props.small ? "200px" : "initial")};
  width: ${(props) => (props.phone ? "100%" : "initial")};
  border-top-left-radius: ${(props) => (props.phone ? "0 !important" : "5px")};
  border-bottom-left-radius: ${(props) =>
    props.phone ? "0 !important" : "5px"};

  &:focus {
    background: #f4f6f8;
    border-color: #333;
    background-image: ${(props) =>
      props.isValid
        ? `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2336b376"%3E%3Cpath d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4L9 16.2z"/%3E%3C/svg%3E')`
        : "none"};
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 1.5rem;
  }

  background-image: ${(props) =>
    props.isValid
      ? `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2336b376"%3E%3Cpath d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4L9 16.2z"/%3E%3C/svg%3E')`
      : "none"};
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1.5rem;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;
