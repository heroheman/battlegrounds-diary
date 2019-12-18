import dataHeroes from '@/data/heroes.json'
import dataTribes from '@/data/tribes.json'
import dataSummary from '@/data/summary.json'

const state = {
  heroes: dataHeroes,
  tribes: dataTribes,
  summary: dataSummary,
  results: []
}

const mutations = {
  ADD_RESULT: (state, payload) => {
    state.results.push(payload)
  },
  REMOVE_RESULT: () => {
  },
  UPDATE_RESULT: () => {
  }
}

const actions = {
  addResult ({ commit }, data) {
    // add id to data
    commit('ADD_RESULT', data)
  },
  removeResult ({ commit }, id) {
    commit('REMOVE_RESULT', id)
  },
  updateResult ({ commit }, data) {
    commit('UPDATE_RESULT', data)
  },
}

const getters = {
  resultsTableData: state => {
    return state.results.map(res => {
      return {
        hero: state.heroes.find( h => h.id === res.hero ).name || '',
        tribe: res.tribe,
        mmr: res.mmr,
        placement: res.placement,
        summary: state.summary.find( s => s.id === res.summary ).titleShort || '',
        timestamp: res.timestamp,
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
