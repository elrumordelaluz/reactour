import styled from 'styled-components';

import Mask from 'components/Mask';
import safe from 'utils/safe';

const TopMask = styled(Mask)`
  height: ${props => safe(props.targetTop - props.padding)}px
`

export default TopMask;
