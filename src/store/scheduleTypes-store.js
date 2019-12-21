import axios from 'axios'
const state = {
  scheduleTypes: []
}

const mutations = {
  reloadScheduleTypes(state, scheduleTypes) {
    state.scheduleTypes = scheduleTypes
  }
}

const actions = {
  reloadScheduleTypes({ commit }) {
    axios.get('/ScheduleType')
      .then(res => {
        if (res.data.success) {
          const scheduleTypes = res.data.result.map(({id, name}) => ({label: name, value: id}))
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
