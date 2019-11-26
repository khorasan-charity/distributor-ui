import axios from 'axios'

const state = {
  distributors: []
}

const mutations = {}

const actions = {}

const getters = {
  distributors: () => state.distributors
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
