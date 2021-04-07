import axios, { AxiosResponse } from 'axios'
import { useEffect, useRef, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'

import { ROOT_URL } from '../../constants/url'

import { DataPoint } from '../../types/data'

const useFetchOnMount = () => {
  const [data, setData] = useState<undefined | Array<DataPoint>>([])
  const [error, setError] = useState('')
  const isFetched = useRef(false)

  useEffect(() => {
    if (!isFetched.current) {
      axios
        .all([
          axios.get(`${ROOT_URL}?page=1&per_page=65`),
          axios.get(`${ROOT_URL}?page=2&per_page=65`),
          axios.get(`${ROOT_URL}?page=3&per_page=65`),
          axios.get(`${ROOT_URL}?page=4&per_page=65`),
          axios.get(`${ROOT_URL}?page=5&per_page=65`),
        ])
        .then(
          axios.spread((...args: AxiosResponse<Array<DataPoint>>[]) => {
            const allData = args.reduce((acc, curr) => {
              return (acc = [...acc, ...curr.data])
            }, [] as Array<DataPoint>)
            setData(allData)
          })
        )
        .catch(() => {
          setError('Sorry, something went wrong, please try again later.')
        })
      isFetched.current = true
    }
  }, [data, setData])

  return { data, error }
}

export default useFetchOnMount
