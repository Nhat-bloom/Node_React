import { IInputAuth } from '../../features/auth/AuthenForm'
import instance from '../config'

export const signup = (data: IInputAuth) => {
   return instance.post('/signup', data)
}
export const signin = (data: IInputAuth) => {
   return instance.post('/signin', data)
}
