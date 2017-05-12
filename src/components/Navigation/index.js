import React, { PropTypes } from 'react';

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

Navigation.propTypes = {
  current: PropTypes.number,
  gotoStep: PropTypes.func,
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
}

export default Navigation;
