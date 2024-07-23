import logo from '@/assets/vite.svg'
import {
  IconBuildingWarehouse,
  IconClipboardData,
  IconGraph,
  IconPackageImport,
  IconSettings,
  IconTag,
  IconTruckDelivery,
} from '@tabler/icons-react'
import { Flex, Image, Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Link } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: 'dashboard',
    icon: <IconGraph size={21} />,
    label: <Link to='/dashboard'>Dashboard</Link>,
  },
  {
    key: 'inventory',
    icon: <IconBuildingWarehouse size={21} />,
    label: <Link to='/inventory'>Inventory</Link>,
  },
  {
    key: 'category',
    icon: <IconTag size={21} />,
    label: <Link to='/inventory'>Category</Link>,
  },
  {
    key: 'import',
    icon: <IconPackageImport size={21} />,
    label: <Link to='/inventory'>Import</Link>,
  },
  {
    key: 'export',
    icon: <IconTruckDelivery size={21} />,
    label: <Link to='/inventory'>Export</Link>,
  },
  {
    key: 'report',
    icon: <IconClipboardData size={21} />,
    label: <Link to='/inventory'>Report</Link>,
  },
  {
    key: 'setting',
    icon: <IconSettings size={21} />,
    label: <Link to='/setting'>Setting</Link>,
  },
]

const MainMenu = () => {
  return (
    <Sider width={300} style={{ paddingLeft: 20, paddingBlock: 40 }}>
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
