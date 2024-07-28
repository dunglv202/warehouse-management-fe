import NewButton from '@/components/Toolbar/NewButton'
import Search from '@/components/Toolbar/Search'
import Toolbar from '@/components/Toolbar/Toolbar'
import { type Customer } from '@/models/customer'
import { getCustomers } from '@/services/customer-service'
import { IconPencilMinus } from '@tabler/icons-react'
import { Card, Flex, Table, TableProps, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const columns: TableProps['columns'] = [
  {
    key: 'firstName',
    dataIndex: 'firstName',
    title: 'First Name',
  },
  {
    key: 'lastName',
    dataIndex: 'lastName',
    title: 'Last Name',
  },
  {
    key: 'email',
    dataIndex: 'email',
    title: 'Email',
  },
  {
    key: 'phone',
    dataIndex: 'phone',
    title: 'Phone',
  },
  {
    key: 'address',
    dataIndex: 'address',
    title: 'Address',
  },
  {
    key: 'action',
    dataIndex: 'id',
    title: 'Action',
    align: 'center',
    render: (id: number) => (
      <Link to={`/provider/${id}`} target='_blank'>
        <IconPencilMinus size={18} />
      </Link>
    ),
  },
]

const Customer = () => {
  const [keyword, setKeyword] = useState('')
  const [totalElements, setTotalElements] = useState(0)
  const [providers, setProviders] = useState<Customer[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true)
      try {
        const result = await getCustomers()
        setProviders(result.content)
        setTotalElements(result.totalElements)
      } finally {
        setLoading(false)
      }
    }
    fetchProviders()
  }, [keyword])

  return (
    <>
      <Flex wrap align='center' justify='space-between' style={{ marginBottom: 20 }}>
        <Typography.Title level={4} style={{ marginBlock: 0 }}>
          Customer List
        </Typography.Title>
        <Toolbar>
          <Search onSearch={setKeyword} />
          <NewButton href='/customer/new' />
        </Toolbar>
      </Flex>
      <Card bordered={false} style={{ padding: 10 }}>
        <Table
          loading={loading}
          dataSource={providers.map((p) => ({ ...p, key: p.id }))}
          columns={columns}
          pagination={{ pageSize: 20, total: totalElements }}
        />
      </Card>
    </>
  )
}

export default Customer
