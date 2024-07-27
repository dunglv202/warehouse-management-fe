import { Division } from '@/models/division'
import axios from 'axios'

export const getProvinces = async () => {
  return (await axios.get<Division[]>('/api/divisions/provinces')).data
}

export const getDistricts = async (provinceId: number) => {
  return (await axios.get<Division[]>('/api/divisions/districts', { params: { provinceId } })).data
}

export const getWards = async (districtId: number) => {
  return (await axios.get<Division[]>('/api/divisions/wards', { params: { districtId } })).data
}
