export type GetCouponResponse = {
  success: boolean
  message: string
  data: {
    final_total: number
  }
}

export type AddOrderParams = {
  user: {
    name: string
    email: string
    tel: string
    address: string
  }
  message: string
}

export type AddOrderResponse = {
  success: boolean
  message: string
  total: number
  create_at: number
  orderId: string
}
