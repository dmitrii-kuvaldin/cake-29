import { ErrorItem } from '../store/auth/auth.slice'
import User from './user.types'

export default interface AuthState {
  authChecked: boolean
  user?: undefined | User
  loginFormError?: string
  registerFormError?: ErrorItem[]
}

