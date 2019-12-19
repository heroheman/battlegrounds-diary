import dataHeroes from '@/data/heroes.json'
import dataTribes from '@/data/tribes.json'
import dataSummary from '@/data/summary.json'

import placementEmoji from '@/helper'

const state = {
  heroes: dataHeroes,
  tribes: dataTribes,
  summary: dataSummary,
  mmr: null,
  results: []
}

const mutations = {
  ADD_RESULT: (state, payload) => {
    state.results.push(payload)
  },
  SET_MMR: (state, payload) => {
    state.mmr = payload
  },
  REMOVE_RESULT: () => {
  },
  UPDATE_RESULT: () => {
  }
}

const actions = {
  addResult ({ commit }, data) {
    commit('ADD_RESULT', data)
  },
  setMmr ({ commit }, data) {
    commit('SET_MMR', data)
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
        hero: state.heroes.find( h => res.hero === h.id ).name || '',
        tribe: state.tribes.find( t => t.id === res.tribe ).name || '',
        mmr: `${res.mmr} - (${res.difference})`,
        placement: `${res.placement} (${placementEmoji(res.placement)})`,
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
