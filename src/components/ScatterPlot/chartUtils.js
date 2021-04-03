import { axisTop, axisRight, axisBottom, axisLeft } from 'd3-axis'
import { select } from 'd3-select'

import { DURATION } from '../../constants/animation'
import { CHART_DIM } from '../../constants/chart'

import colors from '../../styles/colors'
import { opacity } from '../../styles/opacity'

const createUpdateAxis = (ref, scale, type, isGrid) => {
  const axesTypes = {
    top: axisTop(scale),
    right: axisRight(scale),
    bottom: axisBottom(scale),
    left: axisLeft(scale),
  }

  const axisCall = axesTypes[type]
    .ticks((CHART_DIM / 150).toFixed(0))
    .tickSizeOuter(0)
    .tickSizeInner(isGrid ? CHART_DIM : 4)

  const element = select(ref.current)

  element
    .transition()
    .duration(DURATION.md)
    .call(
      isGrid ? axisCall : axisCall
      // .tickFormat(
      //     d =>
      //       emptyIfFalse(prefix) +
      //       changedFormat(d, metricIsPercentage, metricIsRounded, expPlus) +
      //       emptyIfFalse(suffix)
      //   )
    )
  formatAxisGrid(element, isGrid)
}

const formatAxisGrid = (element, isGrid) => {
  const texts = element.selectAll('text')
  const ticks = element.selectAll('.tick line')

  const setStyles = (selection, strokeColor, strokeOpacity) =>
    selection.style('stroke', strokeColor).attr('opacity', strokeOpacity)

  element.selectAll('.domain').remove()
  if (isGrid) {
    texts.remove()
    setStyles(ticks, colors.light, opacity.sm)
  }
  if (!isGrid) {
    texts.style('fill', colors.light).attr('font-size', '.875rem')
    ticks.style('stroke', colors.light).attr('opacity', 1)
  }
}
