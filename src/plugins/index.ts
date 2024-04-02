import type { App } from 'vue'

import { useElementPlus } from './element-plus'

export const setupPlugins = (app: App) => {
  app.use(useElementPlus)
}
