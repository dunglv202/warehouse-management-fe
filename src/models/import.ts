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
  date?: Date
  note?: string
  items: NewImportItem[]
}
