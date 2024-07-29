export interface Page<T> {
  totalPages: number
  totalElements: number
  content: T[]
}

export interface Pagination {
  page?: number
  size?: number
}

export interface ApiError {
  code?: string
  message?: string
}

export interface Address {
  provinceId: number
  districtId: number
  wardId: number
  street: string
}
