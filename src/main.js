import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Toast from "vue-toastification";
import App from './App.vue'
import router from './router'
import "vue-toastification/dist/index.css";

import './assets/main.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(Toast)
app.use(router)
app.mount('#app')
