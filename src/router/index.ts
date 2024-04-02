import type { App } from 'vue'
import { type Router, createRouter, createWebHistory } from 'vue-router'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
  strict: true
})

router.beforeEach(() => {})

router.afterEach(() => {})

export default router

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
