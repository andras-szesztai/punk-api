import styled from 'styled-components'
import colors from '../../styles/colors'

export const AbsContainer = styled.div`
  position: absolute;
  top: -42px;
  left: 0px;

  display: flex;
  flex-direction: column;

  label {
    color: ${colors.light};
  }
`
