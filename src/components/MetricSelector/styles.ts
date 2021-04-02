import styled from 'styled-components'

export interface IStyleProps {
  top?: number
  left?: number
  bottom?: number
  right?: number
}

export const AbsContainer = styled.div<IStyleProps>`
  position: absolute;
  top: ${(props) => props.top + 'px'};
  bottom: ${(props) => props.bottom + 'px'};
  left: ${(props) => props.left + 'px'};
  right: ${(props) => props.right + 'px'};
`
