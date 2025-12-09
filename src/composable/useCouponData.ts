import type { CouponData } from '@/types/coupon'
import { ref, type Ref } from 'vue'

interface UseCouponFormResult {
  form: Ref<CouponData>
  formTitle: Ref<string>
  loadCoupon: (data: CouponData | null) => void
  resetForm: () => void
}

const getInitialCouponData = (): CouponData => ({
  id: '',
  title: '',
  num: 0,
  is_enabled: 1,
  code: '',
  due_date: 0,
  percent: 0,
})

export function useCouponForm(): UseCouponFormResult {
  const form = ref<CouponData>(getInitialCouponData())
  const formTitle = ref('新增優惠券')

  const loadCoupon = (data: CouponData | null): void => {
    if (data) {
      // 編輯模式：載入資料
      form.value = { ...data }
      formTitle.value = '編輯優惠券'
    } else {
      resetForm()
    }
  }

  const resetForm = (): void => {
    form.value = getInitialCouponData()
    formTitle.value = '新增優惠券'
  }

  return {
    form,
    formTitle,
    loadCoupon,
    resetForm,
  }
}
