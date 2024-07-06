import './assets/main.css'

import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import DataVVue3 from '@kjgl77/datav-vue3'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(DataVVue3)
app.use(router)
// app.use(ElementPlus, {
//     locale: zhCn
// })

// import * as echarts from 'echarts'
// import 'echarts-gl'
// app.config.globalProperties.$echarts = echarts

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';

app.config.globalProperties.$echarts = echarts

app.mount('#app')
