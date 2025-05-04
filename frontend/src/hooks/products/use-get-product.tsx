import { getProduct } from '@/api/product/product'
import type { TMetadata } from '@/commons/types'
import { useQuery } from '@tanstack/react-query'

export const useGetProduct = (params: TMetadata) => {
  return useQuery({
    queryKey: ['product', params],
    queryFn: () => getProduct(params),
  })
}
