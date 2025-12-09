<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import dayjs from 'dayjs'

import { apiGetCoupons, apiDeleteCoupon } from '@/api/admin/coupon'
import type { CouponData } from '@/types/admin/coupon'
import type { Pagination } from '@/types/admin/product'
import CouponModal from '@/components/admin/CouponModal.vue'
import DeleteModal from '@/components/admin/DeleteModal.vue'

const currentPage = ref<string>('1')
const coupons = ref<CouponData[]>([])
const pagination = ref<Pagination>({
  total_pages: 0,
  current_page: 0,
  has_pre: false,
  has_next: false,
  category: '',
})

/** ----------------------------------------------------------------
 * Function：格式化時間
 */

const formatDate = (timestamp: number): string => {
  return dayjs(timestamp * 1000).format('YYYY 年 MM 月 DD 日')
}

/** ----------------------------------------------------------------
 * Function 取得 coupon 資料
 */

const getCoupons = async () => {
  try {
    const res = await apiGetCoupons({
      page: currentPage.value,
    })
    console.log(res)
    coupons.value = res.data.coupons
    pagination.value = res.data.pagination
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    alert('取得產品列表失敗')
  }
}

onMounted(() => {
  getCoupons()
})

/** ----------------------------------------------------------------
 * Varialbe: 取得 Modal 的 DOM
 */

const couponModalRef = useTemplateRef<InstanceType<typeof CouponModal>>('couponModalRef')

/** ----------------------------------------------------------------
 * Function: 初始化 Coupon 券的資料結構
 */

const getInitialCouponData = (): CouponData => ({
  id: '',
  title: '',
  num: 0,
  is_enabled: 1,
  code: '',
  due_date: 0,
  percent: 0,
})

/** ----------------------------------------------------------------
 * Varialbe: 初始化 Coupon 券的資料結構
 */
const tempCoupon = ref<CouponData>(getInitialCouponData())

/** ----------------------------------------------------------------
 * Function: 開啟 modal
 */

const openModal = (coupon: CouponData | null = null): void => {
  if (coupon) {
    tempCoupon.value = { ...coupon }
  }

  couponModalRef.value?.openModal()
}

/** ----------------------------------------------------------------
 * Varialbe: 取得 deleteModal 的 DOM
 */
const deleteModalRef = useTemplateRef<InstanceType<typeof DeleteModal>>('deleteModalRef')
const openDeleteModal = (couponId: string): void => {
  deleteModalRef.value?.openModal(() => handleDeleteCoupon(couponId))
}
const handleDeleteCoupon = async (couponId: string): Promise<void> => {
  try {
    await apiDeleteCoupon(couponId)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    alert('刪除商品失敗')
  } finally {
    getCoupons()
  }
}
</script>
<template>
  <div class="d-flex justify-content-end align-items-center mb-4">
    <button @click="openModal(null)" type="button" class="btn btn-dark rounded-lg px-4 py-2">
      <i class="fas fa-plus me-2"></i>新增優惠券
    </button>
  </div>
  <div class="card shadow-sm rounded-lg flex-grow-1">
    <div class="card-body p-4">
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">優惠碼</th>
              <th scope="col">優惠券名稱</th>
              <th scope="col">折扣數</th>
              <th scope="col">到期日</th>
              <th scope="col" class="text-center">啟用</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="coupon in coupons" :key="coupon.id">
              <td>{{ coupon.code }}</td>
              <td>{{ coupon.title }}</td>
              <td>{{ coupon.percent }}</td>
              <td>{{ formatDate(coupon.due_date) }}</td>
              <td class="text-center">
                <div
                  class="form-check form-switch d-flex justify-content-center align-items-center"
                >
                  <input
                    readonly
                    class="form-check-input"
                    style="pointer-events: none"
                    type="checkbox"
                    id="flexSwitchCheckDefault1"
                    :checked="Boolean(coupon.is_enabled)"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <button
                  @click="openModal(coupon)"
                  type="button"
                  class="btn btn-sm btn-outline-dark rounded-lg me-2"
                >
                  編輯
                </button>
                <button
                  @click="openDeleteModal(coupon.id)"
                  type="button"
                  class="btn btn-sm btn-outline-danger rounded-lg"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <nav class="d-flex justify-content-center mt-4">
        <ul class="pagination">
          <li class="page-item">
            <button
              @click="currentPage = String(Number(currentPage) - 1)"
              :disabled="!pagination?.has_pre"
              type="button"
              class="page-link"
              :class="{ disabled: !pagination?.has_pre }"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li v-for="pageNum in pagination?.total_pages" :key="pageNum" class="page-item">
            <button
              @click="currentPage = pageNum.toString()"
              :disabled="currentPage === pageNum.toString()"
              type="button"
              class="page-link"
              :class="{ active: currentPage === pageNum.toString() }"
            >
              {{ pageNum }}
            </button>
          </li>
          <li class="page-item">
            <button
              @click="currentPage = String(Number(currentPage) + 1)"
              :disabled="!pagination?.has_next"
              class="page-link"
              :class="{ disabled: !pagination?.has_next }"
              type="button"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <CouponModal ref="couponModalRef" :coupon="tempCoupon" @get-coupons="getCoupons" />
  <DeleteModal ref="deleteModalRef" title="刪除優惠券" content="確定要刪除該優惠券嗎？" />
</template>
