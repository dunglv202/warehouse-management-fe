import { IconBellRinging, IconLogout, IconUser } from '@tabler/icons-react'
import { Avatar, Dropdown, Flex, Layout, MenuProps } from 'antd'
import { Link } from 'react-router-dom'

const { Header } = Layout

const profileMenu: MenuProps['items'] = [
  {
    key: 'profile',
    icon: <IconUser size={20} />,
    label: 'Profile',
  },
  {
    key: 'logout',
    icon: <IconLogout size={20} />,
    label: <Link to='/logout'>Logout</Link>,
  },
]

const MainHeader = () => {
  return (
    <Header>
      <Flex justify='end' align='center' gap={20} style={{ paddingInline: 30, paddingBlock: 20 }}>
        <IconBellRinging style={{ cursor: 'pointer' }} />
        <Dropdown
          menu={{ items: profileMenu, style: { minWidth: 150 } }}
          trigger={['click']}
          placement='bottomRight'
        >
          <Avatar size={42} style={{ backgroundColor: '#1640d6', cursor: 'pointer' }}>
            G
          </Avatar>
        </Dropdown>
      </Flex>
    </Header>
  )
}

export default MainHeader
