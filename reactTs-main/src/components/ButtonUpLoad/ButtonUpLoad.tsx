import { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface'
import { uploadImage } from '../../api/upload/uploadImage'

type Props = {}
const beforeUpload = (file: RcFile) => {
   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
   if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
   }
   const isLt2M = file.size / 1024 / 1024 < 2
   if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
   }
   return isJpgOrPng && isLt2M
}

const    ButtonUpLoad = (props: Props) => {
   const [loading, setLoading] = useState(false)
   const [imageUrl, setImageUrl] = useState<string>()
   const uploadButton = (
      <div>
         {loading ? <LoadingOutlined /> : <PlusOutlined />}
         <div style={{ marginTop: 8 }}>Upload</div>
      </div>
   )

   const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status === 'uploading') {
         setLoading(true)
         return
      }
      if (info.file.status === 'done') {
         // Get this url from response in real world.
         console.log(info)
      }
   }
   const uploadAction = async (options: RcCustomRequestOptions) => {
      const { onSuccess, onError, file } = options
      try {
         const res = await uploadImage(file)
         console.log(res)
      } catch (err) {
         console.log('Eroor: ', err)
      }
   }
   return (
      <div>
         <Upload
            name='image'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={uploadAction}
            onChange={handleChange}
         >
            {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
         </Upload>
      </div>
   )
}

export default ButtonUpLoad
