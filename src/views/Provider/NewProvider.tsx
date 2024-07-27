import AddressSelect from '@/components/AddressSelect/AddressSelect'
import ImageUploader from '@/components/ImageUploader/ImageUploader'
import useGuard from '@/hooks/useGuard'
import { Address } from '@/models/common'
import { type NewProvider } from '@/models/provider'
import { addProvider } from '@/services/provider-service'
import { Button, Card, Form, Input } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewProvider = () => {
  useGuard()

  const navigate = useNavigate()
  const [form] = Form.useForm<NewProvider>()
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    setSubmitting(true)
    try {
      await form.validateFields()
      await addProvider(form.getFieldsValue())
      navigate('/provider')
    } finally {
      setSubmitting(false)
    }
  }

  const handleAddressChange = (address: Address) => form.setFieldsValue({ address })

  return (
    <Card bordered={false}>
      <Form form={form} autoComplete='off' layout='vertical' onSubmitCapture={submit}>
        <Form.Item
          label='Logo'
          name='logo'
          rules={[{ required: true, message: 'Logo is required' }]}
        >
          <ImageUploader onUpload={(file) => form.setFieldsValue({ logo: file })} />
        </Form.Item>
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='Email' name='email' rules={[{ type: 'email', message: 'Invalid email' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Phone' name='phone'>
          <Input />
        </Form.Item>
        <Form.Item name='address'>
          <AddressSelect onChange={handleAddressChange} />
        </Form.Item>
        <Button type='primary' htmlType='submit' loading={submitting}>
          Confirm
        </Button>
      </Form>
    </Card>
  )
}

export default NewProvider
