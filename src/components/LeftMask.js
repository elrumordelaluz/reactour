import styled from 'styled-components';

import Mask from 'components/Mask';
import { safe } from 'utils';

const LeftMask = styled(Mask)`
  top: ${props => props.targetTop - props.padding}px;
  width: ${props => safe(props.targetLeft - props.padding)}px;
  height: ${props => props.targetHeight + (props.padding * 2)}px;
`

export default LeftMask;
