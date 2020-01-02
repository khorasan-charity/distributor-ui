import axios from 'axios'
const state = {
  scheduleTypes: [
    {
      label: 'هیچ کدام',
      value: 0
    }
  ]
}

const mutations = {
  reloadScheduleTypes(state, scheduleTypes) {
    state.scheduleTypes = scheduleTypes
    console.log(state.scheduleTypes)
  }
}

const actions = {
  // this function will be removed
  reloadScheduleTypes({ commit }) {
    axios.get('/ScheduleType')
      .then(res => {
        if (res.data.success) {
          let scheduleTypes = res.data.result.map(({id, name}) => ({label: name, value: id}))
          scheduleTypes.unshift({label: 'هیچ کدام', value: 0})
          commit('reloadScheduleTypes', scheduleTypes)
        }
      })
      .catch(err => {
        console.log(err.message);
      })
  },
  addScheduleType(scheduleType) {
    return axios.post('/scheduleType', scheduleType)
  }
}

const getters = {
  scheduleTypes: () => state.scheduleTypes
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
