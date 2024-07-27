import { DefaultOptionType } from 'antd/es/select'
import { removeVietnamesesTones } from './string-utils'

export const filterIgnoreVietnameseTones = (inputValue: string, option?: DefaultOptionType) => {
  const inp = removeVietnamesesTones(inputValue).toUpperCase()
  const opt = removeVietnamesesTones(option?.label?.toString() || '').toUpperCase()
  return opt.includes(inp)
}
