import axios from 'axios'
import type { AxiosResponse } from 'axios'

import type { GetProductsResponse } from '@/types/front/product'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_PATH = import.meta.env.VITE_API_PATH

const productApi = axios.create({
  baseURL: BASE_URL,
})

productApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)

export const apiGetProducts = (params: {
  page?: string
  category?: string
}): Promise<AxiosResponse<GetProductsResponse>> =>
  productApi.get(`/v2/api/${API_PATH}/products`, {
    params,
  })

export const apiGetAllProducts = (): Promise<AxiosResponse<GetProductsResponse>> =>
  productApi.get(`/v2/api/${API_PATH}/products/all`)
