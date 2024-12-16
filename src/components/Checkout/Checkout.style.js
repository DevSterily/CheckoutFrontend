import styled from 'styled-components'

export const StyledCheckout = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 70vh;
  background: #F4F6F8;
  padding: 25px 0 45px;
  overflow: hidden !important;
`
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: start;
  gap: 30px;
  max-width: 1196px;
  width: 100%;

  @media (max-width: 1060px) {
    display: flex;
    flex-direction: column-reverse !important;
    align-items: center;
  }

  @media (max-width: 520px) {
    display: flex;
    flex-direction: column-reverse !important;
    align-items: center;
    max-width: 100%;
  }
`
