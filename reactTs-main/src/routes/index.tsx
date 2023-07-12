import AddProduct from '../admin/products/AddProduct'
import Dashboard from '../admin/Dashboard'
import UpdateProduct from '../admin/products/UpdateProduct'
import AuthenForm from '../features/auth/AuthenForm'
import HomePage from '../client/HomePage'
import Product from '../client/Product'
import ProductsPage from '../admin/products/ProductPage'
import UpdateCategory from '../admin/categories/UpdateCategory'
import CategoryPage from '../admin/categories/CategoryPage'
import AddCategory from '../admin/categories/AddCategory'
import Test from '../admin/test'

interface IRoute {
   path: string
   element: (props?: any) => JSX.Element
}
export const clientRoutes: IRoute[] = [
   // {
   //    path: '/',
   //    element: HomePage
   // },
   {
      path: '/signup',
      element: AuthenForm
   },
   {
      path: '/login',
      element: AuthenForm
   },
   {
      path: '/products/:id',
      element: Product
   }
]

export const adminRoutes: IRoute[] = [
   {
      path: '/admin',
      element: Dashboard
   },
   {
      path: '/admin/products',
      element: ProductsPage
   },
   {
      path: '/admin/add-product',
      element: AddProduct
   },
   {
      path: '/admin/update-product/:id',
      element: UpdateProduct
   },
   {
      path: '/admin/update-category/:id',
      element: UpdateCategory
   },
   {
      path: '/admin/categories',
      element: CategoryPage
   },
   {
      path: '/admin/add-category',
      element: AddCategory
   },
   {
      path: '/admin/test',
      element: Test
   }
]
