import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/components/Home.vue')
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: () => import('@/components/Detail.vue'),
      props: true
    }
  ]
})
