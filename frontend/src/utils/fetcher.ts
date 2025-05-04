import { Env } from '@/configs/api-url'
import Axios from 'axios'
export const baseAxios = Axios.create({
  baseURL: Env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
