import { Address } from './common'

export interface CustomerCriteria {
  keyword?: string
}

export interface NewCustomer {
  firstName: string
  lastName?: string
  email?: string
  phone?: string
  idCardNo?: string
  address: Address
  notes?: string
}

export interface Customer {
  id: number
  firstName: string
  lastName?: string
  email?: string
  phone?: string
  idCardNo?: string
  address: string
  notes?: string
}
