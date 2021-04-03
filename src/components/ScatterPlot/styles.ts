import styled from 'styled-components'
import colors from '../../styles/colors'

export const Svg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;

  path {
    cursor: pointer;
  }
`

interface ITooltipProps {
  top: number
  left: number
}

export const Tooltip = styled.div<ITooltipProps>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  background-color: ${colors.light};
  pointer-events: none;
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  color: ${colors.primary};
  white-space: nowrap;
  font-weight: 300;

  span {
    font-weight: 500;
  }
`
