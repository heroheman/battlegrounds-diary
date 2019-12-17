import Vue from 'vue'
// import store from '@/store'
import Router from 'vue-router'
import Calculator from '@/views/Calculator'
import History from '@/views/History'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Calculator',
      component: Calculator
    },
    {
      path: '/history',
      name: 'History',
      component: History
    }
  ]
})
