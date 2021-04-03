import { useEffect } from 'react'
import isEqual from 'lodash/isEqual'
import { scaleLinear, scaleSqrt } from 'd3-scale'
import { extent } from 'd3-array'

import { createUpdateAxis } from './chartUtils'
import { useCreateUpdateElements, useMakeRefs } from './hooks'
import { usePrevious } from '../../hooks'

import { DataPoint, TMetrics } from '../../types/data'

import {
  CHART_DIM,
  DOMAIN_PADDING,
  MARGINS,
  SIZE_RANGE,
} from '../../constants/chart'

import { Svg } from './styles'

export interface IProps {
  yKey: TMetrics
  xKey: TMetrics
  sizeKey?: TMetrics
  data?: DataPoint[]
}

const ScatterPlot = (props: IProps) => {
  const prevProps = usePrevious(props)
  const refs = useMakeRefs()
  useCreateUpdateElements({ props, prevProps, refs })
  return (
    <Svg>
      <g
        ref={refs.yAxisRef}
        transform={`translate(${MARGINS.left} ${MARGINS.top})`}
      />
      <g
        ref={refs.yGridRef}
        transform={`translate(${MARGINS.left} ${MARGINS.top})`}
      />
      <g
        ref={refs.xGridRef}
        transform={`translate(${MARGINS.left} ${MARGINS.top + CHART_DIM})`}
      />
      <g
        ref={refs.xAxisRef}
        transform={`translate(${MARGINS.left} ${MARGINS.top + CHART_DIM})`}
      />
      <g
        ref={refs.chartAreaRef}
        transform={`translate(${MARGINS.left} ${MARGINS.top})`}
      />
      <g ref={refs.delaunayRef} />
    </Svg>
  )
}

export default ScatterPlot
