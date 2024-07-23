import { IconBellRinging, IconLogout, IconUser } from '@tabler/icons-react'
import { Avatar, Dropdown, Flex, Layout, MenuProps } from 'antd'
import { Link } from 'react-router-dom'

const { Header } = Layout

const profileMenu: MenuProps['items'] = [
  {
    key: 'profile',
    icon: <IconUser size={18} />,
    label: 'Profile',
  },
  {
    key: 'logout',
    icon: <IconLogout size={18} />,
    label: <Link to='/logout'>Logout</Link>,
  },
]

const MainHeader = () => {
  return (
    <Header style={{ height: 'auto' }}>
      <Flex justify='end' align='center' gap={20} style={{ paddingInline: 30, paddingBlock: 20 }}>
        <IconBellRinging className='hoverable' size={20} style={{ cursor: 'pointer' }} />
        <Dropdown
          menu={{ items: profileMenu, style: { minWidth: 150 } }}
          trigger={['click']}
          placement='bottomRight'
        >
          <Avatar size={40} style={{ backgroundColor: '#4e74ff', cursor: 'pointer' }}>
            G
          </Avatar>
        </Dropdown>
      </Flex>
    </Header>
  )
}

export default MainHeader
