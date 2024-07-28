import NewButton from '@/components/Toolbar/NewButton'
import Search from '@/components/Toolbar/Search'
import Toolbar from '@/components/Toolbar/Toolbar'
import useGuard from '@/hooks/useGuard'
import { Pagination } from '@/models/common'
import { Product } from '@/models/product'
import { getProducts } from '@/services/product-service'
import { IconPencilMinus } from '@tabler/icons-react'
import { Card, Flex, Image, Space, Table, TableProps, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const columns: TableProps['columns'] = [
  {
    key: 'thumbnail',
    dataIndex: 'thumbnail',
    title: 'Preview',
    align: 'center',
    width: 120,
    render: (url: string) => <Image src={url} width={50} height={50} style={{ borderRadius: 8 }} />,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Name',
    width: 400,
  },
  {
    key: 'categories',
    dataIndex: 'categories',
    title: 'Categories',
    render: (categories: Product['categories']) => (
      <Space size='small' wrap>
        {categories.map((c) => (
          <Tag key={c.id} color='blue' style={{ margin: 0, border: 'none' }}>
            {c.name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    key: 'stockQuantity',
    dataIndex: 'stockQuantity',
    title: 'Quantity',
    align: 'right',
    render: (quantity: number) => quantity.toLocaleString(),
  },
  {
    key: 'action',
    dataIndex: 'id',
    title: 'Action',
    align: 'center',
    render: (id: number) => (
      <Link to={`/products/${id}`} target='_blank'>
        <IconPencilMinus size={18} />
      </Link>
    ),
  },
]

const Inventory = () => {
  useGuard()

  const [products, setProducts] = useState<Product[]>([])
  const [totalElements, setTotalElements] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState<Pagination>()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const result = await getProducts({ keyword }, pagination)
        setProducts(result.content)
        setTotalElements(result.totalElements)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [keyword, pagination])

  return (
    <>
      <Flex wrap align='center' justify='space-between' style={{ marginBottom: 20 }}>
        <Typography.Title level={4} style={{ marginBlock: 0 }}>
          Product List
        </Typography.Title>
        <Toolbar>
          <Search onSearch={setKeyword} />
          <NewButton href='/inventory/new' />
        </Toolbar>
      </Flex>
      <Card bordered={false} style={{ padding: 10 }}>
        <Table
          loading={loading}
          dataSource={products.map((p) => ({ ...p, key: p.id }))}
          columns={columns}
          pagination={{ pageSize: 20, total: totalElements }}
          onChange={({ current }) => setPagination({ page: current ? current - 1 : undefined })}
        />
      </Card>
    </>
  )
}

export default Inventory
