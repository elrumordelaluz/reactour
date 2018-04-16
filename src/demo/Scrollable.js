import styled from 'styled-components'
import { themeColors } from './settings'

export default styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  color: ${themeColors.dark};
  width: 130px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
`
