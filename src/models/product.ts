import { ShortCategory } from './category'

export interface Product {
  id: number
  name: string
  thumbnail: string
  stockQuantity: number
  categories: ShortCategory[]
}

export interface ProductCriteria {
  keyword?: string
}
