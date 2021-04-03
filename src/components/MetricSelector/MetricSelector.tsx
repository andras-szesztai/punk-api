import { Dispatch, SetStateAction } from 'react'
import { Dropdown } from 'semantic-ui-react'

import { METRICS } from '../../constants/metrics'

import { AbsContainer, IStyleProps } from './styles'

interface IProps extends IStyleProps {
  setMetric: Dispatch<SetStateAction<string>>
  metric: string
  label: string
  labelBottom?: boolean
  clearable?: boolean
}

const MetricSelector = ({
  metric,
  setMetric,
  clearable,
  label,
  labelBottom,
  ...styleProps
}: IProps) => {
  return (
    <AbsContainer {...styleProps}>
      {!labelBottom && <label>{label}</label>}
      <Dropdown
        placeholder="Select a metric"
        selection
        onChange={(_, d) => {
          const selected = d.value
          if (typeof selected == 'string') {
            setMetric(selected)
          }
        }}
        value={metric}
        search
        options={METRICS}
        clearable={clearable}
      />
      {labelBottom && <label>{label}</label>}
    </AbsContainer>
  )
}

export default MetricSelector
