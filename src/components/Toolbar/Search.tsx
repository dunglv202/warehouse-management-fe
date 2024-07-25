import { IconSearch } from '@tabler/icons-react'
import { Input } from 'antd'
import { useEffect, useState } from 'react'

const SEACH_DELAY = 500

interface SearchProps {
  onSearch: (keyword: string) => void
}

const Search = ({ onSearch }: SearchProps) => {
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (!onSearch) return
    const doSearch = setTimeout(() => onSearch(keyword.trim()), SEACH_DELAY)
    return () => clearTimeout(doSearch)
  }, [keyword, onSearch])

  return (
    <Input
      prefix={<IconSearch size={18} color='#4f5d75' />}
      placeholder='Search'
      style={{ width: 'initial' }}
      onChange={(e) => setKeyword(e.target.value)}
    />
  )
}

export default Search
