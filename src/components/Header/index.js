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
            <Logo src="/assets/img/logo.webp" alt="Logo Sterily" height="45" width="165" />
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
