import Vue from 'vue'
// import store from '@/store'
import Router from 'vue-router'
import Calculator from '@/views/Calculator'
import History from '@/views/History'
import Privacy from '@/views/Privacy'
import Imprint from '@/views/Imprint'
import About from '@/views/About'
import Changelog from '@/views/Changelog'
import Settings from '@/views/Settings'

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
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/changelog',
      name: 'Changelog',
      component: Changelog
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
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
