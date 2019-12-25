import Vue from 'vue'
import Vuex from 'vuex'
import history from '@/store/modules/history'
import calculator from '@/store/modules/calculator'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    history, calculator
  },
  plugins: [createPersistedState(
    {
      key: 'battleground-history',
      paths: ['history.results','history.resultsBackup', 'history.mmr', 'calculator']
    }
  )]
})
