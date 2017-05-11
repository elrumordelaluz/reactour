import React from 'react';

import Button from 'components/Button';

function NextButton({
  current,
  lastStepNextButton,
  nextButton,
  nextStep,
  onRequestClose,
  stepsLength,
}) {
  const isLastStep = current === stepsLength - 1;
  return (
    <Button
      onClick={lastStepNextButton && isLastStep ? onRequestClose : nextStep}
      disabled={!lastStepNextButton && isLastStep}
    >
      {lastStepNextButton && isLastStep ? lastStepNextButton : nextButton}
    </Button>
  )
}

export default NextButton;