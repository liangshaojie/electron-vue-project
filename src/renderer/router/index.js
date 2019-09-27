import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'
import BasicLayout from '@/layouts/BasicLayout'
import { recommendRoutes } from './modules/recommend'

Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      name: 'index',
      component: BasicLayout,
      redirect: '/home',
      children: [
        ...recommendRoutes
      ]
    }
  ]
})
