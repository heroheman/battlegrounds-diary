import Vue from 'vue'
import App from './App.vue'
import store from './store/'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import Moment from 'vue-moment'
import Unicon from 'vue-unicons'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { uniTrash, uniCommentLines, uniSorting } from 'vue-unicons/src/icons'
Unicon.add([uniTrash, uniCommentLines, uniSorting])

Vue.use(Unicon)
Vue.use(BootstrapVue)
Vue.use(Moment);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
