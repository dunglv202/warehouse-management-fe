import { Category, NewCategory } from '@/models/category'
import { Page } from '@/models/common'
import axios from 'axios'

export const getCategories = async (keyword?: string) => {
  return (
    await axios.get<Page<Category>>('/api/categories', {
      params: { keyword },
    })
  ).data
}

export const createCategory = async (category: NewCategory) => {
  await axios.postForm('/api/categories', category)
}
