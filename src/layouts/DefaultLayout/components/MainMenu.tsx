import logo from '@/assets/vite.svg'
import {
  IconBuildings,
  IconBuildingWarehouse,
  IconClipboardData,
  IconGraph,
  IconHeadphones,
  IconPackageImport,
  IconSettings,
  IconTag,
  IconTruckDelivery,
} from '@tabler/icons-react'
import { Flex, Image, Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface MenuItem {
  path: string
  label: string
  icon: ReactNode
}

const menuItems: MenuItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: <IconGraph size={21} />,
  },
  {
    path: '/inventory',
    label: 'Inventory',
    icon: <IconBuildingWarehouse size={21} />,
  },
  {
    path: '/category',
    label: 'Category',
    icon: <IconTag size={21} />,
  },
  {
    path: '/provider',
    label: 'Provider',
    icon: <IconBuildings size={21} />,
  },
  {
    path: '/customer',
    label: 'Customer',
    icon: <IconHeadphones size={21} />,
  },
  {
    path: '/import',
    label: 'Import',
    icon: <IconPackageImport size={21} />,
  },
  {
    path: '/export',
    label: 'Export',
    icon: <IconTruckDelivery size={21} />,
  },
  {
    path: '/report',
    label: 'Report',
    icon: <IconClipboardData size={21} />,
  },
  {
    path: '/setting',
    label: 'Setting',
    icon: <IconSettings size={21} />,
  },
]

const makeMenuItem = (item: MenuItem): Required<MenuProps>['items'][number] => {
  return {
    key: item.path,
    icon: item.icon,
    label: <Link to={item.path}>{item.label}</Link>,
  }
}

const MainMenu = () => {
  const location = useLocation()
  const activeMenu = menuItems.map((item) => item.path).find((key) => location.pathname === key)

  return (
    <Sider width={300} style={{ paddingLeft: 20, paddingBlock: 40 }}>
      <Flex justify='center'>
        <Image width={50} src={logo} preview={false} style={{ marginBottom: 20 }} />
      </Flex>
      <Menu
        defaultSelectedKeys={activeMenu ? [activeMenu] : ['/dashboard']}
        mode='inline'
        items={menuItems.map(makeMenuItem)}
        style={{ backgroundColor: 'transparent', border: 'none' }}
      />
    </Sider>
  )
}

export default MainMenu
