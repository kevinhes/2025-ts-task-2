<script setup lang="ts">
import FrontHeader from './FrontHeader.vue'
import FrontFooter from './FrontFooter.vue'
</script>

<template>
  <div class="front-layout">
    <FrontHeader />
    <main>
      <RouterView />
    </main>
    <FrontFooter />
  </div>
</template>

<style lang="scss" scoped>
.front-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>


