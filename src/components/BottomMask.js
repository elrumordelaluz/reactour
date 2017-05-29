import styled from 'styled-components';

import Mask from 'components/Mask';

const BottomMask = styled(Mask)`
  top: ${props => props.targetHeight + props.targetTop + props.padding}px;
  height: ${props => props.windowHeight + props.targetHeight - props.targetTop - props.padding}px;
`

export default BottomMask;
