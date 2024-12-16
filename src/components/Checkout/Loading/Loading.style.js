import { CircularProgress } from "@mui/material";
import styled from "styled-components";

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 99;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`
export const StyledCircularProgress = styled(CircularProgress)`
  color: #999 !important;
  height: 30px !important;
  width: 30px !important;
`
export const Title = styled.p`
  font-size: 36px;
  font-weight: 700;
  color: #333;
`
export const Description = styled.p`
  color: #333;
`