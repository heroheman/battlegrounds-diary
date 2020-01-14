import Vue from 'vue'
import App from './App.vue'
import store from './store/'
import router from './router'

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// Chart.defaults.global.plugins.datalabels.color = '#ffffff'
Chart.plugins.unregister(ChartDataLabels);

import BootstrapVue from 'bootstrap-vue'
import Moment from 'vue-moment'
import Unicon from 'vue-unicons'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {
  uniTrash, uniCommentLines, uniSorting, uniInfoCircle,
  uniArrowGrowth, uniChartDown, uniCog, uniChartPieAlt, uniNinja,
  uniChartBar, uniImageDownload, uniCircle, uniListUl, uniTimes, uniBookOpen,
  uniCalculator, uniQuestionCircle, uniDiary, uniPlus
} from 'vue-unicons/src/icons'

Unicon.add([
  uniTrash, uniCommentLines, uniSorting, uniInfoCircle,
  uniArrowGrowth, uniChartDown, uniCog, uniChartPieAlt, uniNinja,
  uniChartBar, uniImageDownload, uniCircle, uniListUl, uniTimes, uniBookOpen,
  uniCalculator, uniQuestionCircle, uniDiary, uniPlus
])

Vue.use(Unicon)
Vue.use(BootstrapVue)
Vue.use(Moment);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
