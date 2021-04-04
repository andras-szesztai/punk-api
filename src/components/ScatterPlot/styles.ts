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
  filter: drop-shadow(1px 1px 2px rgba(54, 72, 94, 0.6));
`

export const TooltipRelativeContainer = styled.div`
  position: relative;
  display: grid;
  row-gap: 4px;
  color: ${colors.primary};
  white-space: nowrap;
  font-weight: 300;

  span {
    font-weight: 500;
  }

  :after {
    left: -24px;
    top: 15%;
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(136, 183, 213, 0);
    border-right-color: ${colors.light};
    border-width: 8px;
    margin-top: -8px;
  }
`
