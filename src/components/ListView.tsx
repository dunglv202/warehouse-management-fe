import { Card, Flex, Table, TableProps, Typography } from 'antd'
import NewButton from './Toolbar/NewButton'
import Toolbar from './Toolbar/Toolbar'

interface Props {
  listName: string
  dataSource: TableProps['dataSource']
  columns: TableProps['columns']
}

const ListView = ({ listName, dataSource, columns }: Props) => {
  return (
    <>
      <Flex wrap align='center' justify='space-between' style={{ marginBottom: 20 }}>
        <Typography.Title level={4} style={{ marginBlock: 0 }}>
          {listName}
        </Typography.Title>
        <Toolbar>
          <NewButton />
        </Toolbar>
      </Flex>
      <Card bordered={false} style={{ padding: 10 }}>
        <Table dataSource={dataSource} columns={columns} />
      </Card>
    </>
  )
}

export default ListView
