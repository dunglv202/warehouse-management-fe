import InputPrice from '@/components/PriceInput/InputPrice'
import SearchSelect, { OptionsFetchingFn } from '@/components/SearchSelect/SearchSelect'
import useGuard from '@/hooks/useGuard'
import { type NewImport } from '@/models/import'
import { addImport } from '@/services/import-service'
import { getProviders } from '@/services/provider-service'
import { IconPlus } from '@tabler/icons-react'
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from 'antd'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ImportItem from './components/ImportItem'

const NewImport = () => {
  useGuard()

  const navigate = useNavigate()
  const [form] = Form.useForm<NewImport>()
  const [submitting, setSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(true)
  const [subtotal, setSubtotal] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)

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

  console.log('rendering')

  const calculateTotal = useCallback(() => {
    const items = form.getFieldsValue().items || []
    const subtotal = items
      .filter((i) => i?.price && i?.quantity)
      .reduce((acc, item) => {
        return acc + item.price * item.quantity
      }, 0)
    setSubtotal(subtotal)
    setGrandTotal(subtotal + form.getFieldValue('shippingCost') + form.getFieldValue('tax'))
  }, [form])

  const providerFetcher: OptionsFetchingFn = async (keyword: string) => {
    const providers = (await getProviders({ keyword })).content
    return providers.map((p) => ({ label: p.name, value: p.id }))
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
              rules={[{ required: true, message: 'Date is required' }]}
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
                <ImportItem
                  key={field.key}
                  field={field}
                  remove={remove}
                  onTotalSet={calculateTotal}
                />
              ))}
              <Form.Item>
                <Button onClick={() => add()} type='dashed' block icon={<IconPlus size={18} />}>
                  Add item
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Flex justify='space-between' align='flex-start'>
          <Space>
            <Button onClick={() => navigate('/import')}>Cancel</Button>
            <Button type='primary' htmlType='submit' loading={submitting}>
              {isDraft ? 'Save draft' : 'Confirm'}
            </Button>
          </Space>
          <Flex vertical align='flex-end'>
            <Form.Item label='Subtotal' layout='horizontal'>
              <InputPrice readOnly value={subtotal} />
            </Form.Item>
            <Form.Item label='Shipping' name='shippingCost' initialValue={0} layout='horizontal'>
              <InputPrice step='any' min={0} onChange={calculateTotal} controls={false} />
            </Form.Item>
            <Form.Item label='Tax' name='tax' initialValue={0} layout='horizontal'>
              <InputPrice step='any' min={0} onChange={calculateTotal} controls={false} />
            </Form.Item>
            <Form.Item label='Grand total' layout='horizontal'>
              <InputPrice readOnly value={grandTotal} />
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </Card>
  )
}

export default NewImport
