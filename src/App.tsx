import { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'

import { ChartContainer, MetricSelector, SearchBar } from './components'

import { useFetchOnMount } from './hooks'

import { METRICS } from './constants/metrics'
import ScatterPlot from './components/ScatterPlot/ScatterPlot'

import { DataPoint, TMetrics } from './types/data'

function App() {
  const { data, error } = useFetchOnMount()

  const [yMetric, setYMetric] = useState(METRICS[0].value as TMetrics)
  const [xMetric, setXMetric] = useState(METRICS[1].value as TMetrics)
  const [sizeMetric, setSizeMetric] = useState(
    undefined as TMetrics | undefined
  )

  const [searchDataPoint, setSearchedDataPoint] = useState('')
  const [selectedDataPoint, setSelectedDataPoint] = useState(
    undefined as undefined | DataPoint
  )

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
        <ScatterPlot
          data={data}
          yKey={yMetric}
          xKey={xMetric}
          sizeKey={sizeMetric}
          setSelectedDataPoint={setSelectedDataPoint}
        />
      </ChartContainer>
    </div>
  )
}

export default App
