import type { Pagination } from './utils'

/** ------------------------------------------------------------
 * Type: 商品型別
 */

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

/** ------------------------------------------------------------
 * Type: 取權全部商品後 api 回傳型別
 */

export type GetProductsResponse = {
  success: boolean
  products: ProductData[]
  pagination: Pagination
  messages: MessageResponse
}

/** ------------------------------------------------------------
 * Type: api 回傳訊息型別
 */

export type MessageResponse = {
  success: boolean
  message: string
}

/** ------------------------------------------------------------
 * Type: 商品 detail api 回傳型別
 */

export type GetProductDetailResponse = {
  success: boolean
  product: ProductData
}
