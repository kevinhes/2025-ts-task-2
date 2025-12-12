import type { AxiosResponse } from 'axios'

import type { GetProductsResponse, GetProductDetailResponse } from '@/types/front/product'
import createHttpClient from './http'

const API_PATH = import.meta.env.VITE_API_PATH

const productApi = createHttpClient()

/** ------------------------------------------------------------------------------------------------
 * @function
 * apiGetProducts
 * @description
 * 取得商品資料
 * @returns
 * 回傳商品資料
 */

export const apiGetProducts = (params?: {
  page?: string
  category?: string
}): Promise<AxiosResponse<GetProductsResponse>> =>
  productApi.get(`/v2/api/${API_PATH}/products`, {
    params,
  })

/** ------------------------------------------------------------------------------------------------
 * @function
 * apiGetAllProducts
 * @description
 * 取得所有商品資料（不分頁）
 * @returns
 * 回傳所有商品資料
 */

export const apiGetAllProducts = (): Promise<AxiosResponse<GetProductsResponse>> =>
  productApi.get(`/v2/api/${API_PATH}/products/all`)

/** ------------------------------------------------------------------------------------------------
 * @function
 * apiGetProductDetail
 * @description
 * 取得單一商品詳細資料
 * @param
 * id - 商品 ID
 * @returns
 * 回傳商品詳細資料
 */

export const apiGetProductDetail = (id: string): Promise<AxiosResponse<GetProductDetailResponse>> =>
  productApi.get(`/v2/api/${API_PATH}/product/${id}`)
