import { useEffect, useState } from 'react'
import { ICategory } from '../../interface/category'
import { deleteCategory, getAllCategory } from '../../api/category/category'
import { columnsCategory } from '../../configAntd/columnsTable'
import Loading from '../../components/Loading/Loading'
import { Table } from 'antd'

const CategoryPage = () => {
   const [categories, setCategories] = useState<ICategory[]>([] as ICategory[])
   const [isLoading, setIsLoading] = useState<boolean>(false)
   useEffect(() => {
      ;(async () => {
         try {
            setIsLoading(true)
            const { data } = await getAllCategory()
            const formatedCategories = data.categories.map((category: ICategory) => {
               return {
                  ...category,
                  key: category._id,
                  quantity: category.products.length
               }
            })
            setCategories(formatedCategories)
            setIsLoading(false)
         } catch (error) {
            console.log(error)
         }
      })()
   }, [])
   const removeItem = async (id: string): Promise<void> => {
      try {
         await deleteCategory(id)
         const newCategories = categories.filter((category) => category._id !== id)
         setCategories(newCategories)
      } catch (error) {
         console.log(error)
      }
   }
   const columns = columnsCategory({ onDelete: removeItem })
   if (isLoading) return <Loading />
   return (
      <div>
         <Table dataSource={categories} columns={columns} loading={isLoading}></Table>
      </div>
   )
}

export default CategoryPage
