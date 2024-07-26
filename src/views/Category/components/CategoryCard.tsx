import { Category } from '@/models/category'
import { IconTag } from '@tabler/icons-react'
import { Card, Flex, Image, Typography } from 'antd'

interface CategoryCardProps {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card bordered={false}>
      <Flex vertical align='center' gap={15}>
        <Flex
          justify='center'
          align='center'
          style={{
            width: 80,
            height: 80,
            overflow: 'hidden',
            borderRadius: 8,
          }}
        >
          {category.thumbnail ? <Image src={category.thumbnail} preview={false} /> : <IconTag />}
        </Flex>
        <Typography.Text strong>{category.name}</Typography.Text>
      </Flex>
    </Card>
  )
}

export default CategoryCard
