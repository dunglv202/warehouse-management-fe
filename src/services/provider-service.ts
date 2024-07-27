import { Page } from '@/models/common'
import { NewProvider, Provider, ProviderCriteria } from '@/models/provider'
import axios from 'axios'
import qs from 'qs'

export const getProviders = async (criteria?: ProviderCriteria) => {
  return (await axios.get<Page<Provider>>('/api/providers', { params: criteria })).data
}

export const addProvider = async (provider: NewProvider) => {
  console.log(qs.stringify(provider, { allowDots: true }))

  await axios.postForm('/api/providers', provider, {
    formSerializer: {
      dots: true,
    },
  })
}
