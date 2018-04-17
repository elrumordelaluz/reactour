import styled, { keyframes } from 'styled-components'
import { fontFamily } from './settings'

// from http://codepen.io/lbebber/pen/ypgql?editors=0100
const steps = 20
const rnd = () => Math.floor(Math.random() * 100)
const doPercAndValue = (a, i) => ({
  perc: `${i * (100 / steps)}%`,
  value: `clip: rect(${rnd()}px, 9999px, ${rnd()}px, 0)`,
})

const doKeyframes = () =>
  Array(steps)
    .fill(null)
    .map(doPercAndValue)
    .reduce((acc, next) => {
      return `${acc}
${next.perc} {
  ${next.value}
}`
    }, '')

const anim = keyframes`${doKeyframes()}`
const anim2 = keyframes`${doKeyframes()}`

export default styled.div`
    font-size: 3em;
    position: relative;
    font-family: ${fontFamily}

    &:after {
        content: attr(data-glitch);
        position: absolute;
        left: 2px;
        text-shadow: -1px 0 red;
        top: 0;
        color: white;
        background: black;
        overflow: hidden;
        clip: rect(0, 900px, 0, 0);
        animation: ${anim} 2s infinite linear alternate-reverse;
    }

    &:before {
        content: attr(data-glitch);
        position: absolute;
        left: -2px;
        text-shadow: 1px 0 blue;
        top: 0;
        color: white;
        background: black;
        overflow: hidden;
        clip: rect(0, 900px, 0, 0);
        animation: ${anim2} 3s infinite linear alternate-reverse;
  }
`
