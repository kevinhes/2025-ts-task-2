<!-- 
==========================================
待辦事項
==========================================

到期輸入框看是不是能使用套件處理

-->

<script setup lang="ts">
// TODO: 匯入 API 函式
import { apiCreateCoupon, apiEditCoupon } from '@/api/coupon'
import { useCouponForm } from '@/composable/useCouponData'

// TODO: 匯入型別定義
import type { CouponData } from '@/types/coupon'
import { Modal } from 'bootstrap'

import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import dayjs from 'dayjs'

// TODO: 定義 Props 介面
interface CouponModalProps {
  coupon: CouponData
}

// TODO: 定義 props
// 提示：使用 defineProps<ProductModalProps>()
const { coupon } = defineProps<CouponModalProps>()

const emit = defineEmits(['get-coupons'])

// TODO: 為模板引用加上型別註解
const modalRef = useTemplateRef<HTMLElement>('modalRef')

// TODO: 為 modal 變數加上型別註解
let modal: Modal | null = null

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

const { form, formTitle, loadCoupon } = useCouponForm()
const date = ref<Date>(new Date())

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

const isEditMode = computed(() => Boolean(coupon.id))

const isLoading = ref(false)

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

defineExpose({
  openModal,
  closeModal,
})

// 格式化日期用於顯示
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
