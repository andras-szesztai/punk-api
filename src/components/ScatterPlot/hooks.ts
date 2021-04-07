import { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import isEqual from 'lodash/isEqual'
import { scaleLinear, scaleSqrt } from 'd3-scale'
import { extent } from 'd3-array'
import { Voronoi } from 'd3-delaunay'
import { select, selectAll } from 'd3-selection'

import { IProps, IStoredValues } from './ScatterPlot'

import {
  createDelaunayData,
  createUpdateAxis,
  createUpdateCircles,
} from './chartUtils'

import { CHART_DIM, SIZE_RANGE } from '../../constants/chart'

import { DataPoint } from '../../types/data'
import colors from '../../styles/colors'

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
  storedValues: MutableRefObject<IStoredValues>
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
  storedValues,
}: IParams) => {
  const { data, yKey, xKey, sizeKey } = props
  const [delaunay, setDelaunay] = useState<undefined | Voronoi<DataPoint>>(
    undefined
  )
  useEffect(() => {
    if (
      Array.isArray(data) &&
      data.length &&
      prevProps &&
      !isEqual(prevProps, props)
    ) {
      const filteredData = data.filter((d) => !!d[xKey] && !!d[yKey])
      const xExtent = extent(filteredData, (d) => d[xKey])
      let xScale, yScale, sizeScale
      if (!!xExtent[1]) {
        xScale = scaleLinear().domain(xExtent).range([0, CHART_DIM])
      }
      const yExtent = extent(filteredData, (d) => d[yKey])
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
      const sizeExtent = sizeKey && extent(filteredData, (d) => d[sizeKey])
      if (sizeExtent && !!sizeExtent[1]) {
        sizeScale = scaleSqrt().domain(sizeExtent).range(SIZE_RANGE)
      }
      if (xScale && yScale) {
        createUpdateCircles({
          area: refs.chartAreaRef,
          props,
          yScale,
          xScale,
          sizeScale,
          filteredData,
        })
        setDelaunay(createDelaunayData(data, xKey, xScale, yKey, yScale))
        storedValues.current = {
          xScale,
          yScale,
        }
      }
    }
  }, [data, props, prevProps, yKey, xKey, sizeKey, refs, storedValues])
  return delaunay
}

export const useUpdateOnHover = (tooltipData?: DataPoint) => {
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
}
