import ListView from '@/components/ListView'
import { Product } from '@/models/product'
import { IconPencilMinus } from '@tabler/icons-react'
import { Image, TableProps } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const columns: TableProps['columns'] = [
  {
    key: 'thumbnail',
    dataIndex: 'thumbnail',
    title: 'Preview',
    render: (url: string) => <Image src={url} width={60} height={60} />,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Name',
  },
  {
    key: 'price',
    dataIndex: 'price',
    title: 'Price',
    render: (price: number) => price.toLocaleString(),
  },
  {
    key: 'action',
    dataIndex: 'id',
    title: 'Action',
    render: (id: number) => (
      <Link to={`/products/${id}`} target='_blank'>
        <IconPencilMinus size={20} />
      </Link>
    ),
  },
]

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: 'Product 1',
        thumbnail: 'https://via.placeholder.com/150',
        price: 1000,
      },
    ])
  }, [])

  return <ListView listName='Product List' dataSource={products} columns={columns} />
}

export default Inventory
