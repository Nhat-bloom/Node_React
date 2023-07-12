import { useEffect, useState } from 'react'
import { IProduct } from '../interface/product'
import { useParams } from 'react-router-dom'
import { getOneProduct } from '../api/product/product'
import { Card, message } from 'antd'
import { getOneCategory } from '../api/category/category'
const Product = () => {
   const { id: idProduct } = useParams()
   const [product, setProduct] = useState({} as IProduct)
   const [relateProduct, setRelateProduct] = useState<IProduct[]>([])
   useEffect(() => {
      getOneProduct(idProduct)
         .then(({ data }) => setProduct(data.product))
         .catch((err) => console.log(err))
   }, [idProduct])
   useEffect(() => {
      if (product.categories) {
         const indexRandom =
            product.categories.length >= 2 ? Math.floor(Math.random() * product?.categories.length) + 1 : 1
         console.log(indexRandom);
            ;(async () => {
            try {
               const { data } = await getOneCategory(String(product.categories[indexRandom - 1]._id))
               setRelateProduct(data.category?.products)
            } catch (error) {
               message.error('Something wrong!')
               console.log(error)
            }
         })()
      }
   }, [product])
   return (
      <div className='mt-20'>
         <div className='flex gap-5 justify-around'>
            <img src={product.image} alt='img' className='rounded-lg w-[300px]' />
            <div className='w-1/2'>
               <h2 className='text-[2rem] font-semibold'>{product?.name}</h2>
               <p>
                  Price: <span className='text-primary font-semibold'>{product?.price}$</span>
               </p>
            </div>
         </div>
         <div className='px-20 mt-10'>
            <h2 className='text-[1.5rem] font-semibold'>Detail Product</h2>
            <p>{product.description}</p>
         </div>
         <div>
            <h2 className='text-[1.5rem] font-semibold'>Relate Products</h2>
            <div className='flex justify-center gap-5 flex-wrap'>
               {relateProduct.map((productRelate, index) => (
                  <Card
                     key={index}
                     size='small'
                     title={productRelate.name}
                     extra={<a href={`/products/${productRelate._id}`}>Detail</a>}
                     style={{ width: 240 }}
                     cover={<img alt='example' src={productRelate.image} />}
                  >
                     <p>{productRelate.price}$</p>
                  </Card>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Product
