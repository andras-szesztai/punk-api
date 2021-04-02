import styled from "styled-components"
import colors from "../../styles/colors"

export const MainContainer = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${colors.primary};
`

export const SubContainer = styled.section`
  width: 600px;
  height: 600px;

  position: relative;
  background-color: ${colors.light};
`