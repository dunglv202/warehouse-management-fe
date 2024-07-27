export interface ProviderCriteria {
  keyword?: string
}

export interface NewProvider {
  name: string
  logo: File
  email?: string
  phone?: string
  address?: string
}

export interface Provider {
  id: number
  name: string
  logo: string
  email?: string
  phone?: string
  address?: string
}
