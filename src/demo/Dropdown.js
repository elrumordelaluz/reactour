import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { fontFamily, headingSizes, themeColors } from './settings'

const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-item: center;
`

const DropdownContent = styled.div`
  position: absolute;
  background-color: white;
  padding: 15px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.75);
  color: black;
  font-family: ${fontFamily};
  font-size: 14px;
  line-height: 1.5;
  right: 0;
  top: 40px;
  border-radius: 5px;
  text-align: left;
  width: 300px;
`

const DropdownTrigger = styled.div`
  border-radius: 50%;
  background-color: ${themeColors.light};
  color: white;
  font-size: ${headingSizes[3]};
  display: inline-block;
  width: ${headingSizes[1]};
  height: ${headingSizes[1]};
  text-align: center;
  margin-left: 5px;
  cursor: pointer;
`

export default ({ children }) => {
  const [visible, setVisible] = useState(false)

  return (
    <DropdownWrapper>
      <DropdownTrigger onClick={() => setVisible(!visible)}>?</DropdownTrigger>
      {visible && (
        <DropdownContent data-tut="reactour__highlighted-absolute-child">
          {children}
        </DropdownContent>
      )}
    </DropdownWrapper>
  )
}
