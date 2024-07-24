import AuthContext from '@/context/AuthContext'
import { IconLock, IconUser } from '@tabler/icons-react'
import { Button, Checkbox, Divider, Flex, Form, Input, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const [form] = useForm<{
    username: string
    password: string
    remember: boolean
  }>()
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (authContext.user) {
      navigate('/dashboard')
    }
  }, [authContext.user, navigate])

  form.submit = async () => {
    try {
      setSubmitting(true)
      await authContext.login(form.getFieldsValue())
      navigate('/dashboard')
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
          <Input type='password' prefix={<IconLock size={20} />} />
        </Form.Item>
        <Form.Item>
          <Flex justify='space-between'>
            <Form.Item name='remember' valuePropName='checked' noStyle initialValue={true}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to='#'>
              <Typography.Text style={{ fontWeight: 'bold', color: 'inherit' }}>
                Forgot password
              </Typography.Text>
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
          <Typography.Text style={{ fontWeight: 'bold', color: 'inherit' }}>
            Register
          </Typography.Text>
        </Link>
      </Typography.Text>
    </Flex>
  )
}

export default Login
