import { Button, ConfigProvider, Form, Input, Select, message } from 'antd'
import useMyToken from '../../hooks/useMyToken'
import { useEffect, useState } from 'react'
import { ICategory } from '../../interface/category'
import { getAllCategory } from '../../api/category/category'
import { getOneProduct, updateProduct } from '../../api/product/product'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { IInputProduct } from '../../interface/product'

const onFinishFailed = (errorInfo: any) => {
   console.log('Failed:', errorInfo)
}
const UpdateProduct = () => {
   const { colorPrimary } = useMyToken()
   const [isLoading, setIsLoading] = useState(false)
   const [categories, setCategories] = useState<ICategory[]>([])
   const navigate = useNavigate()
   const { id } = useParams()
   const [form] = Form.useForm()
   const layout = {
      labelCol: {
         span: 5
      },
      wrapperCol: {
         span: 16
      }
   }
   const { Option } = Select
   const onFinish = async (values: IInputProduct) => {
      try {
         setIsLoading(true)
         await updateProduct(id, values)
         setIsLoading(false)
         message.success('Update product successfully!')
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
   useEffect(() => {
      ;(async () => {
         const {
            data: { product }
         } = await getOneProduct(id)
         const cateIds = product?.categories.map((category: ICategory) => category._id)
         form.setFieldsValue({ ...product, _id: undefined, categories: cateIds })
      })()
   }, [])
   if (isLoading) return <Loading />
   return (
      <div className='w-full flex justify-center flex-col items-center'>
         <h2 className='p-5 font-semibold text-lg'>Update product</h2>
         <Form
            form={form}
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
               normalize={(value) => value.trim()}
               className='w-full'
               name='name'
               rules={[{ required: true, message: 'Please input product name!' }]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               validateTrigger={'onBlur'}
               label={'Price'}
               hasFeedback
               normalize={(value) => value.trim()}
               className='w-full'
               name='price'
               rules={[{ required: true, message: 'Please input product price!' }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               validateTrigger={'onBlur'}
               label={'Image'}
               normalize={(value) => value.trim()}
               hasFeedback
               className='w-full'
               name='image'
               rules={[{ required: true, message: 'Please input product image!' }]}
            >
               <Input />
            </Form.Item>
            <div className='w-full flex justify-start pl-28 mb-2'>
               {' '}
               <img src={form.getFieldValue('image')} alt='img' className='w-[100px] h-[100px] rounded-lg' />
            </div>
            <Form.Item
               validateTrigger={'onBlur'}
               label={'Description'}
               normalize={(value) => value.trim()}
               hasFeedback
               className='w-full'
               name='description'
               rules={[{ required: true, message: 'Please input product description!' }]}
            >
               <Input.TextArea />
            </Form.Item>
            <Form.Item
               validateTrigger={'onBlur'}
               label={'Categories'}
               hasFeedback
               className='w-full'
               name='categories'
               rules={[{ required: true, message: 'Please choose product categories!' }]}
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
                     Save
                  </Button>
               </ConfigProvider>
            </Form.Item>
         </Form>
      </div>
   )
}

export default UpdateProduct
