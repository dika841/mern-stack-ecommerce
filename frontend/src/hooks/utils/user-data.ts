import { useAuth } from '@/contexts/providers/use-auth'
import { jwtDecode } from 'jwt-decode'
interface IUserData {
  user: {
    id: string
    role: string
    exp: number
    iat: number
  }
}
export const userData = () => {
  const { token } = useAuth()
  if (!token) return { user: null }
  const user = jwtDecode<IUserData>(token)
  return user
}
