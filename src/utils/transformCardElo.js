export const transformToUnknown = () => {
  setTimeout(() => {
    const eloCard = document.querySelector(".jp-card-elo");
    if (eloCard) {
      eloCard.classList.remove("jp-card-elo");
      eloCard.classList.add("jp-card-unknown");

      const eloLogo = eloCard.querySelector(".jp-card-logo.jp-card-elo");
      if (eloLogo) {
        eloLogo.classList.remove("jp-card-elo");
        eloLogo.classList.add("jp-card-unknown");

        eloLogo.innerHTML = "unknown";
      }
    }
  }, 100);
};

export const transformUnknownToElo = () => {
  setTimeout(() => {
    const unknownCard = document.querySelector(".jp-card-unknown");
    if (unknownCard) {
      unknownCard.classList.remove("jp-card-unknown");
      unknownCard.classList.add("jp-card-elo");

      const unknownLogo = unknownCard.querySelector(
        ".jp-card-logo.jp-card-unknown"
      );
      if (unknownLogo) {
        unknownLogo.classList.remove("jp-card-unknown");
        unknownLogo.classList.add("jp-card-elo");

        unknownLogo.innerHTML = `
          <div class="e">e</div>
          <div class="l">l</div>
          <div class="o">o</div>
        `;
      }
    }
  }, 100);
};
