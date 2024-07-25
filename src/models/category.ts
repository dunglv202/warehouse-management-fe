export interface Category {
  id: number
  name: string
  thumbnail?: string
  description?: string
}

export interface NewCategory {
  name: string
  thumbnail?: File
  description?: string
}
