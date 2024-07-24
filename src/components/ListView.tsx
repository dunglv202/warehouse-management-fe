import { IconPlus, IconReload } from '@tabler/icons-react'
import { Button, Card, Flex, Input, Table, TableProps, Typography } from 'antd'

interface Props {
  listName: string
  dataSource: TableProps['dataSource']
  columns: TableProps['columns']
}

const ListView = ({ listName, dataSource, columns }: Props) => {
  return (
    <Card bordered={false} style={{ padding: 10 }}>
      <Flex wrap align='center' justify='space-between' style={{ marginBottom: 20 }}>
        <Typography.Title level={4} style={{ marginBlock: 0 }}>
          {listName}
        </Typography.Title>
        <Flex justify='end' align='center' gap={15}>
          <Input placeholder='Search' />
          <Button icon={<IconReload size={18} />}>Refresh</Button>
          <Button type='primary' icon={<IconPlus size={18} />}>
            Add New
          </Button>
        </Flex>
      </Flex>
      <Table dataSource={dataSource} columns={columns} />
    </Card>
  )
}

export default ListView
