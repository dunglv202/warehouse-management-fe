import SearchSelect, { OptionsFetchingFn } from '@/components/SearchSelect/SearchSelect'
import useGuard from '@/hooks/useGuard'
import { type NewImport } from '@/models/import'
import { addImport } from '@/services/import-service'
import { getProducts } from '@/services/product-service'
import { getProviders } from '@/services/provider-service'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
} from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewImport = () => {
  useGuard()

  const navigate = useNavigate()
  const [form] = Form.useForm<NewImport>()
  const [submitting, setSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(true)

  const submit = async () => {
    setSubmitting(true)
    try {
      await form.validateFields()
      await addImport(form.getFieldsValue())
      navigate('/import')
    } finally {
      setSubmitting(false)
    }
  }

  const providerFetcher: OptionsFetchingFn = async (keyword: string) => {
    const providers = (await getProviders({ keyword })).content
    return providers.map((p) => ({ label: p.name, value: p.id }))
  }

  const productFetcher: OptionsFetchingFn = async (keyword: string) => {
    const products = (await getProducts({ keyword })).content
    return products.map((p) => ({ label: p.name, value: p.id }))
  }

  return (
    <Card bordered={false}>
      <Form form={form} autoComplete='off' layout='vertical' onSubmitCapture={submit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='Provider'
              name='providerId'
              rules={[{ required: true, message: 'Provider is required' }]}
            >
              <SearchSelect fetcher={providerFetcher} showSearch />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Status'
              name='status'
              rules={[{ required: true, message: 'Status is required' }]}
              initialValue='DRAFT'
            >
              <Select
                options={[
                  { label: 'Draft', value: 'DRAFT' },
                  { label: 'Pending', value: 'PENDING' },
                  { label: 'Completed', value: 'COMPLETED' },
                ]}
                onChange={(value) => setIsDraft(value === 'DRAFT')}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Payment'
              name='paymentStatus'
              rules={[{ required: true, message: 'Payment status is required' }]}
              initialValue='UNPAID'
            >
              <Select
                options={[
                  { label: 'Unpaid', value: 'UNPAID' },
                  { label: 'Paid', value: 'PAID' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Date'
              name='date'
              rules={[{ required: !isDraft, message: 'Date is required' }]}
            >
              <DatePicker placeholder='' style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item label='Note' name='note'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} style={{ paddingInline: 16 }}>
            <Divider dashed />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={5}>
            <Typography.Text>Product</Typography.Text>
          </Col>
          <Col span={6}>
            <Typography.Text>Notes</Typography.Text>
          </Col>
          <Col span={4}>
            <Typography.Text>Quantity</Typography.Text>
          </Col>
          <Col span={4}>
            <Typography.Text>Price</Typography.Text>
          </Col>
          <Col span={4}>
            <Typography.Text>Total</Typography.Text>
          </Col>
        </Row>
        <Form.List name='items'>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
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
                      <InputNumber min={1} step='any' style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name={[field.name, 'price']}
                      rules={[{ required: true, message: 'Price is required' }]}
                    >
                      <InputNumber min={0} step='any' style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item>
                      <Input />
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
              ))}
              <Form.Item>
                <Button onClick={() => add()} type='dashed' block icon={<IconPlus size={18} />}>
                  Add item
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Space>
          <Button onClick={() => navigate('/import')}>Cancel</Button>
          <Button type='primary' htmlType='submit' loading={submitting}>
            Confirm
          </Button>
        </Space>
      </Form>
    </Card>
  )
}

export default NewImport
