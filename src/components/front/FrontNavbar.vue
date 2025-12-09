<!-- 
  待處理事項

  購物車的 pinia 以及數量
-->

<script setup lang="ts">
import { RouterLink } from 'vue-router'
// import { useCartStore } from '@/stores/cartStore'
// import { storeToRefs } from 'pinia'
// import { onMounted } from 'vue'

// const cartStore = useCartStore()

// const { cart } = storeToRefs(cartStore)

// onMounted(() => {
//   cartStore.getCart()
// })
</script>

<template>
  <div class="container position-relative" style="min-height: 100vh">
    <div
      class="d-md-none position-absolute"
      style="
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: url(https://images.unsplash.com/photo-1656275537622-7837184a0dcc?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
        background-position: center center;
      "
    ></div>
    <nav
      class="navbar navbar-expand-lg navbar-light bg-white mt-n1 py-2 px-3 z-1"
      style="margin: 0 -0.75rem"
    >
      <RouterLink class="navbar-brand" to="/">
        <img
          class="img-fluid"
          style="width: 3.75rem; height: 3.75rem"
          src="@/assets/images/logo.webp"
          alt="logo"
        />
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink class="nav-item nav-link me-4" to="/products">產品列表</RouterLink>
          <RouterLink class="d-md-none nav-item nav-link" to="/cart">購物車</RouterLink>
          <RouterLink class="d-none d-md-block nav-item nav-link" to="/cart"
            ><div className="position-relative">
              <i className="fas fa-shopping-cart"></i>
              <!-- <span
                class="position-absolute badge text-bg-dark rounded-circle"
                style="bottom: 12px; left: 12px"
                >{{ cart?.carts.length }}</span
              > -->
              <span
                class="position-absolute badge text-bg-dark rounded-circle"
                style="bottom: 12px; left: 12px"
                >3</span
              >
            </div></RouterLink
          >
        </div>
      </div>
    </nav>
    <img
      class="d-none d-md-block img-fluid"
      src="https://images.unsplash.com/photo-1656275537622-7837184a0dcc?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="banner-desktop"
    />
    <div class="position-absolute top-0 start-0 bottom-0 end-0">
      <div class="h-100 d-flex flex-column justify-content-center align-items-center text-white">
        <h2>植感生活</h2>
        <p class="mb-0">專業挑選的室內植栽，打造你的專屬室內綠洲</p>
        <RouterLink to="/products" class="btn btn-dark rounded-3 mt-6">來去逛逛</RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
