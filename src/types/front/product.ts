import type { Pagination } from './utili'

export type ProductData = {
  category: string
  content: string
  description: string
  id: string
  imageUrl: string
  imagesUrl: string[]
  is_enabled: number
  origin_price: number
  price: number
  title: string
  unit: string
  num: number
}

export type GetProductsResponse = {
  // 在這裡加上型別定義，將 unknown 替換為正確的型別
  success: boolean
  products: ProductData[]
  pagination: Pagination
  messages: MessageResponse
}

// TODO: 定義訊息回應基本型別
// 提示：包含 success (布林值) 和 message (字串)
export type MessageResponse = {
  // 在這裡加上型別定義，將 unknown 替換為正確的型別
  success: boolean
  message: string
}
