import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { ScaleLinear } from 'd3-scale'
import { select, selectAll } from 'd3-selection'

import { useCreateUpdateElements, useMakeRefs } from './hooks'
import { usePrevious } from '../../hooks'

import { DataPoint, TMetrics } from '../../types/data'

import { CHART_DIM, MARGINS } from '../../constants/chart'
import { METRICS_KEY_TO_TEXT } from '../../constants/metrics'

import { Svg, Tooltip, TooltipRelativeContainer } from './styles'
import colors from '../../styles/colors'

export interface IProps {
  yKey: TMetrics
  xKey: TMetrics
  setSelectedDataPoint: Dispatch<SetStateAction<DataPoint | undefined>>
  searchDataPoint?: DataPoint
  sizeKey?: TMetrics
  data?: DataPoint[]
}

export interface IStoredValues {
  yScale: ScaleLinear<number, number, never> | undefined
  xScale: ScaleLinear<number, number, never> | undefined
}

const ScatterPlot = (props: IProps) => {
  const prevProps = usePrevious(props)
  const { data, setSelectedDataPoint, xKey, yKey, searchDataPoint } = props
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

  const tooltipData = searchDataPoint || hoveredData
  useEffect(() => {
    if (!!tooltipData) {
      selectAll('circle')
        .attr('fill', colors.lightOpaque)
        .each((d: any, i, n) => {
          if (d.id === tooltipData.id) {
            select(n[i]).raise()
            select(n[i]).attr('fill', colors.light)
          }
        })
    } else {
      selectAll('circle').attr('fill', colors.lightOpaque)
    }
  })
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
              onMouseEnter={() => !searchDataPoint && setHoveredData(data[i])}
              onMouseLeave={() => !searchDataPoint && setHoveredData(undefined)}
              onClick={() =>
                !!searchDataPoint
                  ? setSelectedDataPoint(searchDataPoint)
                  : setSelectedDataPoint(data[i])
              }
            />
          ))}
      </Svg>
      {tooltipData && xScale && yScale && (
        <Tooltip
          top={yScale(tooltipData[yKey])}
          left={xScale(tooltipData[xKey]) + MARGINS.left + 20}
        >
          <TooltipRelativeContainer>
            <div>
              <span>{tooltipData.name}</span>
            </div>
            <div>
              {METRICS_KEY_TO_TEXT[yKey]}:&nbsp;{' '}
              <span>{tooltipData[yKey]}</span>
            </div>
            <div>
              {METRICS_KEY_TO_TEXT[xKey]}: &nbsp;
              <span>{tooltipData[xKey]}</span>
            </div>
            <div>
              <span>Click</span> to find out more!
            </div>
          </TooltipRelativeContainer>
        </Tooltip>
      )}
    </>
  )
}

export default ScatterPlot
