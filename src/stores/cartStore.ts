import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apiUpdateCartItem, apiGetCart, apiDeleteCartItem, apiAddCartItem } from '@/api/front/cart'
import type { CartInfo } from '@/types/front/cart'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartInfo>({
    carts: [],
    total: 0,
    final_total: 0,
  })
  const isUpdating = ref(false)
  const isDeleting = ref(false)

  const getCart = async () => {
    try {
      const res = await apiGetCart()
      cart.value = res.data.data
    } catch {
      alert('取得購物車失敗')
    }
  }

  const addCartItem = async ({ product_id, qty }: { product_id: string; qty: number }) => {
    try {
      await apiAddCartItem({ product_id, qty })
      await getCart()
    } catch {
      alert('取得購物車失敗')
    }
  }

  const updataCartItem = async ({
    id,
    product_id,
    qty,
  }: {
    id: string
    product_id: string
    qty: number
  }) => {
    try {
      isUpdating.value = true
      await apiUpdateCartItem({ id, data: { product_id, qty } })
      await getCart()
    } catch {
      alert('更新購物車失敗')
    } finally {
      isUpdating.value = false
    }
  }

  const deleteCartItem = async (id: string) => {
    isDeleting.value = true
    try {
      await apiDeleteCartItem(id)
      await getCart()
    } catch {
      alert('刪除購物車失敗')
    } finally {
      isDeleting.value = true
    }
  }
  return {
    getCart,
    cart,
    isUpdating,
    isDeleting,
    addCartItem,
    updataCartItem,
    deleteCartItem,
  }
})
