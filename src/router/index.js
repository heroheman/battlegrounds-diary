import Vue from 'vue'
// import store from '@/store'
import Router from 'vue-router'
import Calculator from '@/views/Calculator'
import History from '@/views/History'
import Privacy from '@/views/Privacy'
import Imprint from '@/views/Imprint'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/history',
    },
    {
      path: '/calculator',
      name: 'Calculator',
      component: Calculator
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: Privacy
    },
    {
      path: '/imprint',
      name: 'Imprint',
      component: Imprint
    },
  ]
})
