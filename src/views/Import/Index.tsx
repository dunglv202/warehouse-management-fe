import NewButton from '@/components/Toolbar/NewButton'
import Search from '@/components/Toolbar/Search'
import Toolbar from '@/components/Toolbar/Toolbar'
import useGuard from '@/hooks/useGuard'
import { type Import } from '@/models/import'
import { getImports } from '@/services/import-service'
import { IconEye } from '@tabler/icons-react'
import { Card, Flex, Table, TableProps, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const columns: TableProps['columns'] = [
  {
    key: 'date',
    dataIndex: 'date',
    title: 'Date',
  },
  {
    key: 'provider',
    dataIndex: 'provider',
    title: 'Provider',
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: 'Status',
  },
  {
    key: 'paymentStatus',
    dataIndex: 'paymentStatus',
    title: 'Payment Status',
  },
  {
    key: 'total',
    dataIndex: 'total',
    title: 'Total',
    render: (total: number) => total.toLocaleString(),
  },
  {
    key: 'action',
    dataIndex: 'id',
    title: 'Action',
    align: 'center',
    render: (id: number) => (
      <Link to={`/provider/${id}`} target='_blank'>
        <IconEye size={18} />
      </Link>
    ),
  },
]

const Import = () => {
  useGuard()

  const [keyword, setKeyword] = useState('')
  const [totalElements, setTotalElements] = useState(0)
  const [imports, setImports] = useState<Import[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true)
      try {
        const result = await getImports()
        setImports(result.content)
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
          Imports
        </Typography.Title>
        <Toolbar>
          <Search onSearch={setKeyword} />
          <NewButton href='/import/new' />
        </Toolbar>
      </Flex>
      <Card bordered={false} style={{ padding: 10 }}>
        <Table
          loading={loading}
          dataSource={imports.map((p) => ({ ...p, key: p.id }))}
          columns={columns}
          pagination={{ pageSize: 20, total: totalElements }}
        />
      </Card>
    </>
  )
}

export default Import
