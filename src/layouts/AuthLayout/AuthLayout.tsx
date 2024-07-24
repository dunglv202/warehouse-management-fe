import logo from '@/assets/vite.svg'
import { IconCheck } from '@tabler/icons-react'
import { Col, Flex, Image, Row, Space, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <Row
      style={{
        minHeight: '100vh',
      }}
    >
      <Col
        lg={{ span: 12 }}
        md={{ span: 24 }}
        style={{
          backgroundColor: '#f9fafc',
          paddingBottom: '15%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Sider width='100%' className='side-content'>
          <Flex vertical align='center' className='side-content'>
            <Image width={80} src={logo} preview={false} style={{ marginBottom: 50 }} />
            <Space direction='vertical' size={30}>
              <Typography.Title level={2}>Manage Your Store With</Typography.Title>
              <ul>
                <Space direction='vertical' size={20}>
                  <li>
                    <Space size='middle'>
                      <IconCheck />
                      <Typography.Text strong>All In One Tool</Typography.Text>
                    </Space>
                  </li>
                  <li>
                    <Space size='middle'>
                      <IconCheck />
                      <Typography.Text strong>Easily Add And Manage Your Services</Typography.Text>
                    </Space>
                  </li>
                </Space>
              </ul>
            </Space>
          </Flex>
        </Sider>
      </Col>
      <Col
        lg={{ span: 12 }}
        md={{ span: 24 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingBottom: '10%',
        }}
      >
        <Content>
          <Outlet />
        </Content>
      </Col>
    </Row>
  )
}

export default AuthLayout
