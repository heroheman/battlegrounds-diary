import { getField, updateField } from 'vuex-map-fields';

const state = {
  top4: '',
  first: '',
  upgrades: '',
  minionsKilled: '',
  triplesCreated: '',
  playersKilled: '',
  timePlayed: '',
}

const mutations = {
  updateField
}

const actions = {}

const getters = {
  getField
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
