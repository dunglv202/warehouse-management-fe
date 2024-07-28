import AddressSelect from '@/components/AddressSelect/AddressSelect'
import useGuard from '@/hooks/useGuard'
import { Address } from '@/models/common'
import { type NewCustomer } from '@/models/customer'
import { addCustomer } from '@/services/customer-service'
import { Button, Card, Col, Form, Input, Row } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewCustomer = () => {
  useGuard()

  const navigate = useNavigate()
  const [form] = Form.useForm<NewCustomer>()
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    setSubmitting(true)
    try {
      await form.validateFields()
      await addCustomer(form.getFieldsValue())
      navigate('/customer')
    } finally {
      setSubmitting(false)
    }
  }

  const handleAddressChange = (address: Address) => form.setFieldsValue({ address })

  return (
    <Card bordered={false}>
      <Form form={form} autoComplete='off' layout='vertical' onSubmitCapture={submit}>
        <Row gutter={20}>
          <Col span={24} md={12}>
            <Form.Item
              label='First Name'
              name='firstName'
              rules={[{ required: true, message: 'Name is required' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item label='Last Name' name='lastName'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label='Email' name='email' rules={[{ type: 'email', message: 'Invalid email' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Phone' name='phone'>
          <Input />
        </Form.Item>
        <Form.Item label='Id card no' name='idCardNo'>
          <Input />
        </Form.Item>
        <Form.Item name='address' rules={[{ required: true, message: 'Address is required' }]}>
          <AddressSelect onChange={handleAddressChange} required />
        </Form.Item>
        <Form.Item label='Notes' name='Notes'>
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} maxLength={100} />
        </Form.Item>
        <Button type='primary' htmlType='submit' loading={submitting}>
          Confirm
        </Button>
      </Form>
    </Card>
  )
}

export default NewCustomer
