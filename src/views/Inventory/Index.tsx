import NewButton from '@/components/Toolbar/NewButton'
import Search from '@/components/Toolbar/Search'
import Toolbar from '@/components/Toolbar/Toolbar'
import useGuard from '@/hooks/useGuard'
import { Product } from '@/models/product'
import { getProducts } from '@/services/product-service'
import { IconPencilMinus } from '@tabler/icons-react'
import { Card, Flex, Image, Table, TableProps, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const columns: TableProps['columns'] = [
  {
    key: 'thumbnail',
    dataIndex: 'thumbnail',
    title: 'Preview',
    align: 'center',
    width: 120,
    render: (url: string) => <Image src={url} width={60} height={60} style={{ borderRadius: 8 }} />,
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
    render: (categories: Product['categories']) =>
      categories.map((c) => (
        <Tag key={c.id} color='blue'>
          {c.name}
        </Tag>
      )),
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
        <IconPencilMinus size={20} />
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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const result = await getProducts({ keyword })
        setProducts(result.content)
        setTotalElements(result.totalElements)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [keyword])

  return (
    <>
      <Flex wrap align='center' justify='space-between' style={{ marginBottom: 20 }}>
        <Typography.Title level={4} style={{ marginBlock: 0 }}>
          Product List
        </Typography.Title>
        <Toolbar>
          <Search onSearch={setKeyword} />
          <NewButton />
        </Toolbar>
      </Flex>
      <Card bordered={false} style={{ padding: 10 }}>
        <Table
          loading={loading}
          dataSource={products}
          columns={columns}
          pagination={{ pageSize: 20, total: totalElements }}
        />
      </Card>
    </>
  )
}

export default Inventory
