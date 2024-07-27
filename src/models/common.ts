export interface Page<T> {
  totalPages: number
  totalElements: number
  content: T[]
}

export interface Address {
  provinceId: number
  districtId: number
  wardId: number
  street: string
}
