import { baseAxios } from '@/utils/fetcher'
import type { TLoginRequest, TLoginResponse } from './type'

export const login = async (
  payload: TLoginRequest,
): Promise<TLoginResponse> => {
  const res = await baseAxios.post('/auth/login', payload)
  return res.data
}
