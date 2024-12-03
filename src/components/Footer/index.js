import React from "react";
import {
  Container,
  StyledFooter,
  Icon,
  ItemSecurity,
  Label,
  PaymentList,
  Text,
} from "./Footer.style";

function Footer() {
  const currentYear = new Date().getFullYear();
  const storeInfo = [
    {
      type: "site",
      text: "Sterily: sterilybrasil.com",
    },
    {
      type: "adress",
      text: "Rua Governador Valadares, 582 - Centro Extrema - MG",
    },
    {
      type: "name",
      text: `© ${currentYear} STERILY BRASIL INTERMEDIACAO DE COMERCIO ELETRONICO LTDA - CNPJ: 39.996.062/0003-00`,
    },
    {
      type: "contact",
      text: "Whatsapp: (35) 99141-6513 / E-mail: sac@sterilybrasil.com",
    },
  ];

  const icons = [
    { slug: "billet", icon: "assets/img/payment/card-billet.svg" },
    { slug: "amex", icon: "assets/img/payment/card-amex.svg" },
    { slug: "visa", icon: "assets/img/payment/card-visa.svg" },
    { slug: "diners", icon: "assets/img/payment/card-diners.svg" },
    { slug: "mastercard", icon: "assets/img/payment/card-mastercard.svg" },
    { slug: "discover", icon: "assets/img/payment/card-discover.svg" },
    { slug: "aura", icon: "assets/img/payment/card-aura.svg" },
    { slug: "hipercard", icon: "assets/img/payment/card-hipercard.svg" },
    { slug: "elo", icon: "assets/img/payment/card-elo.svg" },
    { slug: "hiper", icon: "assets/img/payment/card-hiper.svg" },
    { slug: "pix", icon: "assets/img/payment/card-pix.svg" },
  ];

  return (
    <StyledFooter>
      <Container>
        <Label>Formas de pagamento</Label>
        <PaymentList>
          {icons.map((payment) => {
            return (
              <Icon src={payment.icon} alt={payment.slug} key={payment.slug} />
            );
          })}
        </PaymentList>
        {storeInfo.map((info) => {
          return <Text key={info.type}>{info.text}</Text>;
        })}
        <ItemSecurity
          src="assets/img/safepayment.svg"
          alt="Pagamento 100% Seguro"
        />
      </Container>
    </StyledFooter>
  );
}

export default Footer;
