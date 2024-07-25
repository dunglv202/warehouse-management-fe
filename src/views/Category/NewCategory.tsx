import { createCategory } from '@/services/category-service'
import { IconUpload } from '@tabler/icons-react'
import { Button, Form, GetProp, Image, Input, Modal, Upload, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useState } from 'react'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

interface NewCategoryProps {
  close: () => void
  onSaveDone: () => void
}

const NewCategory = ({ close, onSaveDone }: NewCategoryProps) => {
  const [form] = Form.useForm<{
    name: string
    description: string
  }>()
  const [submitting, setSubmitting] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewImage, setPreviewImage] = useState('')

  const submit = async () => {
    setSubmitting(true)
    try {
      await form.validateFields()
      await createCategory({
        ...form.getFieldsValue(),
        thumbnail: fileList?.[0].originFileObj,
      })
      close()
      onSaveDone()
    } finally {
      setSubmitting(false)
    }
  }

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as FileType)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    setPreviewImage(src)
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
      <Form form={form} layout='vertical' autoComplete='off'>
        <Form.Item label='Thumbnail'>
          <ImgCrop rotationSlider>
            <Upload
              customRequest={async ({ onSuccess }) => {
                onSuccess?.('')
              }}
              listType='picture-card'
              onChange={onChange}
              onPreview={onPreview}
            >
              {!fileList.length && <IconUpload size={18} />}
            </Upload>
          </ImgCrop>
          {previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                visible: !!previewImage,
                onVisibleChange: (visible) => setPreviewImage(visible ? previewImage : ''),
                afterOpenChange: (visible) => !visible && setPreviewImage(''),
              }}
              src={previewImage}
            />
          )}
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
