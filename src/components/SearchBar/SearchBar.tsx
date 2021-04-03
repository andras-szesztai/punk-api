import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

import { DataPoint } from '../../types/data'

import { AbsContainer } from './styles'

interface IProps {
  setValue: Dispatch<SetStateAction<string>>
  value: string
  data?: DataPoint[]
}

type TOption = {
  text: string
  key: string
  value: string
}

const SearchBar = ({ setValue, value, data }: IProps) => {
  const [options, setOptions] = useState([] as undefined | Array<TOption>)
  useEffect(() => {
    if (Array.isArray(data) && data.length) {
      setOptions(
        data
          .map((d) => ({ key: d.name, text: d.name, value: d.name }))
          .sort((a, b) => a.key.localeCompare(b.key))
      )
    }
  }, [data])

  return (
    <AbsContainer>
      <Dropdown
        placeholder="Search a beer"
        selection
        onChange={(_, d) => {
          const selected = d.value
          if (typeof selected == 'string') {
            setValue(selected)
          }
        }}
        value={value}
        options={options}
        icon="search"
        search
        clearable
      />
    </AbsContainer>
  )
}

export default SearchBar
