import { API_ROUTES } from '@/commons/constanst/route'
import { baseAxios } from '@/utils/fetcher'
import type { TProductResponse } from './type'
import type { TMetadata } from '@/commons/types'

export const getProduct = async (
  params?: TMetadata,
): Promise<TProductResponse> => {
  const response = await baseAxios.get(API_ROUTES.PRODUCT.INDEX, { params })
  return response.data
}
