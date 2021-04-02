import { MainContainer, SubContainer } from './styles'

const ChartContainer: React.FC = ({ children }) => {
  return (
    <MainContainer>
      <SubContainer>{children}</SubContainer>
    </MainContainer>
  )
}

export default ChartContainer
