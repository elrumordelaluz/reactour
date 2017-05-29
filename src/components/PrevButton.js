import React, { PropTypes } from 'react';

import Button from 'components/Button';

function PrevButton({
  current,
  prevButton,
  prevStep,
}) {
  return (
    <Button
      onClick={prevStep}
      disabled={current === 0}
    >
      {prevButton}
    </Button>
  )
}

PrevButton.propTypes = {
  current: PropTypes.number,
  prevButton: PropTypes.string,
  prevStep: PropTypes.func.isRequired,
};

PrevButton.defaultProps = {
  current: 0,
  prevButton: 'Prev',
};

export default PrevButton;