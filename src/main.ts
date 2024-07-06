import './assets/main.css'

import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as echarts from 'echarts/core';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$echarts = echarts

app.use(router)
app.mount('#app')
