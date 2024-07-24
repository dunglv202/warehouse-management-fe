import { AuthResult, Credential } from '@/models/auth'
import axios from 'axios'

export const login = async ({ username, password }: Credential) => {
  return (await axios.post<AuthResult>('/api/auth/login', { username, password })).data
}

export const logout = async () => {
  await axios.post<AuthResult>('/api/auth/logout')
}
