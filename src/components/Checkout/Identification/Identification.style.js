import styled from "styled-components";

export const Container = styled.div`
  border: 2px solid #999999;
  cursor: default;
  background: #fff;
  border-radius: 5px;
  margin: 0;
  padding: 30px;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const Step = styled.span`
  background: #333;
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
`

export const Title = styled.p`
  line-height: 21px;
  font-weight: 700;
  color: #666667;
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
  width: ${(props) => (props.phone ? '100%' : 'initial')};
  border-top-left-radius: ${(props) => (props.phone ? '0 !important' : '5px')};
  border-bottom-left-radius: ${(props) => (props.phone ? '0 !important' : '5px')};

  &:focus {
    background: #f4f6f8;
    border-color: #333;
  }
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

export const ArrowRight = styled.i`
  background: url(assets/img/icons/right.svg) no-repeat;
  height: 13px;
  width: 17px;
  display: flex;
`