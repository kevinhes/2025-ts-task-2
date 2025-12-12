import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

/** ------------------------------------------------------------------------------------------------
 * @function
 * createHttpClient
 * @description
 * 預設 axoix 的基礎資料
 * @returns
 * 回傳一個 axios 實體
 */
export default function createHttpClient() {
  const httpClient = axios.create({
    baseURL: BASE_URL,
  })

  httpClient.interceptors.response.use(
    (response) => {
      return Promise.resolve(response)
    },
    (error) => {
      return Promise.reject(error.response.data)
    },
  )

  return httpClient
}
