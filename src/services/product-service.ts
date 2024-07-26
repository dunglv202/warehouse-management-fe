import { Page } from '@/models/common'
import { NewProduct, Product, ProductCriteria } from '@/models/product'
import axios from 'axios'

export const getProducts = async (criteria: ProductCriteria) => {
  return (
    await axios.get<Page<Product>>('/api/products', {
      params: criteria,
    })
  ).data
}

export const createProduct = async (product: NewProduct) => {
  await axios.postForm('/api/products', product)
}
