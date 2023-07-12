import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { signup, signin } from '../../api/auth/auth'
import { FormContext } from '../../context/statusForm'
import Modal from '../../components/Modal/Modal'
import Loading from '../../components/Loading/Loading'
export interface IInputAuth {
   name?: string
   email: string
   password: string
   confirmPassword?: string
}
const AuthenForm = () => {
   const [errorForm, setErrorForm] = useState<string>('')
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const formContext = useContext(FormContext)
   const navigate = useNavigate()
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors }
   } = useForm<IInputAuth>({ mode: 'onBlur' })
   const status = formContext?.status
   const handleSubmitForm = async (data: IInputAuth) => {
      try {
         setIsLoading(true)
         const user =
            formContext?.status === 'signup'
               ? await signup(data)
               : await signin({
                    email: data.email,
                    password: data.password
                 })
         setIsLoading(false)
         if (user) {
            if (user.data?.message) {
               setErrorForm(user.data?.message)
            } else {
               localStorage.setItem('token', user.data?.accessToken)
               localStorage.setItem('user', JSON.stringify(user.data?.data))
               navigate('/')
            }
         }
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <div className='flex justify-center text-center'>
         <form onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col gap-2'>
            <p>{status === 'signup' ? 'Sign up' : 'Log in'}</p>
            <div>
               {status === 'signup' && (
                  <div className='flex flex-col gap-3'>
                     <input
                        className={`${errors.name && 'border-red-400'} rounded-md`}
                        type='text'
                        style={{ padding: '15px' }}
                        placeholder='Your name'
                        {...register('name', {
                           required: 'This field is required',
                           validate: (value) => {
                              if (value?.trim() === '') {
                                 return 'This field is required'
                              }
                           }
                        })}
                     />
                     {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
                  </div>
               )}
            </div>
            <div className='flex flex-col gap-3'>
               <input
                  className={`${errors.email && 'border-red-400'} rounded-md`}
                  type='text'
                  style={{ padding: '15px' }}
                  placeholder='Email'
                  {...register('email', {
                     required: 'This field is required',
                     pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: 'Enter valid email!'
                     }
                  })}
               />
               {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
            </div>
            <div className='flex flex-col gap-3'>
               <input
                  className={`${errors.password && 'border-red-400'} rounded-md`}
                  type='password'
                  style={{ padding: '15px' }}
                  placeholder='Password'
                  {...register('password', {
                     required: 'This field is required',
                     min: { value: 6, message: 'Enter at least 6-characters' },
                     validate: (value) => {
                        if (value?.trim() === '') {
                           return 'This field is required'
                        }
                     }
                  })}
               />
               {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
            </div>
            {status === 'signup' && (
               <div className='flex flex-col gap-3'>
                  <input
                     className={`${errors.confirmPassword && 'border-red-400'} rounded-md`}
                     type='password'
                     style={{ padding: '15px' }}
                     placeholder='Confirm password'
                     {...register('confirmPassword', {
                        required: 'This field is required',
                        validate: (value) => {
                           if (watch('password') !== value) {
                              return 'Enter valid password'
                           }
                        }
                     })}
                  />
                  {errors.confirmPassword && (
                     <span className='text-red-500 text-sm'>{errors.confirmPassword.message}</span>
                  )}
               </div>
            )}
            <span className='text-red-500 text-sm'>{errorForm}</span>
            <div className='flex flex-col'>
               <button className='mt-3 p-2 rounded-lg border-primary border duration-300 hover:bg-primary hover:text-white'>
                  {status === 'signup' ? 'Register' : 'Log in'}
               </button>
               {status === 'signup' ? (
                  <div className='flex items-center'>
                     <p className='mr-2'>Already have account? </p>
                     <Link
                        to='/login'
                        style={{ cursor: 'pointer' }}
                        onClick={() => formContext?.handleChangeStatus('login')}
                     >
                        Log in
                     </Link>
                  </div>
               ) : (
                  <div className='flex items-center'>
                     <p className='mr-2'>Don't have account? </p>
                     <Link
                        to='/signup'
                        style={{ cursor: 'pointer' }}
                        onClick={() => formContext?.handleChangeStatus('signup')}
                     >
                        Sign up
                     </Link>
                  </div>
               )}
            </div>
         </form>
         <Modal isOpen={isLoading}>
            <Loading />
         </Modal>
      </div>
   )
}

export default AuthenForm
