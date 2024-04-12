import { Plugin as importToCDN } from 'vite-plugin-cdn-import'

export const cdn = importToCDN({
  /* 
    name: 下面modules的name
    version: 读取本地package.json中dependencies依赖中对应包的版本号
    path: 下面modules的path
  */
  prodUrl: 'https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}',
  modules: [
    {
      name: 'vue',
      var: 'Vue',
      path: 'vue.global.prod.min.js'
    },
    {
      name: 'vue-router',
      var: 'VueRouter',
      path: 'vue-router.global.min.js'
    },
    /* {
      name: 'vue-demi',
      var: 'VueDemi',
      path: 'index.iife.min.js'
    },
    {
      name: 'pinia',
      var: 'Pinia',
      path: 'pinia.iife.min.js'
    }, */
    {
      name: 'element-plus',
      var: 'ElementPlus',
      path: 'index.full.min.js',
      css: 'index.min.css'
    },
    {
      name: 'crypto-js',
      var: 'CryptoJS',
      path: 'crypto-js.min.js'
    }
  ]
})
