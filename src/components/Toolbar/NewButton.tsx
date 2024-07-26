import { IconPlus } from '@tabler/icons-react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

interface NewButtonProps {
  onClick?: () => void
  href?: string
}

const NewButton = ({ href, onClick }: NewButtonProps) => {
  const navigate = useNavigate()
  if (href) onClick = () => navigate(href)

  return (
    <Button type='primary' onClick={onClick} icon={<IconPlus size={18} />}>
      New
    </Button>
  )
}

export default NewButton
