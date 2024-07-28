import { InputNumber, InputNumberProps } from 'antd'

const InputPrice = (props: InputNumberProps) => {
  return (
    <InputNumber
      addonBefore='$'
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
      {...props}
    />
  )
}

export default InputPrice
