import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'
import MainHeader from './components/MainHeader'
import MainMenu from './components/MainMenu'

const DefaultLayout = () => {
  return (
    <Layout style={{ height: '100vh', backgroundColor: '#f9fafc' }}>
      <MainMenu />
      <Layout style={{ backgroundColor: 'transparent' }}>
        <MainHeader />
        <Content style={{ padding: 50 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
