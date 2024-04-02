import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'

import postcssPresetEnv from 'postcss-preset-env'

import { wrapperEnv } from './build/getEnv'
import { createVitePlugins } from './build/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    plugins: [...createVitePlugins(viteEnv)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      postcss: {
        plugins: [
          postcssPresetEnv({
            autoprefixer: {
              overrideBrowserslist: ['> 1%', 'last 2 versions', 'not ie <= 8'],
              grid: true
            }
          })
        ]
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: '@import "@/style/variable/index.less";'
        }
      }
    },
    server: {
      // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      minify: 'esbuild',
      sourcemap: viteEnv.VITE_DROP_SOURCEMAP,
      // 是否禁用 gzip 压缩大小报告，如果禁用可略微减少打包时间
      reportCompressedSize: true,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
})
