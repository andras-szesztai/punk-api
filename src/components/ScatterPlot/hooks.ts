import { RefObject, useEffect, useRef } from 'react'
import isEqual from 'lodash/isEqual'
import { scaleLinear, scaleSqrt } from 'd3-scale'
import { extent } from 'd3-array'

import { IProps } from './ScatterPlot'

import { createUpdateAxis, createUpdateCircles } from './chartUtils'

import { CHART_DIM, DOMAIN_PADDING, SIZE_RANGE } from '../../constants/chart'

export const useMakeRefs = () => {
  const yAxisRef = useRef<SVGGElement>(null)
  const yGridRef = useRef<SVGGElement>(null)
  const xGridRef = useRef<SVGGElement>(null)
  const xAxisRef = useRef<SVGGElement>(null)
  const chartAreaRef = useRef<SVGGElement>(null)
  const delaunayRef = useRef<SVGGElement>(null)

  return { yAxisRef, yGridRef, xGridRef, xAxisRef, chartAreaRef, delaunayRef }
}

interface IParams {
  props: IProps
  prevProps?: IProps
  refs: TRefs
}

type TRefs = {
  xAxisRef: RefObject<SVGGElement>
  xGridRef: RefObject<SVGGElement>
  yAxisRef: RefObject<SVGGElement>
  yGridRef: RefObject<SVGGElement>
  chartAreaRef: RefObject<SVGGElement>
  delaunayRef: RefObject<SVGGElement>
}

export const useCreateUpdateElements = ({
  props,
  prevProps,
  refs,
}: IParams) => {
  const { data, yKey, xKey, sizeKey } = props
  useEffect(() => {
    if (
      Array.isArray(data) &&
      data.length &&
      prevProps &&
      !isEqual(prevProps, props)
    ) {
      const xExtent = extent(data, (d) => d[xKey])
      let xScale, yScale, sizeScale
      if (!!xExtent[1]) {
        xScale = scaleLinear().domain(xExtent).range([0, CHART_DIM])
      }
      const yExtent = extent(data, (d) => d[yKey])
      if (!!yExtent[1]) {
        yScale = scaleLinear().domain(yExtent).range([CHART_DIM, 0])
      }
      if (xScale) {
        createUpdateAxis(refs.xAxisRef, xScale, 'bottom')
        createUpdateAxis(refs.xGridRef, xScale, 'top', true)
      }
      if (yScale) {
        createUpdateAxis(refs.yAxisRef, yScale, 'left')
        createUpdateAxis(refs.yGridRef, yScale, 'right', true)
      }
      const sizeExtent = sizeKey && extent(data, (d) => d[sizeKey])
      if (sizeExtent && !!sizeExtent[1]) {
        sizeScale = scaleSqrt().domain(sizeExtent).range(SIZE_RANGE)
      }
      createUpdateCircles({
        area: refs.chartAreaRef,
        props,
        yScale,
        xScale,
        sizeScale,
      })
    }
  }, [data, props, prevProps, yKey, xKey, sizeKey, refs])
}
