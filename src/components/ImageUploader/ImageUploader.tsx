import { IconUpload } from '@tabler/icons-react'
import { GetProp, Image, Upload, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useState } from 'react'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

interface ImageUploaderProps {
  onUpload: (file: File) => void
}

const ImageUploader = ({ onUpload }: ImageUploaderProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewImage, setPreviewImage] = useState('')

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    if (newFileList.length) {
      onUpload(newFileList[0].originFileObj as File)
    }
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
    <div>
      <ImgCrop rotationSlider>
        <Upload
          customRequest={async ({ onSuccess }) => {
            onSuccess?.('')
          }}
          fileList={fileList}
          listType='picture-card'
          onChange={onChange}
          onPreview={onPreview}
          maxCount={1}
        >
          <IconUpload size={18} />
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
    </div>
  )
}

export default ImageUploader
