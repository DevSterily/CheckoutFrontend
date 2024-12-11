import styled from 'styled-components'

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #F7F7F8;
  box-shadow: 0 0 2px 0 hsla(0,0%,80%,.5);
  height: 80px;
  color: #666666;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  max-width: 1196px;
  width: 100%;
  position: relative;
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  padding: 12px 0;
`

export const Logo = styled.img`
  display: block;
  max-height: 45px;
  max-width: 165px;
  width: 100%;
  object-fit: contain;
`

export const ItemSecurity = styled.img`
  display: block;
  float: right;

  @media (max-width: 1060px) {
    margin-right: 50px;
  }
`