import { Flex, Spin, SpinProps } from 'antd'

const Loading = ({ size }: { size?: SpinProps['size'] }) => {
  return (
    <Flex align='center' justify='center' style={{ width: '100%', height: '100%' }}>
      <Spin size={size} />
    </Flex>
  )
}

export default Loading
