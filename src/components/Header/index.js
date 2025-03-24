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
            <Logo src="https://www.sterilybrasil.com/cdn/shop/files/Copia_de_Purewash_2500_x_2500_px.png?v=1730811340&width=280" alt="Logo Sterily" height="45" width="165" />
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
