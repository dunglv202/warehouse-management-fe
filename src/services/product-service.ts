import { Page, Pagination } from '@/models/common'
import { NewProduct, Product, ProductCriteria } from '@/models/product'
import axios from 'axios'

export const getProducts = async (criteria?: ProductCriteria, pagination?: Pagination) => {
  return (
    await axios.get<Page<Product>>('/api/products', {
      params: { ...criteria, ...pagination },
    })
  ).data
}

export const createProduct = async (product: NewProduct) => {
  await axios.postForm('/api/products', product)
}
