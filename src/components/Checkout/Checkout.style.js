import styled from "styled-components";

export const StyledCheckout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 70vh;
  background: #f8f9fa;
  padding: 25px 0 15px;
  overflow: hidden !important;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 390px 390px 390px;
  align-items: start;
  gap: 30px;
  max-width: 1196px;
  width: 100%;
  margin-top: 0;
  flex: 1;

  @media (max-width: 1060px) {
    gap: 26px;
    flex: none;
    display: flex;
    flex-direction: column-reverse !important;
    align-items: stretch;
  }

  @media (max-width: 520px) {
    flex: none;
    display: flex;
    flex-direction: column-reverse !important;
    align-items: center;
    max-width: 100%;
    padding: 0 20px;
    gap: 20px;
  }

  div.group {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin-bottom: 30px !important;

    @media (max-width: 1060px) {
      display: flex;
      flex-direction: column !important;
      align-items: start;
      max-width: 100%;
      margin-bottom: 0px !important;
    }

    @media (max-width: 520px) {
      display: flex;
      flex-direction: column !important;
      align-items: stretch;
      width: 100%;
      max-width: 100%;
    }
  }

  div.steps {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin-bottom: 30px !important;

    @media (max-width: 1060px) {
      display: flex;
      box-sizing: border-box;
      flex-direction: column !important;
      align-items: center;
      max-width: 100%;
      margin-bottom: 0px !important;
    }

    @media (max-width: 520px) {
      display: flex;
      box-sizing: border-box;
      flex-direction: column !important;
      align-items: stretch;
      width: 100%;
      margin-bottom: 0px !important;
      gap: 20px;
    }
  }
`;
