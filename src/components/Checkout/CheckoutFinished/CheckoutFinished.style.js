import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const FinishedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-template-columns: none;
  max-width: 100%;
  width: 100%;
`;

export const StyledFinishedContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #f8f9fa;
  padding: 25px 0 15px;
  overflow: hidden !important;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    min-height: 50vh;
    padding: 1.5rem 1rem;
    max-width: 100%;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 480px) {
    min-height: 50vh;
    padding: 1rem;
    max-width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

export const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }
`;

export const CheckIcon = styled.span`
  font-size: 2.5rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const Title = styled.h1`
  color: #28a745;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 0.6rem;
    line-height: 1.2;
  }
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 500px;
  padding: 40px;
  line-height: 1.6;

  @media (max-width: 1060px) {
    margin: 20px;
    padding: 20px;
    font-size: 1rem;
    line-height: 1.4;
  }
`;

export const CountdownCard = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  max-width: 400px;

  @media (max-width: 768px) {
    padding: 1.2rem;
    margin-bottom: 1.5rem;
    max-width: 100%;
    margin: 20px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin-bottom: 2.2rem;
    margin: 20px;
    max-width: 90%;
  }
`;

export const CountdownText = styled.p`
  font-size: 0.9rem;
  color: #6c757d;
  margin: 0;

  @media (max-width: 1060px) {
    margin: 20px;
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;

export const CountdownNumber = styled.strong`
  color: #28a745;
  font-size: 1.1rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const EmailBold = styled.strong`
  color: #28a745;
  font-weight: bold;
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #28a745;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    border-width: 3px;
    border-top-width: 3px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    border-width: 3px;
    border-top-width: 3px;
    margin-bottom: 0.8rem;
  }
`;

export const RedirectButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #218838;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.3);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.95rem;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    padding: 10px 18px;
    font-size: 0.9rem;
    width: 90%;
    max-width: 280px;
    margin: 0 auto;
    display: block;
  }
`;
