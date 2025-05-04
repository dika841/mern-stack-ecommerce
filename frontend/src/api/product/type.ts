import type { TResponse } from '@/commons/types'

export type TProductVariant = {
  _id?: string
  size: string | null
  color: string | null
  stock: number
  price: number
  discount?: number | null
  sku: string
}
export type TProduct = {
  id?: string
  name: string
  description: string
  brand?: string
  category: {
    _id: string
    name: string
    slug: string
  }
  variants: TProductVariant[]
  images: string[]
  ratings: {
    average: number
    count: number
  }
  createdAt?: Date
  updatedAt?: Date
}

export type TProductResponse = TResponse<TProduct[]>
