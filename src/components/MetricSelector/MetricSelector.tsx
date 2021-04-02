import { Dispatch, SetStateAction } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { METRICS } from '../../constants/metrics'

import { AbsContainer, IStyleProps } from './styles'

interface IProps extends IStyleProps {
  setMetric: Dispatch<SetStateAction<string>>
  metric: string
  clearable?: boolean
}

const MetricSelector = ({
  metric,
  setMetric,
  clearable,
  ...styleProps
}: IProps) => {
  return (
    <AbsContainer {...styleProps}>
      <Dropdown
        placeholder="Select Friend"
        selection
        onChange={(_, d) => {
          const selected = d.value
          if (typeof selected == 'string') {
            setMetric(selected)
          }
        }}
        value={metric}
        options={METRICS}
        clearable={clearable}
      />
    </AbsContainer>
  )
}

export default MetricSelector
