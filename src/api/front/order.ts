import type { AxiosResponse } from 'axios'

import type { GetCouponResponse } from '@/types/front/order'
import createHttpClient from './http'

const API_PATH = import.meta.env.VITE_API_PATH

const orderApi = createHttpClient()

/** ------------------------------------------------------------------------------------------------
 * @function
 * apiApplyCoupon
 * @description
 * 套用優惠券資料
 */

export const apiApplyCoupon = (couponCode: string): Promise<AxiosResponse<GetCouponResponse>> =>
  orderApi.post(`/v2/api/${API_PATH}/coupon`, {
    data: {
      code: couponCode,
    },
  })
