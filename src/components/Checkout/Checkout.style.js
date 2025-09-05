import styled from "styled-components";

export const StyledCheckout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 70vh;
  background: #f4f6f8;
  padding: 25px 0 45px;
  overflow: hidden !important;
`;
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: start;
  gap: 30px;
  max-width: 1196px;
  width: 100%;
  margin-top: 0;
  flex: 1;

  @media (max-width: 1060px) {
    flex: none;
    display: flex;
    flex-direction: column-reverse !important;
    align-items: center;
  }

  @media (max-width: 520px) {
    flex: none;
    display: flex;
    flex-direction: column-reverse !important;
    align-items: center;
    max-width: 100%;
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
      align-items: start;
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
      align-items: center;
      max-width: 100%;
    }
  }
`;
