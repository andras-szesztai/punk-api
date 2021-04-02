
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'

import { ChartContainer } from './components';
import { DataPoint } from './types/data';

function App() {

  const [ data, setData ] = useState([] as (undefined | Array<DataPoint>))
  const isFetched = useRef(false)

  useEffect(() => {
    if(!isFetched){
      // axios
      // .all()
      // .then()
    }
  }, [data, setData])
  
  return (
    <div className="App">
     <ChartContainer/>
    </div>
  );
}

export default App;
