const state = {
  dark: true
}
const mutations = {
  TOGGLE_DARKMODE: (state, payload) => {
    state.dark = payload
  }
}
const actions = {}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
