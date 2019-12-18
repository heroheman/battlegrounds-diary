import dataHeroes from '@/data/heroes.json'
import dataTribes from '@/data/tribes.json'

const state = {
  heroes: dataHeroes,
  tribes: dataTribes
}

const mutations = {}

const actions = {}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
