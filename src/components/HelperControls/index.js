import React, { PropTypes } from 'react';

import Navigation from 'components/Navigation';
import NextButton from 'components/NextButton';
import PrevButton from 'components/PrevButton';

import StyledWrapper from './StyledWrapper';

function HelperControls({
  current,
  prevButton,
  prevStep,
  gotoStep,
  steps,
  lastStepNextButton,
  onRequestClose,
  nextStep,
  nextButton,
  showButtons,
  showNavigation,
}) {
  return (
    <StyledWrapper>
      { showButtons && (
        <PrevButton
          current={current}
          prevButton={prevButton}
          prevStep={prevStep}
        />
      )}
      { showNavigation && (
        <Navigation
          current={current}
          gotoStep={gotoStep}
          steps={steps}
        />
      )}
      { showButtons && (
        <NextButton
          lastStepNextButton={lastStepNextButton}
          current={current}
          stepsLength={steps.length}
          onRequestClose={onRequestClose}
          nextStep={nextStep}
          nextButton={nextButton}
        />
      )}
    </StyledWrapper>
  );
}

HelperControls.propTypes = {
  current: PropTypes.number,
  prevButton: PropTypes.string,
  prevStep: PropTypes.func.isRequired,
  gotoStep: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({
    'selector': PropTypes.string.isRequired,
    'content': PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.element,
      PropTypes.func,
    ]).isRequired,
    'position': PropTypes.string,
    'action': PropTypes.func,
    'style': PropTypes.object,
  })),
  lastStepNextButton: PropTypes.bool,
  onRequestClose: PropTypes.func,
  nextStep: PropTypes.func.isRequired,
  nextButton: PropTypes.string,
  showButtons: PropTypes.bool,
  showNavigation: PropTypes.bool,
}

HelperControls.defaultProps = {
  current: 0,
  prevButton: 'Prev',
  steps: [],
  lastStepNextButton: false,
  nextButton: 'Next',
  showButtons: true,
  showNavigation: true,
}

export default HelperControls;