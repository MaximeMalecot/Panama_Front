import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home/HomeView.vue'
import { ROLES } from '@/constants/roles';

// @todo change this to the store data
const userRole = ROLES.CLIENT;

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
          beforeEnter: (async (to, from, next) => {
            // When accessing /dashboard/ it will redirect the user to the correct page
            if (userRole === ROLES.CLIENT) {
              return next({ name: 'dashboard-offers' })
            }
            if (userRole === ROLES.FREELANCER) {
              return next({ name: 'dashboard-propositions' })
            }
            return next();
          }),
        },
        {
          path: 'offers',
          name: 'dashboard-offers',
          component: () => import('../views/Dashboard/DashboardOffers/DashboardOffersView.vue'),
          beforeEnter: (async (to, from, next) => {
            // When accessing /dashboard/ it will redirect the user to the correct page
            if (to.name === 'dashboard-offers' && userRole !== ROLES.CLIENT) {
              return next({ name: 'dashboard-home' });
            }
            return next();
          }),
        },
        {
          path: 'propositions',
          name: 'dashboard-propositions',
          component: () => import('../views/Dashboard/DashboardPropositions/DashboardPropositionsView.vue'),
          beforeEnter: (async (to, from, next) => {
            // When accessing /dashboard/ it will redirect the user to the correct page
            if (to.name === 'dashboard-propositions' && userRole !== ROLES.FREELANCER) {
              return next({ name: 'dashboard-home' });
            }
            return next();
          }),
        },
        {
          path: 'projects',
          name: 'dashboard-projects',
          component: () => import('../views/Dashboard/DashboardProjects/DashboardProjectsView.vue'),
        },
        {
          path: 'projects/:id',
          name: 'dashboard-project',
          component: () => import('../views/Dashboard/DashboardProject/DashboardProjectView.vue'),
        },
        {
          path: 'settings',
          name: 'dashboard-settings',
          component: () => import('../views/Dashboard/DashboardSettings/DashboardSettingsView.vue'),
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
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/project/new',
      name: 'new_project',
      component: () => import('../views/NewProject/NewProjectView.vue')
    }
  ]
})

export default router
