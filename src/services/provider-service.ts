import { Page } from '@/models/common'
import { NewProvider, Provider, ProviderCriteria } from '@/models/provider'
import axios from 'axios'

export const getProviders = async (criteria?: ProviderCriteria) => {
  return (await axios.get<Page<Provider>>('/api/providers', { params: criteria })).data
}

export const addProvider = async (provider: NewProvider) => {
  await axios.postForm('/api/providers', provider)
}
