import { Page } from '@/models/common'
import { Import, NewImport } from '@/models/import'
import axios from 'axios'

export const addImport = async (imp: NewImport) => {
  await axios.post('/api/imports', imp)
}

export const getImports = async () => {
  return (await axios.get<Page<Import>>('/api/imports')).data
}
