import { Empty, Select, SelectProps } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import { useEffect, useState } from 'react'
import Loading from '../Loading'

export type Option = DefaultOptionType

export type OptionsFetchingFn = (keyword: string) => Promise<Option[]>

interface SearchSelectProps extends SelectProps {
  fetcher: OptionsFetchingFn
}

const SearchSelect = ({ fetcher, ...otherProps }: SearchSelectProps) => {
  const [options, setOptions] = useState<Option[]>([])
  const [keyword, setKeyword] = useState('')
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setFetching(true)
      try {
        setOptions(await fetcher(keyword?.trim()))
      } finally {
        setFetching(false)
      }
    }
    const timer = setTimeout(fetch, 300)

    return () => clearTimeout(timer)
  }, [keyword, fetcher])

  return (
    <Select
      mode='multiple'
      onSearch={setKeyword}
      filterOption={false}
      options={options}
      notFoundContent={fetching ? <Loading /> : <Empty imageStyle={{ height: 50 }} />}
      style={{ width: '100%' }}
      {...otherProps}
    />
  )
}

export default SearchSelect
