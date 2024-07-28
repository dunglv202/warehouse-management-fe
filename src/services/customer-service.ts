import { Page, Pagination } from '@/models/common'
import { Customer, CustomerCriteria, NewCustomer } from '@/models/customer'
import axios from 'axios'

export const addCustomer = async (customer: NewCustomer) => {
  await axios.post('/api/customers', customer)
}

export const getCustomers = async (criteria?: CustomerCriteria, pagination?: Pagination) => {
  const { data } = await axios.get<Page<Customer>>('/api/customers', {
    params: { ...criteria, ...pagination },
  })
  return data
}
