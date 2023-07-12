import instance from '../config'
import { IInputProduct } from '../../interface/product'

type IQuery = {
   limit?: number
   sort?: string
   order?: 'asc' | 'desc'
   page?: number
}
export const getAllProduct = ({ limit, sort, order, page }: IQuery) => {
   return instance.get(`/products`, {
      params: {
         _limit: limit,
         _sort: sort,
         _order: order,
         _page: page
      }
   })
}

export const getOneProduct = (id: string | undefined) => {
   return instance.get(`/products/${id}`)
}

export const deleteProduct = (id: string | undefined) => {
   return instance.delete(`/products/${id}`)
}

export const updateProduct = (id: string | undefined, data: IInputProduct) => {
   return instance.put(`/products/${id}`, data)
}

export const addProduct = (data: IInputProduct) => {
   return instance.post('/products', data)
}
