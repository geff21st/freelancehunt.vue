import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/project/:id',
    name: 'ProjectPage',
    component: () => import(/* webpackChunkName: "projectPage" */ '../views/ProjectPage.vue')
  },
  {
    path: '/help',
    name: 'HelpPage',
    component: () => import(/* webpackChunkName: "helpPage" */ '../views/HelpPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
