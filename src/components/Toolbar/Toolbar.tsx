import { Flex } from 'antd'
import { CSSProperties } from 'react'

interface ToolbarProps {
  style?: CSSProperties
  children: React.ReactNode
}

const Toolbar = ({ style, children }: ToolbarProps) => {
  return (
    <Flex justify='end' align='center' gap={15} style={style}>
      {children}
    </Flex>
  )
}

export default Toolbar
