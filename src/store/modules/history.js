import dataHeroes from '@/data/heroes.json'
import dataTribes from '@/data/tribes.json'
import dataSummary from '@/data/summary.json'

import { placementEmoji, uuidv4 } from '@/helper'

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
  DELETE_RESULT: () => {
  },
  UPDATE_RESULT: () => {
  }
}

const actions = {
  addResult ({ commit }, data) {
    data.id = uuidv4()
    commit('ADD_RESULT', data)
  },
  setMmr ({ commit }, data) {
    commit('SET_MMR', data)
  },
  deleteResult ({ commit }, id) {
    commit('DELETE_RESULT', id)
  },
  updateResult ({ commit }, data) {
    commit('UPDATE_RESULT', data)
  },
}

const getters = {
  resultsTableData: state => {
    return state.results.map(res => {
      return {
        id: res.id,
        hero: state.heroes.find( h => res.hero === h.id ).name || '',
        tribe: state.tribes.find( t => t.id === res.tribe ).name || '',
        mmr: res.mmr,
        difference: res.difference,
        placement: `${res.placement} ${placementEmoji(res.placement)}`,
        summary: state.summary.find( s => s.id === res.summary ).titleShort || '',
        timestamp: res.timestamp,
        note: res.note,
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
