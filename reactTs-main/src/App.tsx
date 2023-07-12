import { useEffect } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router'

import { authSlice } from './features/auth/authSlice'
import { useAppDispatch } from './hooks/redux/hooks'
import { adminRoutes, clientRoutes } from './routes'
import DefaultLayout from './layouts/DefaultLayout'
import { FormContextProvider } from './context/statusForm'
import AdminLayout from './layouts/AdminLayout'
import HomePage from './client/HomePage'
function App() {
   const dispatch = useAppDispatch()
   const handleLogout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      dispatch(authSlice.actions.logout(false))
      window.location.assign('/')
   }
   useEffect(() => {
      const token = localStorage.getItem('token')
      const userExist = localStorage.getItem('user')
      if (token) {
         dispatch(authSlice.actions.login(true))
         dispatch(authSlice.actions.setUser(JSON.parse(userExist!)))
      }
   }, [])
   return (
      <div className='App'>
         <BrowserRouter>
            <Routes>
               <Route
                  path='/'
                  element={
                     <FormContextProvider>
                        <DefaultLayout logout={handleLogout} />
                     </FormContextProvider>
                  }
               >
                  <Route index element={<HomePage />}></Route>
                  {clientRoutes.map((route, index) => {
                     const Page = route.element
                     return <Route key={index} path={route.path} element={<Page />}></Route>
                  })}
               </Route>
               <Route path='/admin' element={<AdminLayout logout={handleLogout} />}>
                  {adminRoutes.map((route, index) => {
                     const Page = route.element
                     return <Route key={index} path={route.path} element={<Page />}></Route>
                  })}
               </Route>
            </Routes>
         </BrowserRouter>
      </div>
   )
}

export default App
