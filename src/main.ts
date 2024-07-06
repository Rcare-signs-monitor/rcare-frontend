import './assets/main.css'

import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// import DataVVue3 from '@kjgl77/datav-vue3'
import * as echarts from 'echarts/core';

import App from './App.vue'
import router from './router'

const app = createApp(App)
// app.use(DataVVue3)
app.use(router)

app.config.globalProperties.$echarts = echarts

app.mount('#app')
