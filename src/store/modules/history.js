import dataHeroes from '@/data/heroes.json'
import dataTribes from '@/data/tribes.json'

const state = {
  heroes: dataHeroes,
  tribes: dataTribes,
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

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
