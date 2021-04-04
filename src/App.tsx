import { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'

import {
  ChartContainer,
  InfoModal,
  MetricSelector,
  SearchBar,
  ScatterPlot,
} from './components'

import { useEventListener, useFetchOnMount } from './hooks'

import { METRICS } from './constants/metrics'

import { DataPoint, TMetrics } from './types/data'

function App() {
  const { data, error } = useFetchOnMount()

  const [yMetric, setYMetric] = useState(METRICS[0].value as TMetrics)
  const [xMetric, setXMetric] = useState(METRICS[1].value as TMetrics)
  const [sizeMetric, setSizeMetric] = useState(
    undefined as TMetrics | undefined
  )

  const [searchDataPoint, setSearchedDataPoint] = useState(
    undefined as undefined | DataPoint
  )
  const [selectedDataPoint, setSelectedDataPoint] = useState(
    undefined as undefined | DataPoint
  )

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' && searchDataPoint) {
      setSelectedDataPoint(searchDataPoint)
    }
  })

  return (
    <div className="App">
      <ChartContainer>
        <SearchBar
          data={data}
          setValue={setSearchedDataPoint}
          value={searchDataPoint}
        />
        <MetricSelector
          label="Y metric"
          metric={yMetric}
          setMetric={(val) => !!val && setYMetric(val as TMetrics)}
          top={-20}
          left={-200}
        />
        <MetricSelector
          label="X metric"
          metric={xMetric}
          setMetric={(val) => !!val && setXMetric(val as TMetrics)}
          right={0}
          bottom={-60}
          labelBottom
        />
        <MetricSelector
          label="Size metric"
          metric={sizeMetric}
          setMetric={setSizeMetric}
          left={-200}
          bottom={-40}
          clearable
        />
        {!error ? (
          <ScatterPlot
            data={data}
            yKey={yMetric}
            xKey={xMetric}
            sizeKey={sizeMetric}
            setSelectedDataPoint={setSelectedDataPoint}
            searchDataPoint={searchDataPoint}
          />
        ) : (
          <p>{error}</p>
        )}
      </ChartContainer>
      <InfoModal
        selectedDataPoint={selectedDataPoint}
        setSelectedDataPoint={setSelectedDataPoint}
        setSearchedDataPoint={setSearchedDataPoint}
      />
    </div>
  )
}

export default App
