import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'

const routes = [
  {
    path: '/',
    name: 'ListView',
    component: ListView
  },
  {
    path: '/task-detail',
    name: 'DetailView',
    component: () => import('../views/DetailView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
