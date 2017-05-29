import styled from 'styled-components';

import Mask from 'components/Mask';
import safe from 'utils/safe';

const RightMask = styled(Mask)`
  top: ${props => props.targetTop - props.padding}px;
  left: ${props => props.targetLeft + props.targetWidth + props.padding}px;
  width: ${props => safe(props.windowWidth - props.targetWidth - props.targetLeft - props.padding)}px;
  height: ${props => props.targetHeight + (props.padding * 2)}px;
`

export default RightMask;
