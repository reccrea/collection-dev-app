import type { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import eslintPlugin from 'vite-plugin-eslint'
import removeConsole from 'vite-plugin-remove-console'

import { createCompression } from './compress'
import { cdn } from './cdn'

export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
  const { VITE_REPORT, VITE_DROP_CONSOLE, VITE_CDN } = viteEnv
  return [
    vue(),
    vueJsx(),
    // esLint 报错信息显示在浏览器界面上
    eslintPlugin(),
    // 删除console
    VITE_DROP_CONSOLE &&
      removeConsole({
        external: [],
        custom: ['console.log()', 'console.warn()', 'debugger']
      }),
    // 打包压缩配置
    createCompression(viteEnv),
    // 是否开启cdn
    VITE_CDN ? cdn : null,
    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT &&
      (visualizer({
        filename: 'stats.html',
        gzipSize: true,
        brotliSize: true
      }) as PluginOption)
  ]
}
