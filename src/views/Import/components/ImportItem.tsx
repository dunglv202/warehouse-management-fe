import InputPrice from '@/components/PriceInput/InputPrice'
import SearchSelect, { OptionsFetchingFn } from '@/components/SearchSelect/SearchSelect'
import { getProducts } from '@/services/product-service'
import { IconTrash } from '@tabler/icons-react'
import { Col, Form, FormListFieldData, Input, InputNumber, Row } from 'antd'
import { useEffect, useState } from 'react'

interface ImportItemProps {
  field: FormListFieldData
  remove: (name: number) => void
  onTotalSet: () => void
}

const ImportItem = ({ field, remove, onTotalSet }: ImportItemProps) => {
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    if (price && quantity) {
      onTotalSet()
    }
  }, [price, quantity, onTotalSet])

  const productFetcher: OptionsFetchingFn = async (keyword: string) => {
    const products = (await getProducts({ keyword })).content
    return products.map((p) => ({ label: p.name, value: p.id }))
  }

  return (
    <Row gutter={16} key={field.key}>
      <Col span={5}>
        <Form.Item
          name={[field.name, 'productId']}
          rules={[{ required: true, message: 'Product is required' }]}
        >
          <SearchSelect fetcher={productFetcher} showSearch />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={[field.name, 'notes']}>
          <Input maxLength={100} />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item
          name={[field.name, 'quantity']}
          rules={[{ required: true, message: 'Quanity is required' }]}
        >
          <InputNumber
            min={1}
            step='any'
            style={{ width: '100%' }}
            onChange={(val) => setQuantity(Number(val))}
          />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item
          name={[field.name, 'price']}
          rules={[{ required: true, message: 'Price is required' }]}
        >
          <InputPrice
            min={0}
            step='any'
            style={{ width: '100%' }}
            onChange={(val) => setPrice(Number(val))}
            controls={false}
          />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item>
          <Input
            addonBefore='$'
            value={price && quantity ? (price * quantity).toLocaleString() : ''}
            readOnly
          />
        </Form.Item>
      </Col>
      <Col span={1}>
        <Form.Item>
          <IconTrash
            onClick={() => remove(field.name)}
            size={18}
            className='hoverable'
            style={{ cursor: 'pointer' }}
          />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default ImportItem
