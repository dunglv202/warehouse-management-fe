import { IconPlus } from '@tabler/icons-react'
import { Button } from 'antd'

const NewButton = () => {
  return (
    <Button type='primary' icon={<IconPlus size={18} />}>
      New
    </Button>
  )
}

export default NewButton
