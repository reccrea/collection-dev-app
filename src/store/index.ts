import type { App } from 'vue'
import { createPinia } from 'pinia'
import { setUpPiniaPersistPlugin } from './plugin/persist'

const store = createPinia()
setUpPiniaPersistPlugin(store)

export default store

export const setupStore = (app: App<Element>) => {
  app.use(store)
}
