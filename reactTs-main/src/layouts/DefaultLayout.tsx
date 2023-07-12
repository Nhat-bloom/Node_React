import { Link, Outlet } from 'react-router-dom'
import { FormContext } from '../context/statusForm'

import { useContext } from 'react'
import { useAppSelector } from '../hooks/redux/hooks'
import { selectAuthStatus, selectorUser } from '../features/auth/authSlice'
type Props = {
   logout: () => void
}
const DefaultLayout = ({ logout }: Props) => {
   const formContext = useContext(FormContext)
   const selectorIsLogin = useAppSelector(selectAuthStatus)
   const user = useAppSelector(selectorUser)
   return (
      <div className='px-10 pb-10'>
         <nav className='flex justify-center items-center gap-5 pt-10'>
            <Link to={'/'}>Home</Link>
            <Link to={'/admin'}>Admin</Link>
            {selectorIsLogin ? (
               <p>{user?.name}</p>
            ) : (
               <div>
                  <Link to={'/login'} className='mr-3' onClick={() => formContext?.handleChangeStatus('login')}>
                     Log in
                  </Link>
                  <Link to={'/signup'} onClick={() => formContext?.handleChangeStatus('signup')}>
                     Sign up
                  </Link>
               </div>
            )}
            {selectorIsLogin && (
               <button
                  className='border border-green-300 rounded-md p-2 hover:bg-green-300 hover:text-white'
                  onClick={logout}
               >
                  Log out
               </button>
            )}
         </nav>
         <Outlet />
      </div>
   )
}

export default DefaultLayout
