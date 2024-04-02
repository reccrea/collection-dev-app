declare interface ViteEnv {
  VITE_USER_NODE_ENV: 'development' | 'production' | 'test'
  VITE_PORT: number
  VITE_OPEN: boolean
  VITE_REPORT: boolean
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'gzip,brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  VITE_DROP_CONSOLE: boolean
  VITE_PUBLIC_PATH: string
  VITE_DROP_SOURCEMAP: boolean
}

declare type Recordable<T = any> = Record<string, T>

declare module 'vite-plugin-eslint' {
  const content: any
  export = content
}
