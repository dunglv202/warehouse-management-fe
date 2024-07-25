import Loading from '@/components/Loading'
import NewButton from '@/components/Toolbar/NewButton'
import Search from '@/components/Toolbar/Search'
import Toolbar from '@/components/Toolbar/Toolbar'
import useGuard from '@/hooks/useGuard'
import { type Category } from '@/models/category'
import { getCategories } from '@/services/category-service'
import { Flex } from 'antd'
import { useEffect, useState } from 'react'
import CategoryCard from './components/CategoryCard'
import NewCategory from './NewCategory'

const Category = () => {
  useGuard()

  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [showForm, setShowForm] = useState(false)
  const [refresh, setRefresh] = useState({})

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const fetched = (await getCategories(keyword)).content
        setCategories(fetched)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [keyword, refresh])

  return (
    <div>
      <Toolbar style={{ marginBottom: 30 }}>
        <Search onSearch={setKeyword} />
        <NewButton onClick={() => setShowForm(true)} />
      </Toolbar>
      <Loading loading={loading}>
        <Flex wrap gap={30}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </Flex>
      </Loading>
      {showForm && (
        <NewCategory close={() => setShowForm(false)} onSaveDone={() => setRefresh({})} />
      )}
    </div>
  )
}

export default Category
