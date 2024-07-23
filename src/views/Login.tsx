import { IconLock, IconUser } from '@tabler/icons-react'
import { Button, Checkbox, Divider, Flex, Form, Input, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [form] = useForm<{
    username: string
    password: string
    remember: boolean
  }>()
  const [submitting, setSubmitting] = useState(false)

  form.submit = async () => {
    try {
      setSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Flex vertical justify='center' style={{ maxWidth: 400, margin: '0 auto' }}>
      <Typography.Title level={2} style={{ marginTop: 0 }}>
        Login
      </Typography.Title>
      <Divider />
      <Form form={form} name='validateOnly' layout='vertical' autoComplete='off'>
        <Form.Item name='username' label='Username' rules={[{ required: true }]}>
          <Input prefix={<IconUser size={20} />} />
        </Form.Item>
        <Form.Item name='password' label='Password' rules={[{ required: true }]}>
          <Input prefix={<IconLock size={20} />} />
        </Form.Item>
        <Form.Item>
          <Flex justify='space-between'>
            <Form.Item name='remember' valuePropName='checked' noStyle initialValue={true}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to='#'>
              <Typography.Link style={{ fontWeight: 'bold' }}>Forgot password</Typography.Link>
            </Link>
          </Flex>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }} loading={submitting}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <Typography.Text>
        Don't have an account?{' '}
        <Link to='/register'>
          <Typography.Link style={{ fontWeight: 'bold' }}>Register</Typography.Link>
        </Link>
      </Typography.Text>
    </Flex>
  )
}

export default Login
