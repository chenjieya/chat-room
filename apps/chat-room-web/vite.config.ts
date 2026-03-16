import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // 带选项写法：
      '/api': {
        target: 'http://127.0.0.1:3001',
        // target: 'http://httpbin.org',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
      // 代理 websockets 或 socket.io 写法：
      // ws://localhost:5173/socket.io
      // -> ws://localhost:5174/socket.io
      // 在使用 `rewriteWsOrigin` 时要特别谨慎，因为这可能会让
      // 代理服务器暴露在 CSRF 攻击之下
      // '/socket.io': {
      //   target: 'ws://localhost:5174',
      //   ws: true,
      //   rewriteWsOrigin: true
      // }
    }
  }
})
