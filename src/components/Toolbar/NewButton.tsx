import { IconPlus } from '@tabler/icons-react'
import { Button } from 'antd'

interface NewButtonProps {
  onClick?: () => void
  href?: string
}

const NewButton = ({ href, onClick }: NewButtonProps) => {
  return (
    <Button type='primary' href={href} onClick={onClick} icon={<IconPlus size={18} />}>
      New
    </Button>
  )
}

export default NewButton
