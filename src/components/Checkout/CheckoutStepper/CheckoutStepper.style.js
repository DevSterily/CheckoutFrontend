import styled from "styled-components";

export const StepperContainer = styled.div`
  display: none;
  @media (max-width: 1060px) {
    position: relative;
    width: 100%;
    max-width: 1196px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    @media (max-width: 520px) {
      padding: 0px;
      margin-bottom: 20px;
    }
  }
`;

export const StepsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  position: relative;
  z-index: 1;
  flex-shrink: 0;

  &::before {
    content: "";
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #d5d5d5;
    z-index: 0;
  }

  @media (max-width: 1060px) {
    max-width: 90%;
    min-width: 90%;
  }

  @media (max-width: 520px) {
    max-width: 90%;
    min-width: 90%;
  }
`;

export const ProgressLine = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
  width: ${(props) => props.progress}%;
  height: 2px;
  background-color: #36b376;
  z-index: 1;
  transition: width 0.3s ease;
  max-width: 100%;

  @media (max-width: 1060px) {
    max-width: 100%;
  }

  @media (max-width: 520px) {
    max-width: 100%;
  }
`;

export const Step = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;
  cursor: ${(props) => (props.isClickable ? "pointer" : "default")};
  transition: all 0.2s ease;

  &:hover {
    ${(props) =>
      props.isClickable &&
      `
      transform: translateY(-2px);
      .step-circle {
        box-shadow: 0 4px 12px rgba(54, 179, 118, 0.3);
      }
      .step-label {
        color: #36b376;
      }
    `}
  }

  @media (max-width: 1060px) {
    flex: 1;
  }

  @media (max-width: 520px) {
    flex: 1;
  }
`;

export const StepCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isCompleted ? "#36b376" : props.isActive ? "#36b376" : "#d5d5d5"};
  color: ${(props) => (props.isCompleted || props.isActive ? "#fff" : "#999")};
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #f7f9fa;
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
  cursor: ${(props) => (props.isClickable ? "pointer" : "default")};
  top: -1px;

  @media (max-width: 520px) {
    width: 20px;
    height: 20px;
    font-size: 13px;
    top: -1px;
  }
`;

export const StepLabel = styled.div`
  font-size: 14px;
  color: ${(props) =>
    props.isCompleted ? "#000" : props.isActive ? "#000" : "#999"};
  font-weight: ${(props) =>
    props.isCompleted || props.isActive ? "bold" : "normal"};
  text-align: center;
  line-height: 1;
  transition: all 0.3s ease;
  cursor: ${(props) => (props.isClickable ? "pointer" : "default")};

  @media (max-width: 520px) {
    font-size: 11px;
  }
`;
