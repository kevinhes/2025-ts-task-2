<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import dayjs from 'dayjs'
import { Modal } from 'bootstrap'

import { apiCreateCoupon, apiEditCoupon } from '@/api/coupon'
import { useCouponForm } from '@/composable/useCouponData'
import type { CouponData } from '@/types/coupon'

/** ------------------------------------------------------------------------------------
 * Props: 定義 CouponModalProps 並用 ts 的方式引入
 */
interface CouponModalProps {
  coupon: CouponData
}

const { coupon } = defineProps<CouponModalProps>()

/** ------------------------------------------------------------------------------------
 * Emit: 設定 emit 呼叫父層的 getCoupons
 */

const emit = defineEmits(['get-coupons'])

/** ------------------------------------------------------------------------------------
 * Variable:
 * 1. 取得 DOM
 * 2. 設定儲存 Modal 的變數
 */

const modalRef = useTemplateRef<HTMLElement>('modalRef')

let modal: Modal | null = null

/** ------------------------------------------------------------------------------------
 * Lifecyle:
 * 1. onMounted 的時候抓取 modal DOM
 * 2. onUnmounted 的時候銷毀 modal DOM
 */

onMounted(() => {
  if (modalRef.value) {
    modal = new Modal(modalRef.value)
  }
})

onUnmounted(() => {
  if (modal) {
    modal.dispose()
  }
})

/** ------------------------------------------------------------------------------------
 * Function:
 * 1. openModal： 開啟 modal
 * 2. closeModal 關閉 modal
 */

const openModal = () => {
  if (modal) {
    modal.show()
  }
}

const closeModal = () => {
  if (modal) {
    modal.hide()
  }
}

/** ------------------------------------------------------------------------------------
 * DefineExpose:
 * 將 openModal 以及 closeModal 讓父層可以使用
 */

defineExpose({
  openModal,
  closeModal,
})

/** ------------------------------------------------------------------------------------
 * Composable & Variable:
 * 1. useCouponForm：取得表單資料、標題和載入優惠券方法
 * 2. date：儲存日期選擇器的值（Date 物件）
 */

const { form, formTitle, loadCoupon } = useCouponForm()
const date = ref<Date>(new Date())

/** ------------------------------------------------------------------------------------
 * Watch:
 * 1. 監聽 coupon props 變化，載入優惠券資料並轉換日期格式
 *    - 編輯模式：將 Unix timestamp 轉換為 Date 物件
 *    - 新增模式：重置為當前日期
 * 2. 監聽 date 變化，將 Date 物件轉換為 Unix timestamp 同步到 form
 */

watch(
  () => coupon,
  (newCoupon) => {
    if (newCoupon.id) {
      loadCoupon(newCoupon)
      date.value = newCoupon.due_date ? new Date(newCoupon.due_date * 1000) : new Date()
    } else {
      loadCoupon(null)
      date.value = new Date()
    }
  },
  { immediate: true, deep: true },
)

watch(date, (newDate) => {
  if (newDate) {
    form.value.due_date = Math.floor(newDate.getTime() / 1000)
  }
})

/** ------------------------------------------------------------------------------------
 * Computed & Variable:
 * 1. isEditMode：判斷是否為編輯模式（根據 coupon.id 是否存在）
 * 2. isLoading：儲存 API 請求的載入狀態
 */

const isEditMode = computed(() => Boolean(coupon.id))

const isLoading = ref(false)

/** ------------------------------------------------------------------------------------
 * Function: saveCoupon
 * 儲存優惠券（新增或編輯）
 * 1. 將表單資料解構，分離 id 與其他資料
 * 2. 根據 isEditMode 判斷呼叫新增或編輯 API
 * 3. 成功後關閉彈窗並通知父層重新載入列表
 */

const saveCoupon = async () => {
  const { id, ...couponData } = form.value

  const data = {
    ...couponData,
  }

  isLoading.value = true

  try {
    if (isEditMode.value && id) {
      await apiEditCoupon({ data, id })
    } else {
      await apiCreateCoupon(data)
    }
    closeModal()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    alert('新增/編輯產品失敗')
  } finally {
    isLoading.value = false
    emit('get-coupons')
  }
}

/** ------------------------------------------------------------------------------------
 * Computed: formattedDate
 * 格式化日期顯示為「YYYY 年 MM 月 DD 日」格式
 * 用於 input 輸入框的 readonly 顯示
 */

const formattedDate = computed(() => {
  return dayjs(date.value).format('YYYY 年 MM 月 DD 日')
})
</script>

<template>
  <div
    ref="modalRef"
    class="modal fade"
    id="addNewProductModal"
    tabindex="-1"
    aria-labelledby="addNewProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content rounded-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="addNewProductModalLabel">{{ formTitle }}</h5>
          <button
            @click="closeModal"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <form>
                <div class="mb-3">
                  <label for="productName" class="form-label">優惠券名稱</label>
                  <input
                    v-model="form.title"
                    type="text"
                    class="form-control rounded-lg"
                    id="productName"
                  />
                </div>
                <div class="row">
                  <div class="col-6 mb-3">
                    <label for="productOriginalPrice" class="form-label">優惠代碼</label>
                    <input
                      v-model="form.code"
                      type="text"
                      class="form-control rounded-lg"
                      id="productOriginalPrice"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label for="productPrice" class="form-label">優惠折數</label>
                    <input
                      v-model="form.percent"
                      type="number"
                      class="form-control rounded-lg"
                      id="productPrice"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 mb-3">
                    <label for="productCategory" class="form-label">到期日</label>
                    <input
                      :value="formattedDate"
                      readonly
                      class="form-control rounded-lg mb-3"
                      id="productCategory"
                    />
                    <VDatePicker v-model="date" expanded />
                  </div>
                </div>
                <div class="mb-3 d-flex align-items-center">
                  <label class="form-label me-3 mb-0">啟用</label>
                  <div class="form-check form-switch">
                    <input
                      v-model="form.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchProductEnable"
                      :true-value="1"
                      :false-value="0"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" type="button" class="btn btn-outline-secondary rounded-lg">
            取消
          </button>
          <button
            @click="saveCoupon"
            :disabled="isLoading"
            type="button"
            class="btn btn-dark rounded-lg"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
