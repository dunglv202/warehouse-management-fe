import ImageUploader from '@/components/ImageUploader/ImageUploader'
import useGuard from '@/hooks/useGuard'
import { Category } from '@/models/category'
import { getCategories } from '@/services/category-service'
import { createProduct } from '@/services/product-service'
import { Button, Card, Form, Input, InputNumber, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewProduct = () => {
  useGuard()

  const navigate = useNavigate()
  const [form] = Form.useForm<{
    name: string
    thumbnail: File
    stockQuantity: number
    categories?: number[]
  }>()
  const [categories, setCategories] = useState<Category[]>([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories()
      setCategories(result.content)
    }
    fetchCategories()
  }, [])

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

  return (
    <Card bordered={false}>
      <Form form={form} autoComplete='off' layout='vertical' onSubmitCapture={submit}>
        <Form.Item label='Thumbnail' name='thumbnail'>
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
        <Form.Item label='Categories' name='categories'>
          <Select
            mode='multiple'
            value={form.getFieldsValue().categories}
            onChange={(selected) => form.setFieldsValue({ categories: selected })}
            style={{ width: '100%' }}
            options={categories.map((cate) => ({
              value: cate.id,
              label: cate.name,
            }))}
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
