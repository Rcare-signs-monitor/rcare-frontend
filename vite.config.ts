import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import { Plugin as importToCDN } from "vite-plugin-cdn-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: `https://unpkg.com/vue@3.4.31/dist/vue.global.js`,
          
        },
        {
          name: 'vue-demi',
          var: 'VueDemi',
          path: `https://unpkg.com/vue-demi@0.14.8/lib/index.iife.js`,
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: `https://unpkg.com/vue-router@4.4.0/dist/vue-router.global.js`,
        },
        {
          name: 'element-plus',
          var: 'ElementPlus',
          path: 'https://unpkg.com/element-plus@2.7.6/dist/index.full.js',
          css: 'https://unpkg.com/element-plus@2.7.6/dist/index.css'
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
