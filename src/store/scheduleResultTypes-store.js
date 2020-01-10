import axios from 'axios'

const state = {
  scheduleResultTypes: []
}

const mutations = {
  reloadScheduleResultTypes(state, scheduleResultTypes) {
    state.scheduleResultTypes = scheduleResultTypes
    console.log(state.scheduleResultTypes) // will be removed
  }
}

const actions = {
  reloadScheduleResultTypes({ commit }) {
    axios.get('/ScheduleResultType')
      .then(res => {
        if (res.data.success) {
          let scheduleResultTypes = res.data.result.map(({id, name}) => ({label: name, value: id}))
          commit('reloadScheduleResultTypes', scheduleResultTypes)
        }
      })
      .catch(err => {
        console.log(err.message)
      })
  },
  addScheduleResultType({}, scheduleResultType) {
    return axios.post('/ScheduleResultType', scheduleResultType)
  },
  deleteScheduleResultType({}, id) {
    return axios.delete(`/ScheduleResultType/${id}`)
  },
  editScheduleResultType({}, scheduleResultType) {
    return axios.put('ScheduleResultType', scheduleResultType)
  }
}

const getters = {
  scheduleResultTypes: () => state.scheduleResultTypes
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
