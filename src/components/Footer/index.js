import React from "react";
import {
  Container,
  PaymentMethodsHolder,
  Title,
  PaymentList,
  PaymentIcon,
  LineBreak,
  StoreInfoHolder,
  StoreName,
  Address,
  SpaceHandler,
  StoreDocument,
  HolderStoreName,
  HolderDocument,
  Cnpj,
  ContactHolder,
  WhatsApp,
  Email,
  InlineBlock,
  ItemSecurity,
} from "./Footer.style";

const Footer = () => {
  return (
    <Container>
      <PaymentMethodsHolder>
        <Title>Formas de pagamento</Title>

        <PaymentList>
          <PaymentIcon
            loading="lazy"
            alt="billet"
            width="30"
            height="20"
            src="https://icons.yampi.me/svg/card-billet.svg"
          />
          <LineBreak className="hide" />

          <PaymentIcon
            loading="lazy"
            alt="amex"
            width="39"
            height="26"
            src="https://icons.yampi.me/svg/card-amex.svg"
          />
          <LineBreak className="hide" />

          <PaymentIcon
            loading="lazy"
            alt="visa"
            width="39"
            height="26"
            src="https://icons.yampi.me/svg/card-visa.svg"
          />
          <LineBreak className="hide" />

          <PaymentIcon
            loading="lazy"
            alt="diners"
            width="39"
            height="26"
            src="https://icons.yampi.me/svg/card-diners.svg"
          />
          <LineBreak className="hide" />

          <PaymentIcon
            loading="lazy"
            alt="mastercard"
            width="39"
            height="26"
            src="https://icons.yampi.me/svg/card-mastercard.svg"
          />
          <LineBreak className="hide" />

          <PaymentIcon
            loading="lazy"
            alt="discover"
            width="39"
            height="26"
            src="https://icons.yampi.me/svg/card-discover.svg"
          />
          <LineBreak className="hide" />

          <PaymentIcon
            loading="lazy"
            alt="aura"
            width="39"
            height="26"
            src="https://icons.yampi.me/svg/card-aura.svg"
          />
          <LineBreak className="hide" />

          <PaymentIcon
            loading="lazy"
            alt="hipercard"
            width="39"
            height="26"
            src="https://icons.yampi.me/svg/card-hipercard.svg"
          />
          <LineBreak className="hide" />

          <PaymentIcon
            loading="lazy"
            alt="elo"
            width="39"
            height="26"
            src="https://icons.yampi.me/svg/card-elo.svg"
          />
          <LineBreak className="hide" />

          <PaymentIcon
            loading="lazy"
            alt="hiper"
            width="39"
            height="26"
            src="https://icons.yampi.me/svg/card-hiper.svg"
          />
          <LineBreak className="hide" />

          <PaymentIcon
            loading="lazy"
            alt="pix"
            width="39"
            height="26"
            src="https://icons.yampi.me/svg/card-pix.svg"
          />
          <LineBreak className="hide" />
        </PaymentList>
      </PaymentMethodsHolder>

      <StoreName>Sterily: sterilybrasil.com</StoreName>

      <Address className="space-handler">
        Rua Governador Valadares, 582 - Centro - Extrema - MG
      </Address>

      <StoreDocument className="space-handler">
        <HolderStoreName>
          © 2025 STERILY BRASIL INTERMEDIACAO DE COMERCIO ELETRONICO LTDA
        </HolderStoreName>
        <Cnpj>CNPJ: 39.996.062/0003-00</Cnpj>
      </StoreDocument>

      <ContactHolder className="space-handler">
        <WhatsApp>Whatsapp: (35) 99141-6513</WhatsApp>
        <Email> E-mail: sac@sterilybrasil.com</Email>
      </ContactHolder>

      <ItemSecurity
        src="assets/img/safepayment.svg"
        alt="Pagamento 100% Seguro"
      />
    </Container>
  );
};

export default Footer;
