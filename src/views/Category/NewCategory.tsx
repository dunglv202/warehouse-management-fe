import ImageUploader from '@/components/ImageUploader/ImageUploader'
import useGuard from '@/hooks/useGuard'
import { type NewCategory } from '@/models/category'
import { createCategory } from '@/services/category-service'
import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react'

interface NewCategoryProps {
  close: () => void
  onSaveDone: () => void
}

const NewCategory = ({ close, onSaveDone }: NewCategoryProps) => {
  useGuard()

  const [form] = Form.useForm<NewCategory>()
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    setSubmitting(true)
    try {
      await form.validateFields()
      await createCategory(form.getFieldsValue())
      close()
      onSaveDone()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open
      onCancel={close}
      title='New Category'
      footer={[
        <Button key='save' type='primary' loading={submitting} onClick={submit}>
          Confirm
        </Button>,
      ]}
    >
      <Form form={form} layout='vertical' autoComplete='off' onSubmitCapture={submit}>
        <Form.Item label='Thumbnail' name='thumbnail'>
          <ImageUploader onUpload={(file) => form.setFieldsValue({ thumbnail: file })} />
        </Form.Item>
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='Description' name='description' style={{ flexGrow: 1 }}>
          <Input.TextArea maxLength={100} style={{ height: 102, resize: 'none' }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default NewCategory
