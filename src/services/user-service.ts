import { User } from '@/models/user'
import axios from 'axios'

export const getMyInfo = async () => {
  return (await axios.get<User>('/api/users/me')).data
}
