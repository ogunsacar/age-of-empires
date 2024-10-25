import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/default.vue'
import Home from '../views/Home.vue'
import Units from '@/views/Units/index.vue'
import UnitDetail from '@/views/Units/_id.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
        },
        {
          path: '/units',
          name: 'units',
          component: Units,
        },
        {
          path: '/units/:id',
          name: 'unit_detail',
          component: UnitDetail,
          props: true,
        },
      ],
    },
  ],
})

export default router
