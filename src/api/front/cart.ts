import type { AxiosResponse } from 'axios'

import type {
  GetCartResponse,
  EditCartResponse,
  DeleteCartResponse,
  AddCartResponse,
} from '@/types/front/cart'
import createHttpClient from './http'

const API_PATH = import.meta.env.VITE_API_PATH

const cartApi = createHttpClient()

/** ------------------------------------------------------------------------------------------------
 * @function
 * apiAddCartItem
 * @description
 * 新增購物車資料
 */

export const apiAddCartItem = (data: {
  product_id: string
  qty: number
}): Promise<AxiosResponse<AddCartResponse>> => cartApi.post(`/v2/api/${API_PATH}/cart`, { data })

/** ------------------------------------------------------------------------------------------------
 * @function
 * apiDeleteCartItem
 * @description
 * 刪除購物車資料
 */

export const apiDeleteCartItem = (id: string): Promise<AxiosResponse<DeleteCartResponse>> =>
  cartApi.delete(`/v2/api/${API_PATH}/cart/${id}`)

/** ------------------------------------------------------------------------------------------------
 * @function
 * apiGetCart
 * @description
 * 取得購物車資料
 */

export const apiGetCart = (): Promise<AxiosResponse<GetCartResponse>> =>
  cartApi.get(`/v2/api/${API_PATH}/cart`)

/** ------------------------------------------------------------------------------------------------
 * @function
 * apiUpdateCartItem
 * @description
 * 更新購物車資料
 */

export const apiUpdateCartItem = (params: {
  id: string
  data: { product_id: string; qty: number }
}): Promise<AxiosResponse<EditCartResponse>> => {
  const { id, data } = params
  return cartApi.put(`/v2/api/${API_PATH}/cart/${id}`, {
    data,
  })
}
