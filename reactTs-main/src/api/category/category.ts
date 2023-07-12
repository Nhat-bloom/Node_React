import instance from '../config'
import { IInputCategory } from '../../interface/category'
export const getAllCategory = () => {
   return instance.get('/categories')
}

export const getOneCategory = (id: string | undefined) => {
   return instance.get(`/categories/${id}`)
}

export const deleteCategory = (id: string | undefined) => {
   return instance.delete(`/categories/${id}`)
}

export const updateCategory = (id: string | undefined, data: IInputCategory) => {
   return instance.put(`/categories/${id}`, data)
}
export const addCategory = (data: IInputCategory) => {
   return instance.post(`/categories`, data)
}
