import type { Pagination, MessageResponse } from './product'

/** ---------------------------------------------------------
 * Type: Coupon 的物間型別
 */

export interface CouponData {
  code: string
  due_date: number
  id: string
  is_enabled: number
  percent: number
  title: string
  num: number
}

export type EditCouponParams = {
  id: string
  data: Omit<CouponData, 'id' | 'num'>
}

export interface GetCouponResponse {
  // 在這裡加上型別定義，將 unknown 替換為正確的型別
  success: boolean
  coupons: CouponData[]
  pagination: Pagination
  messages: MessageResponse
}

export type CreateCouponParams = Omit<CouponData, 'id' | 'num'>

export type CreateCouponResponse = MessageResponse
export type EditCouponResponse = MessageResponse
export type DeleteCouponResponse = MessageResponse
