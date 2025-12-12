import type { ProductData } from './product'

export type CouponInfo = {
  code: string
  due_date: number
  id: string
  is_enabled: number
  percent: number
  title: string
}

export type CartItem = {
  coupon: CouponInfo
  final_total: number
  id: string
  product: ProductData
  product_id: string
  qty: number
  total: number
}

export type CartInfo = {
  carts: CartItem[]
  total: number
  final_total: number
}

export type GetCartResponse = {
  success: boolean
  data: CartInfo
  messages: []
}

export type EditCartResponse = {
  success: boolean
  message: string
  data: {
    product_id: string
    qty: number
  }
}

export type DeleteCartResponse = {
  success: boolean
  message: string
}

export type AddCartResponse = {
  success: boolean
  message: string
  data: Omit<CartItem, 'coupon'>
}
