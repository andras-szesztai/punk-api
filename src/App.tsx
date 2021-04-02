import { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'

import { ChartContainer, MetricSelector } from './components'
import { METRICS } from './constants/metrics'

import { useFetchOnMount } from './hooks'

function App() {
  const { data, error } = useFetchOnMount()

  const [yMetric, setYMetric] = useState(METRICS[0].value)
  const [xMetric, setXMetric] = useState(METRICS[1].value)
  const [sizeMetric, setSizeMetric] = useState('')

  return (
    <div className="App">
      <ChartContainer>
        <MetricSelector
          metric={yMetric}
          setMetric={setYMetric}
          top={10}
          left={-200}
        />
        <MetricSelector
          metric={xMetric}
          setMetric={setXMetric}
          right={10}
          bottom={-40}
        />
        <MetricSelector
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
