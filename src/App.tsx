
import { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'

import { ChartContainer } from './components';
import { METRICS } from './constants/metrics';

import { useFetchOnMount } from './hooks';

function App() {

  const { data, error } = useFetchOnMount()

  const [ yMetric, setYMetric ] = useState(METRICS[0].key)
  const [ xMetric, setXMetric ] = useState(METRICS[1].key)
  const [ sizeMetric, setSizeMetric ] = useState("")

  return (
    <div className="App">
     <ChartContainer/>
    </div>
  );
}

export default App;
