import React from 'react';

import Dot from 'components/Dot';

import StyledNav from './StyledNav';

function Navigation({
  current,
  gotoStep,
  steps,
}) {
  return (
    <StyledNav>
      { steps.map((s,i) => (
        <Dot
          key={`${s.selector}_${i}`}
          onClick={() => gotoStep(i)}
          current={current}
          index={i}
          disabled={current === i} />
      ))}
    </StyledNav>
  );
}

export default Navigation;
