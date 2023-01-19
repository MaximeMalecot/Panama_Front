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
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard/DashboardView.vue'),
      children: [
        {
          path: '',
          name: 'dashboard-home',
          component: () => import('../views/Dashboard/DashboardOffers/DashboardOffersView.vue'),
        },
        {
          path: 'offers',
          name: 'dashboard-offers',
          component: () => import('../views/Dashboard/DashboardOffers/DashboardOffersView.vue'),
        },
        {
          path: 'projects',
          name: 'dashboard-projects',
          component: () => import('../views/Dashboard/DashboardProjects/DashboardProjectsView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Signup.vue')
    }
  ]
})

export default router
