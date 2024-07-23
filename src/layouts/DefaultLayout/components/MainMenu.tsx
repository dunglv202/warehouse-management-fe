import logo from '@/assets/vite.svg'
import { IconBuildingWarehouse, IconDashboard, IconSettings } from '@tabler/icons-react'
import { Flex, Image, Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Link } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: 'dashboard',
    icon: <IconDashboard />,
    label: <Link to='/dashboard'>Dashboard</Link>,
  },
  {
    key: 'inventory',
    icon: <IconBuildingWarehouse />,
    label: <Link to='/inventory'>Inventory</Link>,
  },
  {
    key: 'settings',
    icon: <IconSettings />,
    label: <Link to='/settings'>Settings</Link>,
  },
]

const MainMenu = () => {
  return (
    <Sider width={300} style={{ paddingInline: 30, paddingBlock: 40 }}>
      <Flex justify='center'>
        <Image width={50} src={logo} preview={false} style={{ marginBottom: 20 }} />
      </Flex>
      <Menu
        defaultSelectedKeys={['dashboard']}
        mode='inline'
        items={items}
        style={{ backgroundColor: 'transparent', border: 'none' }}
      />
    </Sider>
  )
}

export default MainMenu
