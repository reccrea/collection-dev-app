import { createApp } from 'vue'

import '@/style/index.less'

import App from '@/App.vue'

import { setupStore } from '@/store'
import router, { setupRouter } from '@/router'

import { setupGlobComponent } from '@/components'
import { setupPlugins } from '@/plugins'
import { setupGlobDirectives } from '@/directives'

const bootstrap = async () => {
  const app = createApp(App)

  setupStore(app)
  setupRouter(app)

  await router.isReady()

  setupPlugins(app)
  setupGlobComponent(app)
  setupGlobDirectives(app)

  app.mount('#app')
}

bootstrap()
