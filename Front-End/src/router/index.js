// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
      {
        path: '/',
        name: 'login',
        component: () => import('@/views/logIn.vue'),
        meta: { hideNavbar: true } // Add this line

      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashBoard.vue'),
        meta: { requiresAuth: true }, // This route requires authentication

      },
      {
        path: '/candidates',
        name: 'ccandidates',
        component: () => import('@/views/candidatePage.vue'),
        meta: { requiresAuth: true }, // This route requires authentication

      },
      {
        path: '/candidates/:companyName/:jobTitle', // Dynamic route for company name
        name: 'Candidates',
        component: () => import('@/views/candidatePage.vue'),
        meta: { requiresAuth: true }, // This route requires authentication

      },
      {
        path: '/jobs',
        name: 'jobs',
        component: () => import('@/views/jobsPage.vue'),
        meta: { requiresAuth: true }, // This route requires authentication

      },
      {
        path: '/jobs/:id',
        name: 'jobss',
        component: () => import('@/views/jobsPage.vue'),
        meta: { requiresAuth: true }, // This route requires authentication

      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/userPage.vue'),
        meta: { requiresAuth: true }, // This route requires authentication

      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/settingsPage.vue'),
        meta: { requiresAuth: true }, // This route requires authentication

      },
]


// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// })

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to check if the user is authenticated
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');

  // Check if the route requires authentication and if the token is present
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // If not authenticated and trying to access a secured route, redirect to login
    next({ name: 'login' });
  } else {
    // Continue to the route if it doesn't require authentication or if the user is authenticated
    next();
  }
});

export default router;
// export default router
