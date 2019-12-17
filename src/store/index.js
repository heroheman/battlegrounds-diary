import Vue from 'vue'
import Vuex from 'vuex'
import history from '@/store/modules/history'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    history
  }
})
