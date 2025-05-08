import { Env } from '@/configs/api-url'
import { useAuth } from '@/contexts/providers/use-auth'
import Axios from 'axios'
export const baseAxios = Axios.create({
  baseURL: Env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

baseAxios.interceptors.request.use((config) => {
  const token = useAuth.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
