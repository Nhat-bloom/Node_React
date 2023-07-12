import type { ColumnsType } from 'antd/es/table'
import { Space, Table, Tag, Button, Popconfirm } from 'antd'
import { Link } from 'react-router-dom'
import { IProduct } from '../interface/product'
import { ICategory } from '../interface/category'

type agrColumns = {
   onDelete(id: string): Promise<void>,
}

export const columnsProduct = ({ onDelete }: agrColumns): ColumnsType<IProduct> | undefined => {
   return [
      {
         title: 'Name',
         dataIndex: 'name',
         sorter: (a, b) => a.name.length - b.name.length,
         key: 'name'
      },
      {
         title: 'Price',
         dataIndex: 'price',
         sorter: {
            compare: (a, b) => a.price - b.price,
            multiple: 1
         },
         key: 'price'
      },
      {
         title: 'Categories',
         key: 'categories',
         dataIndex: 'categories',
         render: (_, { categories }) => (
            <>
               {categories.map((category, index) => {
                  return (
                     <Tag color={'cyan'} key={index}>
                        {category?.name}
                     </Tag>
                  )
               })}
            </>
         )
      },
      {
         title: 'Action',
         key: 'action',
         render: (record) => (
            <Space size='middle'>
               <Link to={`/admin/update-product/${record._id}`}>
                  <Button>Update</Button>
               </Link>
               <Popconfirm
                  onConfirm={() => onDelete(record.key)}
                  title='Delete Item'
                  description='Do you want to delete this item ?'
               >
                  <Button>Delete</Button>
               </Popconfirm>
            </Space>
         )
      }
   ]
}

export const columnsCategory = ({ onDelete }: agrColumns): ColumnsType<ICategory> | undefined => {
   return [
      {
         title: 'Name',
         dataIndex: 'name',
         sorter: true,
         key: 'name'
      },
      {
         title: 'Quantity',
         dataIndex: 'quantity',
         sorter: true,
         key: 'price'
      },
      {
         title: 'Action',
         key: 'action',
         render: (record) => (
            <Space size='middle'>
               <Link to={`/admin/update-category/${record._id}`}>
                  <Button>Update</Button>
               </Link>
               <Button onClick={() => onDelete(record.key)}>Delete</Button>
            </Space>
         )
      }
   ]
}
