import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { ScaleLinear } from 'd3-scale'

import { useCreateUpdateElements, useMakeRefs } from './hooks'
import { usePrevious } from '../../hooks'

import { DataPoint, TMetrics } from '../../types/data'

import { CHART_DIM, MARGINS } from '../../constants/chart'

import { Svg, Tooltip } from './styles'
import { METRICS_KEY_TO_TEXT } from '../../constants/metrics'

export interface IProps {
  yKey: TMetrics
  xKey: TMetrics
  setSelectedDataPoint: Dispatch<SetStateAction<DataPoint | undefined>>
  sizeKey?: TMetrics
  data?: DataPoint[]
}

export interface IStoredValues {
  yScale: ScaleLinear<number, number, never> | undefined
  xScale: ScaleLinear<number, number, never> | undefined
}

const ScatterPlot = (props: IProps) => {
  const prevProps = usePrevious(props)
  const { data, setSelectedDataPoint, xKey, yKey } = props
  const refs = useMakeRefs()
  const storedValues = useRef<IStoredValues>({
    xScale: undefined,
    yScale: undefined,
  })
  const { xScale, yScale } = storedValues.current
  const delaunay = useCreateUpdateElements({
    props,
    prevProps,
    refs,
    storedValues,
  })
  const [hoveredData, setHoveredData] = useState(
    undefined as undefined | DataPoint
  )

  return (
    <>
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
        {delaunay &&
          data &&
          data.map((_, i) => (
            <path
              key={i}
              d={delaunay.renderCell(i)}
              stroke="transparent"
              fill="transparent"
              onMouseEnter={() => setHoveredData(data[i])}
              onMouseLeave={() => setHoveredData(undefined)}
              onClick={() => setSelectedDataPoint(data[i])}
            />
          ))}
      </Svg>
      {hoveredData && xScale && yScale && (
        <Tooltip
          top={yScale(hoveredData[yKey])}
          left={xScale(hoveredData[xKey]) + MARGINS.left + 16}
        >
          <div>
            <span>{hoveredData.name}</span>
          </div>
          <div>
            {METRICS_KEY_TO_TEXT[yKey]}:&nbsp; <span>{hoveredData[yKey]}</span>
          </div>
          <div>
            {METRICS_KEY_TO_TEXT[xKey]}: &nbsp;<span>{hoveredData[xKey]}</span>
          </div>
          <div>
            <span>Click</span> to find out more!
          </div>
        </Tooltip>
      )}
    </>
  )
}

export default ScatterPlot
