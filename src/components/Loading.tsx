import { Flex, Spin, SpinProps } from 'antd'
import { CSSProperties } from 'react'

interface LoadingProps {
  loading?: boolean
  size?: SpinProps['size']
  fullscreen?: boolean
  children?: React.ReactNode
}

const Loading = ({ loading = true, size, fullscreen, children }: LoadingProps) => {
  const style: CSSProperties = fullscreen
    ? { width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }
    : {}

  return loading ? (
    <Flex align='center' justify='center' style={style}>
      <Spin size={size} />
    </Flex>
  ) : (
    children
  )
}

export default Loading
