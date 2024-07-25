import { Category } from '@/models/category'
import { Page } from '@/models/common'
import axios from 'axios'

export const getCategories = async (keyword?: string) => {
  return (
    await axios.get<Page<Category>>('/api/categories', {
      params: { keyword },
    })
  ).data
}
