export interface NewImportItem {
  productId: number
  quantity: number
  price: number
  notes?: string
}

export interface NewImport {
  providerId: number
  status: string
  paymentStatus: string
  date: Date
  items: NewImportItem[]
  shippingCost: number
  tax: number
  note?: string
}

export interface Import {
  id: number
  provider: string
  status: string
  paymentStatus: string
  date: Date
  total: number
}
