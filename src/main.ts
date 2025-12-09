import { createApp } from 'vue'

import './assets/styles/all.scss'

import 'bootstrap/js/dist/collapse'

import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(VCalendar, {})

app.mount('#app')
