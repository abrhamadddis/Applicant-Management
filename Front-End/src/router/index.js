// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/dashBoard.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/logIn.vue'),
      },
      {
        path: '/candidates',
        name: 'ccandidates',
        component: () => import('@/views/candidatePage.vue'),
      },
      {
        path: '/jobs',
        name: 'jobs',
        component: () => import('@/views/jobsPage.vue'),
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/userPage.vue'),
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/settingsPage.vue'),
      },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
