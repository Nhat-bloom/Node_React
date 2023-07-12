import React, { useState, useEffect } from 'react'
import { Button, ConfigProvider, Form, Input, Select, message } from 'antd'
import { getOneCategory, updateCategory } from '../../api/category/category'
import { useNavigate, useParams } from 'react-router-dom'
import { ICategory, IInputCategory } from '../../interface/category'
import useMyToken from '../../hooks/useMyToken'
import { IconType } from 'antd/es/notification/interface'
import Loading from '../../components/Loading/Loading'

const onFinishFailed = (errorInfo: any) => {
   console.log('Failed:', errorInfo)
}
const UpdateCategory = () => {
   const { colorPrimary } = useMyToken()
   const [isLoading, setIsLoading] = useState(false)
   const navigate = useNavigate()
   const [form] = Form.useForm()
   const { id } = useParams()
   const layout = {
      labelCol: {
         span: 5
      },
      wrapperCol: {
         span: 16
      }
   }
   useEffect(() => {
      ;(async () => {
         try {
            const {
               data: { category }
            } = await getOneCategory(id)
            form.setFieldValue('name', category.name)
         } catch (error) {
            console.log(error)
         }
      })()
   }, [])
   const onFinish = async (values: IInputCategory) => {
      try {
         setIsLoading(true)
         await updateCategory(id, values)
         setIsLoading(false)
         message.success('Update category successfully!')
         navigate('/admin/categories')
      } catch (error) {
         console.log(error)
      }
   }
   if (isLoading) return <Loading />
   return (
      <div className='w-full flex justify-center flex-col items-center'>
         <h2 className='p-5 font-semibold text-lg'>Update category</h2>
         <Form
            form={form}
            name='update'
            {...layout}
            size='large'
            className='w-1/2 flex flex-col items-center justify-center'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
         >
            <Form.Item
               validateTrigger={'onBlur'}
               label={<label className='block'>Product Name</label>}
               hasFeedback
               className='w-full'
               name='name'
               rules={[{ required: true, message: 'Please input category name!' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item className='w-full' wrapperCol={{ offset: 8, span: 16 }}>
               <ConfigProvider
                  theme={{
                     token: {
                        colorPrimary
                     }
                  }}
               >
                  <Button type='primary' htmlType='submit' className='bg-red-400 w-1/2'>
                     Submit
                  </Button>
               </ConfigProvider>
            </Form.Item>
         </Form>
      </div>
   )
}

export default UpdateCategory
