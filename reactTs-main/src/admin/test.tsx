import React, { useState } from 'react'
import { uploadImage } from '../api/upload/uploadImage'

type Props = {}

const Test = (props: Props) => {
   const [file, setFile] = useState<any>()
   const handleSubmit = async (e: any) => {
      e.preventDefault()
      try {
         const formData = new FormData()
         formData.append('image', file)
         const res = await uploadImage(formData)
         console.log(res)
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <div>
         <form encType='multipart/form-data' onSubmit={handleSubmit}>
            <input type='file' multiple name='image' onChange={(e) => setFile(e.target.files)} />
            <button>Submit</button>
         </form>
      </div>
   )
}

export default Test
