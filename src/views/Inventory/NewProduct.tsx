import ImageUploader from '@/components/ImageUploader/ImageUploader'
import Loading from '@/components/Loading'
import useGuard from '@/hooks/useGuard'
import { Category } from '@/models/category'
import { type NewProduct } from '@/models/product'
import { getCategories } from '@/services/category-service'
import { createProduct } from '@/services/product-service'
import { Button, Card, Empty, Form, Input, InputNumber, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewProduct = () => {
  useGuard()

  const navigate = useNavigate()
  const [form] = Form.useForm<NewProduct>()
  const [categories, setCategories] = useState<Category[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [cateKeyword, setCateKeyword] = useState('')
  const [fetchingCates, setFetchingCates] = useState(false)

  const fetchCategories = async (keyword?: string) => {
    setFetchingCates(true)
    setCategories([])
    try {
      const result = await getCategories(keyword)
      setCategories(result.content)
    } finally {
      setFetchingCates(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories(cateKeyword?.trim())
    }, 300)
    return () => clearTimeout(timer)
  }, [cateKeyword])

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
          <Select
            mode='multiple'
            onChange={(selected) => form.setFieldsValue({ categoryIds: selected })}
            onSearch={setCateKeyword}
            filterOption={false}
            options={categories.map((cate) => ({
              value: cate.id,
              label: cate.name,
            }))}
            notFoundContent={fetchingCates ? <Loading /> : <Empty imageStyle={{ height: 50 }} />}
            style={{ width: '100%' }}
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
