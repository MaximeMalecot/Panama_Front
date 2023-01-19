import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/offres',
      name: 'offers',
      component: () => import('../views/Offers/OffersView.vue')
    },
    {
      path: '/offres/:id',
      name: 'offer',
      component: () => import('../views/Offer/OfferView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/project/new',
      name: 'new_project',
      component: () => import('../views/CreateProjectView.vue')
    }
  ]
})

export default router
