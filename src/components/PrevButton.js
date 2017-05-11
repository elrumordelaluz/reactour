import React from 'react';

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

export default PrevButton;