import { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'

import { ChartContainer, MetricSelector, SearchBar } from './components'

import { useFetchOnMount } from './hooks'

import { METRICS } from './constants/metrics'

function App() {
  const { data, error } = useFetchOnMount()

  const [searchDataPoint, setSearchedDataPoints] = useState('')

  const [yMetric, setYMetric] = useState(METRICS[0].value)
  const [xMetric, setXMetric] = useState(METRICS[1].value)
  const [sizeMetric, setSizeMetric] = useState('')

  // TODO:
  // 1. Add search based on data
  // 2. Add searchedDataPoint state
  // 3. Build Scatterplot

  return (
    <div className="App">
      <ChartContainer>
        <SearchBar
          data={data}
          setValue={setSearchedDataPoints}
          value={searchDataPoint}
        />
        <MetricSelector
          label="Y metric"
          metric={yMetric}
          setMetric={setYMetric}
          top={-20}
          left={-200}
        />
        <MetricSelector
          label="X metric"
          metric={xMetric}
          setMetric={setXMetric}
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
      </ChartContainer>
    </div>
  )
}

export default App
