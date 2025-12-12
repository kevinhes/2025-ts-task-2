import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/styles/all.scss'

import 'bootstrap/js/dist/collapse'

import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VCalendar, {})

app.mount('#app')
