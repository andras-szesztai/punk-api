import { useEffect, useRef, useState } from 'react'

import { useMakeRefs } from './hooks'

import { DataPoint } from '../../types/data'

import { MARGINS } from '../../constants/chart'

import { Svg } from './styles'

interface IProps {
  yKey: string
  xKey: string
  sizeKey?: string
  data?: DataPoint[]
}

const ScatterPlot = ({ data, yKey, xKey, sizeKey }: IProps) => {
  const {
    yAxisRef,
    yGridRef,
    xGridRef,
    xAxisRef,
    chartAreaRef,
    delaunayRef,
  } = useMakeRefs()
  const translate = `translate(${MARGINS.left} ${MARGINS.top})`
  const storedValues = useRef({})

  useEffect(() => {
    if (Array.isArray(data) && data.length) {
      // const xScale =
    }
  }, [data])

  return (
    <Svg>
      <g ref={yAxisRef} transform={translate} />
      <g ref={yGridRef} transform={translate} />
      <g ref={xGridRef} transform={translate} />
      <g ref={xAxisRef} transform={translate} />
      <g ref={chartAreaRef} transform={translate} />
      <g ref={delaunayRef} />
    </Svg>
  )
}

export default ScatterPlot
