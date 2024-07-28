import { Page } from '@/models/common'
import { Customer, NewCustomer } from '@/models/customer'
import axios from 'axios'

export const addCustomer = async (customer: NewCustomer) => {
  await axios.post('/api/customers', customer)
}

export const getCustomers = async () => {
  const { data } = await axios.get<Page<Customer>>('/api/customers')
  return data
}
