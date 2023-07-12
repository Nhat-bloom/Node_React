import { useEffect, useState } from 'react'
import { DesktopOutlined, PieChartOutlined, HomeOutlined, CaretDownFilled } from '@ant-design/icons'
import { Button, ConfigProvider, Dropdown, MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import useMyToken from '../hooks/useMyToken'
import { useAppSelector, useAppDispatch } from '../hooks/redux/hooks'
import { authSlice, selectorUser } from '../features/auth/authSlice'
import { itemsNav } from '../configAntd/navItems'

const { Header, Content, Footer, Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
   return {
      key,
      icon,
      children,
      label
   } as MenuItem
}

const items: MenuItem[] = [
   getItem(<Link to='/'>Home</Link>, '0', <HomeOutlined />),
   getItem(<Link to='/admin'>Dashboard</Link>, '1', <HomeOutlined />),
   getItem('Products', '2', <PieChartOutlined />, [
      getItem(<Link to='/admin/add-product'>Add product</Link>, '3'),
      getItem(<Link to='/admin/products'>List products</Link>, '4')
   ]),
   getItem('Categories', '5', <DesktopOutlined />, [
      getItem(<Link to='/admin/add-category'>Add category</Link>, '6'),
      getItem(<Link to='/admin/categories'>List categories</Link>, '7')
   ])
]
type Props = {
   logout: () => void
}
const AdminLayout = ({ logout }: Props) => {
   const [collapsed, setCollapsed] = useState(false)
   const { colorBgContainer, colorText, colorPrimary, colorLinkActive } = useMyToken()
   const token = localStorage.getItem('token')
   const dispatch = useAppDispatch()
   const itemsOfNav = itemsNav({ logout })
   useEffect(() => {
      const userExist = localStorage.getItem('user')
      if (token) {
         dispatch(authSlice.actions.login(true))
         dispatch(authSlice.actions.setUser(JSON.parse(userExist!)))
      }
   }, [])
   return (
      <Layout style={{ minHeight: '100vh' }}>
         <Sider
            style={{ backgroundColor: colorBgContainer }}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
         >
            <div
               style={{
                  height: 32,
                  margin: 16
               }}
            />
            <ConfigProvider
               theme={{
                  token: {
                     colorBgContainer,
                     colorText,
                     colorLinkActive,
                     colorPrimary
                  }
               }}
            >
               <Menu defaultSelectedKeys={['1']} mode='inline' items={items} />
            </ConfigProvider>
         </Sider>
         <Layout className='site-layout'>
            <Header style={{ padding: 0, backgroundColor: '#fff' }}>
               <div className='flex w-full justify-end items-center px-10 h-full'>
                  <ConfigProvider
                     theme={{
                        token: {
                           colorPrimary
                        }
                     }}
                  >
                     <Dropdown trigger={['click']} menu={{ items: itemsOfNav }}>
                        <Button type='primary' className='bg-red-400 w-[10%] pb-2' icon={<CaretDownFilled />}>
                           <span className='font-semibold'>{useAppSelector(selectorUser).name}</span>
                        </Button>
                     </Dropdown>
                  </ConfigProvider>
               </div>
            </Header>
            <Content className='py-10 px-5'>
               <Outlet />
            </Content>
         </Layout>
      </Layout>
   )
}

export default AdminLayout
