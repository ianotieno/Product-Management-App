import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/LoginPage.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../pages/ProductsPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/products/new',
    name: 'add-product',
    component: () => import('../pages/AddProductPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id',
    name: 'view-product',
    component: () => import('../pages/ViewProductPage.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/products')
  } else {
    next()
  }
})

export default router