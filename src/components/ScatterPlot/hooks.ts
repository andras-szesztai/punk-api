import { useRef } from 'react'

export const useMakeRefs = () => {
  const yAxisRef = useRef<SVGGElement>(null)
  const yGridRef = useRef<SVGGElement>(null)
  const xGridRef = useRef<SVGGElement>(null)
  const xAxisRef = useRef<SVGGElement>(null)
  const chartAreaRef = useRef<SVGGElement>(null)
  const delaunayRef = useRef<SVGGElement>(null)

  return { yAxisRef, yGridRef, xGridRef, xAxisRef, chartAreaRef, delaunayRef }
}
