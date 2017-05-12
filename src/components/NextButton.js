import React, { PropTypes } from 'react';

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

NextButton.propTypes = {
  current: PropTypes.number,
  lastStepNextButton: PropTypes.bool,
  nextButton: PropTypes.string,
  nextStep: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func,
  stepsLength: PropTypes.number,
};

NextButton.propTypes = {
  current: 0,
  lastStepNextButton: false,
  nextButton: 'Next',
  stepsLength: 0,
};

export default NextButton;