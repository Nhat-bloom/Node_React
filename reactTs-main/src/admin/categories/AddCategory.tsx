import { useState, useEffect } from 'react'
import { Button, ConfigProvider, Form, Input, Select, message } from 'antd'
import useMyToken from '../../hooks/useMyToken'
import { useNavigate } from 'react-router-dom'
import { addCategory } from '../../api/category/category'

const onFinishFailed = (errorInfo: any) => {
   console.log('Failed:', errorInfo)
}
const AddCategory = () => {
   const { colorPrimary } = useMyToken()
   const [isLoading, setIsLoading] = useState(false)
   const navigate = useNavigate()
   const layout = {
      labelCol: {
         span: 5
      },
      wrapperCol: {
         span: 16
      }
   }
   const onFinish = async (values: any) => {
      try {
         setIsLoading(true)
         await addCategory(values)
         setIsLoading(false)
         message.success('Add category successfully!')
         navigate('/admin/categories')
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <div className='w-full flex justify-center flex-col items-center'>
         <h2 className='p-5 font-semibold text-lg'>Add category</h2>
         <Form
            name='add'
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

export default AddCategory
