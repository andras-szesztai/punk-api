import styled from 'styled-components'
import { DIM } from '../../constants/chart'
import colors from '../../styles/colors'

export const MainContainer = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${colors.primary};
`

export const SubContainer = styled.section`
  width: ${DIM}px;
  height: ${DIM}px;

  position: relative;
`
