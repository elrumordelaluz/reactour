import React, { PropTypes } from 'react';
import cn from 'classnames';

import RightMask from 'components/RightMask';
import TopMask from 'components/TopMask';
import BottomMask from 'components/BottomMask';
import LeftMask from 'components/LeftMask';

const CN = {
  base: 'reactour__mask',
  isOpen: 'reactour__mask--is-open',
}

function ComponentSpotLight({ refFromParent, onClick, isOpen, targetTop, targetLeft, targetWidth, targetHeight, windowWidth, windowHeight, maskSpace, maskClassName }) {
  return (
    <div
      ref={refFromParent}
      onClick={onClick}
      className={cn(CN.base, {
        [CN.isOpen]: isOpen,
      })}
    >
      <TopMask
        targetTop={targetTop}
        padding={maskSpace}
        className={maskClassName} />
      <RightMask
        targetTop={targetTop}
        targetLeft={targetLeft}
        targetWidth={targetWidth}
        targetHeight={targetHeight}
        windowWidth={windowWidth}
        padding={maskSpace}
        className={maskClassName} />
      <BottomMask
        targetHeight={targetHeight}
        targetTop={targetTop}
        windowHeight={windowHeight}
        padding={maskSpace}
        className={maskClassName} />
      <LeftMask
        targetHeight={targetHeight}
        targetTop={targetTop}
        targetLeft={targetLeft}
        padding={maskSpace}
        className={maskClassName} />
    </div>
  );
}

ComponentSpotLight.propTypes = {
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
  targetTop: PropTypes.number,
  targetLeft: PropTypes.number,
  targetWidth: PropTypes.number,
  targetHeight: PropTypes.number,
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  maskSpace: PropTypes.number,
  maskClassName: PropTypes.string,
}
export default ComponentSpotLight;
