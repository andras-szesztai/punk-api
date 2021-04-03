import { Dispatch, SetStateAction } from 'react'
import { Dropdown } from 'semantic-ui-react'

import { METRICS } from '../../constants/metrics'
import { TMetrics } from '../../types/data'

import { AbsContainer, IStyleProps } from './styles'

interface IProps extends IStyleProps {
  setMetric: Dispatch<SetStateAction<TMetrics | undefined>>
  metric: TMetrics | undefined
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
        onChange={(_, d) => setMetric(d.value as TMetrics | undefined)}
        value={metric}
        options={METRICS}
        clearable={clearable}
      />
      {labelBottom && <label>{label}</label>}
    </AbsContainer>
  )
}

export default MetricSelector
