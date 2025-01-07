import React from "react";
import {
  Container,
  StyledHeader,
  ItemSecurity,
  Logo,
  LogoContainer,
} from "./Header.style";

function Header() {
  return (
    <StyledHeader>
      <Container>
        <LogoContainer>
          <a href="https://www.sterilybrasil.com/">
            <Logo src="assets/img/logo.svg" alt="Logo Sterily" />
          </a>
        </LogoContainer>
        <ItemSecurity
          src="assets/img/safepayment.svg"
          alt="Pagamento 100% Seguro"
        />
      </Container>
    </StyledHeader>
  );
}

export default Header;
