import { useState, useEffect } from 'react'
import { Card, message } from 'antd'

import { authSlice, selectorUser } from '../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../hooks/redux/hooks'
import { IProduct } from '../interface/product'
import { getAllProduct } from '../api/product/product'
import Loading from '../components/Loading/Loading'
const HomePage = () => {
   const [products, setProducts] = useState<IProduct[]>([])
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const dispatch = useAppDispatch()
   const [messageApi, contextHolder] = message.useMessage()
   const nameUser = useAppSelector(selectorUser)
   useEffect(() => {
      if (nameUser.name) messageApi.success(`Welcome ${nameUser.name}`)
      const token = localStorage.getItem('token')
      const userExist = localStorage.getItem('user')
      if (token) {
         dispatch(authSlice.actions.login(true))
         dispatch(authSlice.actions.setUser(JSON.parse(userExist!)))
      }
      setIsLoading(true)
      ;(async () => {
         try {
            const {
               data: {
                  products: { docs }
               }
            } = await getAllProduct({})
            setIsLoading(false)
            setProducts(docs)
         } catch (error) {
            console.log(error)
         }
      })()
   }, [])
   if (isLoading) return <Loading />
   return (
      <div className='flex justify-center flex-col items-center'>
         {contextHolder}
         <p style={{ fontSize: '5rem', color: '#71b1ff', textAlign: 'center' }}>Welcome to home</p>
         <div className='w-[90%] flex justify-start gap-5 mt-5 flex-wrap'>
            {products.map((product, index) => (
               <Card
                  key={index}
                  size='small'
                  title={product.name}
                  extra={<a href={`/products/${product._id}`}>Detail</a>}
                  style={{ width: 240 }}
                  cover={<img alt='example' src={product.image} />}
               >
                  <p>{product.price}$</p>
               </Card>
            ))}
         </div>
      </div>
   )
}

export default HomePage
