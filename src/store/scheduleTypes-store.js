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
  reloadScheduleTypes({ commit }) {
    axios.get('/ScheduleType')
      .then(res => {
        if (res.data.success) {
          let scheduleTypes = res.data.result.map(({id, name}) => ({label: name, value: id}))
          scheduleTypes.unshift({label: 'هیچ کدام', value: 0})
          commit('reloadScheduleTypes', scheduleTypes)
        }
      })
      .catch(() => {
        return {
          msg: 'ارتباط با سرور: عدم دریافت لیست انواع ماموریت‌ها',
          color: 'negative',
          icon: 'error'
        }
      })
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
