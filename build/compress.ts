import { type PluginOption } from 'vite'
import viteCompression from 'vite-plugin-compression'

export const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const { VITE_BUILD_COMPRESS = 'none', VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv

  const compressList = VITE_BUILD_COMPRESS.split(',')

  const plugins: PluginOption[] = []

  if (compressList.includes('gzip')) {
    plugins.push(
      viteCompression({
        // 生成的压缩包后缀
        ext: '.gz',
        // 体积大于threshold才会被压缩
        algorithm: 'gzip',
        // 默认压缩.js|mjs|json|css|html后缀文件，设置成true，压缩全部文件
        filter: () => true,
        // 压缩后是否删除原始文件
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    )
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      viteCompression({
        ext: '.br',
        algorithm: 'brotliCompress',
        filter: () => true,
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    )
  }

  return plugins
}
