import ImageUploader from '@/components/ImageUploader/ImageUploader'
import SearchSelect, { OptionsFetchingFn } from '@/components/SearchSelect/SearchSelect'
import useGuard from '@/hooks/useGuard'
import { type NewProduct } from '@/models/product'
import { getCategories } from '@/services/category-service'
import { createProduct } from '@/services/product-service'
import { Button, Card, Form, Input, InputNumber } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewProduct = () => {
  useGuard()

  const navigate = useNavigate()
  const [form] = Form.useForm<NewProduct>()
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    setSubmitting(true)
    try {
      await form.validateFields()
      await createProduct(form.getFieldsValue())
      navigate('/inventory')
    } finally {
      setSubmitting(false)
    }
  }

  const cateFetcher: OptionsFetchingFn = async (keyword: string) => {
    const categories = (await getCategories(keyword)).content
    return categories.map((cate) => ({ label: cate.name, value: cate.id }))
  }

  return (
    <Card bordered={false}>
      <Form form={form} autoComplete='off' layout='vertical' onSubmitCapture={submit}>
        <Form.Item
          label='Thumbnail'
          name='thumbnail'
          rules={[{ required: true, message: 'Thumbnail is required' }]}
        >
          <ImageUploader onUpload={(file) => form.setFieldsValue({ thumbnail: file })} />
        </Form.Item>
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Stock quantity'
          name='stockQuantity'
          rules={[{ required: true, message: 'Quantity is required' }]}
        >
          <InputNumber min={0} controls={false} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label='Categories' name='categoryIds'>
          <SearchSelect
            onChange={(selected) => form.setFieldsValue({ categoryIds: selected })}
            fetcher={cateFetcher}
          />
        </Form.Item>
        <Button type='primary' htmlType='submit' loading={submitting}>
          Confirm
        </Button>
      </Form>
    </Card>
  )
}

export default NewProduct
