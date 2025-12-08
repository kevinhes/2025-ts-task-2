# CLAUDE.md

此檔案為 Claude Code (claude.ai/code) 在此專案中工作時提供指引。

## 專案概述

這是一個專注於在真實電子商務商品管理系統中練習 TypeScript 語法的 Vue 3 + TypeScript 學習專案。此專案設計為練習題目，讓學習者為現有的 Vue 3 應用程式加上 TypeScript 型別註解。

**重要背景資訊**：這是一個 TypeScript 學習練習專案。功能性的 Vue 程式碼已經完成，但 TypeScript 型別註解可能不完整或標記為 `unknown` 型別作為練習區域。

## 開發指令

### 設定環境
```bash
npm install
```

### 開發
```bash
npm run dev              # 啟動 Vite 開發伺服器
```

### 型別檢查與建置
```bash
npm run type-check       # 使用 vue-tsc 檢查 TypeScript 型別
npm run build            # 型別檢查 + 建置正式版本
npm run build-only       # 建置但不進行型別檢查
npm run preview          # 預覽正式版本建置
```

### 程式碼品質
```bash
npm run lint             # 執行 ESLint 並自動修正
npm run format           # 使用 Prettier 格式化程式碼
```

### OpenAPI 程式碼生成
```bash
npm run generate         # 從 OpenAPI 規格生成 TypeScript 型別
```

## 架構概覽

### 應用程式結構

**前台路由**：
- `/` - 公開首頁 (FrontLayout 與 HomePage)
- `/login` - 管理員登入頁面

**管理後台路由** (`/dashboard`)：
- `/product-management` - 商品 CRUD 操作
- `/order-management` - 訂單管理

### 型別系統架構

專案使用集中式型別定義方式：

1. **型別定義** (`src/types/`)：
   - `product.ts` - 商品資料型別、商品 API 請求/回應型別
   - `order.ts` - 訂單資料型別、訂單 API 回應型別
   - `user.ts` - 使用者認證型別

2. **API 層** (`src/api/`)：
   - 每個 API 模組匯出回傳 `Promise<AxiosResponse<T>>` 的型別化函式
   - Axios 攔截器處理來自 cookies 的認證 token
   - 所有 API 函式都使用來自 `src/types/` 的型別

3. **組合式函式** (`src/composable/`)：
   - `useProductForm()` - 回傳型別化的商品表單狀態和方法
   - `useImageUpload()` - 處理帶有型別化回應的圖片上傳
   - 所有組合式函式都匯出明確的介面作為回傳型別

### 核心架構模式

**認證流程**：
- Token 儲存在名為 `hexToken` 的 cookie 中
- Axios 請求攔截器自動將 token 附加到所有請求
- 在 `/login` 登入 → 儲存 token → 重新導向到 `/dashboard`

**API 回應結構**：
```typescript
// 列表回應包含分頁資訊
{
  success: boolean
  products: ProductData[]
  pagination: Pagination
  messages: unknown[]
}

// 變更回應 (新增/編輯/刪除)
{
  success: boolean
  message: string
}

// 圖片上傳回應
{
  success: boolean
  imageUrl: string
}
```

**商品資料流程**：
1. 管理員檢視商品列表 → `apiGetProducts()` 從 API 取得資料
2. 點擊編輯 → 透過 `useProductForm()` 將商品載入彈窗表單
3. 提交表單 → `apiEditProduct()` 或 `apiCreateProduct()`
4. 上傳圖片 → `apiUploadImage()` 回傳 URL 以加入表單

**路徑別名**：
- `@/` 對應到 `src/` 目錄 (在 vite.config.ts 和 tsconfig.app.json 中設定)

### 外部 API 整合

此專案連接到 HexSchool EC Course API：
- Base URL: `https://ec-course-api.hexschool.io/`
- API Path: `gallery-ecommerce` (可透過環境變數設定)
- API 端點遵循模式：`/v2/api/${API_PATH}/admin/{resource}`

環境變數 (`.env`)：
- `VITE_BASE_URL` - API 基礎 URL
- `VITE_API_PATH` - API 路徑區段

## TypeScript 練習區域

在此程式碼庫中進行 TypeScript 練習時：

1. **型別定義** (`src/types/product.ts`)：
   - 尋找需要替換為適當型別的 `unknown` 型別
   - 商品資料應符合註解中定義的結構
   - 使用 `Omit<>` 工具型別來定義衍生型別 (例如：CreateProductParams 省略 'id' 和 'num')

2. **API 函式** (`src/api/products.ts`)：
   - 所有函式都應有明確的參數和回傳型別
   - 回傳型別為 `Promise<AxiosResponse<ResponseType>>`
   - 從 `@/types/product` 匯入回應型別

3. **組合式函式**：
   - 匯出明確的介面型別作為回傳值
   - 使用 Vue 的 `Ref<T>` 來定義響應式狀態
   - 函式參數和回傳型別應完整定義型別

4. **Vue 組件**：
   - Script setup 區塊應使用 TypeScript
   - Props 和 emits 應定義型別
   - Refs 和 reactive 資料應有明確的型別

## 常見模式

### 建立新的 API 函式
```typescript
import type { ResponseType } from '@/types/...'
import axios, { type AxiosResponse } from 'axios'

export const apiFunction = (params: ParamsType): Promise<AxiosResponse<ResponseType>> =>
  api.method('/endpoint', params)
```

### 建立新的組合式函式
```typescript
interface UseFeatureResult {
  state: Ref<StateType>
  method: (param: ParamType) => void
}

export function useFeature(): UseFeatureResult {
  const state = ref<StateType>(initialValue)

  const method = (param: ParamType): void => {
    // 實作內容
  }

  return { state, method }
}
```

### 使用 Vue Router
```typescript
import { useRouter } from 'vue-router'

const router = useRouter()
router.push('/path')  // 導航
```

## 嚴格的 TypeScript 設定

此專案使用嚴格的 TypeScript 設定：
- `"strict": true` - 啟用所有嚴格型別檢查
- `"noUnusedParameters": true` - 未使用的參數會造成錯誤
- `"noFallthroughCasesInSwitch": true` - Switch 陳述式必須詳盡處理
- Target: ES2022 與現代 ESM 模組
