import dataHeroes from '@/data/heroes.json'
import dataTribes from '@/data/tribes.json'
import dataSummary from '@/data/summary.json'

import { placementEmoji, uuidv4, howMany } from '@/helper'

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
  DELETE_RESULT: (state, id) => {
    const index = state.results.findIndex(result => result.id == id)
    state.results.splice(index, 1)
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
    return state.results.map((res, index, arr) => {
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
        missed: res.missed,
        last: arr.length - 1 === index ? true : false
      }
    })
  },
  mmrChartData: state => resultsLength => {
    let arr = []
    for (let [index, result]of state.results.entries()) {
      if (index < resultsLength) {
        arr.push(result.mmr)
      }
    }
    return arr;
  },
  mmrChartDataLabels: state => resultsLength => {
    let arr = []
    for (let [index, res]of state.results.entries()) {
      if (index < resultsLength) {
        let hero = state.heroes.find( h => res.hero === h.id ).name
        let tribe = state.tribes.find( t => res.tribe === t.id ).name
        arr.push(`${hero} ${tribe}`)
      }
    }
    return arr;
  },
  heroesChartData: state => {
    let heroes = {
      labels: [],
      data: []
    }

    for (let res of state.heroes) {
      let games = howMany(state.results, 'hero')(res.id)
      if (games > 0) {
        heroes.labels.push(res.name)
        heroes.data.push(games)
      }
    }
    return heroes
  },
  tribeChartData: state => {
    let tribes = {
      labels: [],
      data: []
    }

    for (let res of state.tribes) {
      let wins = howMany(state.results, 'tribe')(res.id)
      if (wins > 0) {
        tribes.labels.push(res.name)
        tribes.data.push(wins)
      }
    }
    return tribes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
