import { axisTop, axisRight, axisBottom, axisLeft } from 'd3-axis'
import { select } from 'd3-selection'
import { easeCubicInOut } from 'd3-ease'
import 'd3-transition'

import { DURATION } from '../../constants/animation'
import { DIM, RADIUS } from '../../constants/chart'

import colors from '../../styles/colors'
import opacity from '../../styles/opacity'

export const createUpdateAxis = (ref, scale, type, isGrid) => {
  const axesTypes = {
    top: axisTop(scale),
    right: axisRight(scale),
    bottom: axisBottom(scale),
    left: axisLeft(scale),
  }

  const axisCall = axesTypes[type]
    .ticks(10)
    .tickSizeOuter(0)
    .tickSizeInner(isGrid ? DIM : 4)
  const element = select(ref.current)

  element.transition().duration(DURATION.md).ease(easeCubicInOut).call(axisCall)
  formatAxisGrid(element, isGrid)
}

const formatAxisGrid = (element, isGrid) => {
  const texts = element.selectAll('text')
  const ticks = element.selectAll('.tick line')
  const domain = element.select('.domain')

  domain.remove()
  if (isGrid) {
    texts.remove()
    ticks.style('stroke', colors.light).attr('opacity', opacity.sm)
  } else {
    texts.style('fill', colors.light).attr('font-size', '.875rem')
    ticks.style('stroke', colors.light).attr('opacity', opacity.no)
  }
}

export const createUpdateCircles = ({
  area,
  props,
  yScale,
  xScale,
  sizeScale,
}) => {
  const chartArea = select(area.current)
  const { data, yKey, xKey, sizeKey } = props
  const setY = (d) => yScale(d[yKey])
  const setX = (d) => xScale(d[xKey])
  const setRadius = (d) => (sizeKey ? sizeScale(d[sizeKey]) : RADIUS)
  const t = chartArea.transition().duration(DURATION.md).ease(easeCubicInOut)
  const doUpdate = (type) =>
    type
      .transition(t)
      .attr('r', setRadius)
      .attr('cy', setY)
      .attr('cx', setX)
      .attr('fill', colors.lightOpaque)
      .attr('stroke', colors.light)

  chartArea
    .selectAll('circle')
    .data(data, (d) => d.id)
    .join(
      (enter) =>
        enter
          .append('circle')
          .attr('r', 0)
          .attr('stroke-width', 1)
          .attr('pointer-events', 'none')
          .attr('cy', setY)
          .attr('cx', setX)
          .call(doUpdate),
      (update) => update.call(doUpdate),
      (exit) => exit.call((exit) => exit.transition(t).attr('r', 0).remove())
    )
}
