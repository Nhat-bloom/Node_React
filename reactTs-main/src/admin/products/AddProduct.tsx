import { Button, ConfigProvider, Form, Input, Select, message } from 'antd'
import useMyToken from '../../hooks/useMyToken'
import { useEffect, useState } from 'react'
import { ICategory } from '../../interface/category'
import { getAllCategory } from '../../api/category/category'
import { addProduct } from '../../api/product/product'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import ButtonUpLoad from '../../components/ButtonUpLoad/ButtonUpLoad'

const onFinishFailed = (errorInfo: any) => {
   console.log('Failed:', errorInfo)
}

const AddProduct = () => {
   const { colorPrimary } = useMyToken()
   const [isLoading, setIsLoading] = useState(false)
   const [categories, setCategories] = useState<ICategory[]>([])
   const navigate = useNavigate()
   const layout = {
      labelCol: {
         span: 5
      },
      wrapperCol: {
         span: 16
      }
   }
   const { Option } = Select
   const onFinish = async (values: any) => {
      try {
         setIsLoading(true)
         await addProduct(values)
         setIsLoading(false)
         message.success("Add new product successfully!")
         navigate('/admin/products')
      } catch (error) {
         console.log(error)
      }
   }
   useEffect(() => {
      ;(async () => {
         try {
            const {
               data: { categories }
            } = await getAllCategory()
            setCategories(categories)
         } catch (error) {
            console.log(error)
         }
      })()
   }, [])
   if (isLoading) return <Loading />
   return (
      <div className='w-full flex justify-center flex-col items-center'>
         <h2 className='p-5 font-semibold text-lg'>Add product</h2>
         <Form
            name='add'
            {...layout}
            size='large'
            className='w-1/2 flex flex-col items-center justify-center'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            encType='multipart/form-data'
         >
            <Form.Item
               validateTrigger={'onBlur'}
               label={<label className='block'>Product Name</label>}
               hasFeedback
               className='w-full'
               name='name'
               rules={[{ required: true, message: 'Please input product name!' }]}
               normalize={(value) => value.trim()}
            >
               <Input />
            </Form.Item>

            <Form.Item
               validateTrigger={'onBlur'}
               label={'Price'}
               hasFeedback
               className='w-full'
               name='price'
               rules={[{ required: true, message: 'Please input product price!' }]}
               normalize={(value) => value.trim()}
            >
               <Input />
            </Form.Item>
            <Form.Item
               validateTrigger={'onBlur'}
               label={'Image'}
               hasFeedback
               className='w-full'
               name='image'
               rules={[{ required: true, message: 'Please input product image!' }]}
               normalize={(value) => value.trim()}
            >
               <Input />
            </Form.Item>
            <Form.Item
               validateTrigger={'onBlur'}
               label={'Description'}
               hasFeedback
               className='w-full'
               name='description'
               rules={[{ required: true, message: 'Please input product description!' }]}
               normalize={(value) => value.trim()}
            >
               <Input.TextArea />
            </Form.Item>
            <Form.Item
               validateTrigger={'onBlur'}
               label={'Categories'}
               hasFeedback
               className='w-full'
               name='categories'
               rules={[{ required: true, message: 'Please choose categories!' }]}
            >
               <Select
                  mode='multiple'
                  style={{ width: '100%' }}
                  placeholder='Choose categories'
                  optionLabelProp='label'
               >
                  {categories.map((category, index) => (
                     <Option key={index} value={category._id} label={category.name}>
                        {category.name}
                     </Option>
                  ))}
               </Select>
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

export default AddProduct
