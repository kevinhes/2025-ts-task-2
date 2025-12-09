<script setup lang="ts">
import { RouterView } from 'vue-router'
import FrontFooter from './FrontFooter.vue'
import FrontNavbar from './FrontNavbar.vue'
</script>
<template>
  <FrontNavbar />
  <RouterView />
  <FrontFooter />
</template>
