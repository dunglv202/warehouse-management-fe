import { Empty, Select, SelectProps } from 'antd'
import Loading from '../Loading'
import { useEffect, useState } from 'react'

interface SearchSelectProps extends SelectProps {
  fetcher: (keyword: string) => Promise<unknown[]>
}

const SearchSelect = ({ fetcher }: SearchSelectProps) => {
  const [keyword, setKeyword] = useState('')
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState<unknown[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setFetching(true)
      await fetcher(keyword).finally(() => setFetching(false))
    }, 300)

    return () => clearTimeout(timer)
  }, [keyword, fetcher])

  return (
    <Select
      mode='multiple'
      onChange={(selected) => form.setFieldsValue({ categoryIds: selected })}
      onSearch={setKeyword}
      filterOption={false}
      notFoundContent={fetching ? <Loading /> : <Empty imageStyle={{ height: 50 }} />}
      style={{ width: '100%' }}
    />
  )
}

export default SearchSelect
