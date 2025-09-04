import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StepperContainer,
  StepsWrapper,
  ProgressLine,
  Step,
  StepCircle,
  StepLabel,
} from "./CheckoutStepper.style";
import { changeStep } from "../../../redux/stepSlice";

const CheckoutStepper = () => {
  const dispatch = useDispatch();
  const { step } = useSelector((state) => state.step);
  const { hasFinished: identificationFinished } = useSelector(
    (state) => state.identification
  );
  const { hasFinished: deliveryFinished } = useSelector(
    (state) => state.delivery
  );
  const { hasFinished: paymentFinished } = useSelector(
    (state) => state.payment
  );

  const steps = [
    {
      id: 1,
      label: "Informações pessoais",
      isActive: step === 1 || identificationFinished,
      isCompleted: identificationFinished,
    },
    {
      id: 2,
      label: "Entrega",
      isActive: step === 2 || deliveryFinished,
      isCompleted: deliveryFinished,
    },
    {
      id: 3,
      label: "Pagamento",
      isActive: step === 3 || paymentFinished,
      isCompleted: paymentFinished,
    },
  ];

  const handleStepClick = (stepId) => {
    console.log(stepId);

    if (
      stepId === 1 ||
      (stepId === 2 && identificationFinished) ||
      (stepId === 3 && identificationFinished && deliveryFinished)
    ) {
      dispatch(changeStep(stepId));
      const stepElement = document.getElementById(`step-${stepId}`);
      if (stepElement) {
        const elementPosition =
          stepElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - 10;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  const getProgressPercentage = () => {
    if (identificationFinished && deliveryFinished && paymentFinished)
      return 100;
    if (identificationFinished && deliveryFinished) return 66.66;
    if (identificationFinished) return 33.33;
    return 0;
  };

  const getProgressWidth = () => {
    const baseWidth = getProgressPercentage();
    if (baseWidth === 100) return 100;
    if (baseWidth === 66.66) return 66.66;
    if (baseWidth === 33.33) return 33.33;
    return 33.33;
  };
  return (
    <StepperContainer>
      <StepsWrapper>
        <ProgressLine progress={getProgressWidth()} />
        {steps.map((stepItem, index) => (
          <Step
            key={stepItem.id}
            onClick={() => handleStepClick(stepItem.id)}
            isClickable={stepItem.isActive || stepItem.isCompleted}
          >
            <StepCircle
              isActive={stepItem.isActive}
              isCompleted={stepItem.isCompleted}
              isClickable={stepItem.isActive || stepItem.isCompleted}
            >
              {stepItem.id}
            </StepCircle>
            <StepLabel
              isActive={stepItem.isActive}
              isCompleted={stepItem.isCompleted}
              isClickable={stepItem.isActive || stepItem.isCompleted}
            >
              {stepItem.label}
            </StepLabel>
          </Step>
        ))}
      </StepsWrapper>
    </StepperContainer>
  );
};

export default CheckoutStepper;
