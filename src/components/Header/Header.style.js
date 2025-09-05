import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #f7f7f8;
  box-shadow: 0 0 2px 0 hsla(0, 0%, 80%, 0.5);
  height: 80px;
  color: #666666;

  @media (max-width: 520px) {
    height: 48px;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  max-width: 1196px;
  width: 100%;
  position: relative;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  padding: 12px 0;
`;

export const Logo = styled.img`
  display: block;
  max-height: 45px;
  max-width: 165px;
  width: 100%;
  object-fit: contain;

  @media (max-width: 520px) {
    max-height: 30px;
    max-width: 45px;
  }
`;

export const ItemSecurity = styled.div`
  display: block;
  float: right;

  .desktop-security {
    display: block;

    @media (max-width: 520px) {
      display: none;
    }
  }

  .mobile-security {
    display: none;

    @media (max-width: 520px) {
      display: block;
      width: 28px;
      height: 28px;
      fill: #4d4d4d;
    }
  }

  @media (max-width: 1060px) {
    margin-right: 50px;
  }

  @media (max-width: 520px) {
    margin-right: 21px;
  }
`;
