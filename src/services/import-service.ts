import { NewImport } from '@/models/import'
import axios from 'axios'

export const addImport = async (imp: NewImport) => {
  await axios.post('/api/imports', imp)
}
