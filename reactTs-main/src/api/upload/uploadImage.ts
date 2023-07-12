import instance from '../config'
import type { RcFile } from 'antd/es/upload/interface'

export const uploadImage = async (file: string | RcFile | Blob | any) => {
   const formData = new FormData()
   formData.append('file', file)
   return instance.post('/upload', formData)
}
