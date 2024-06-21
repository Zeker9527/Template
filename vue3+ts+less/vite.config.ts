import { fileURLToPath, URL } from 'node:url'

import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    base: env.VITE_BASE_URL,
    // plugins: [vue(), VueDevTools(), envParse()],
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      devSourcemap: true
    },
    server: {
      port: 5174,
      host: true
      // proxy: {
      //   "/api": {
      //     target: "xxx",
      //     changeOrigin: true,
      //     ws: true, // 是否开启websocket支持
      //     rewrite: (path) => path.replace(/^\/api/, ""),
      //   },
      // },
    },
    build: {
      // sourcemap: true,
      target: 'esnext',
      outDir: 'dist',
      minify: 'esbuild',
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false
    }
  }
})
