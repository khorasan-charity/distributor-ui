const state = {
  donorToEdit: {
    id: '',
    fullName: '',
    address: '',
    phoneNumber: '',
    mobileNumber: '',
    geoLocation: '',
    avatarUrl: '',
    description: ''
  }
}

const mutations = {
  editDonor(state , information) {
    state.donorToEdit = information
  },
  resetDonorToEdit(state) {
    state.donorToEdit = {
      id: '',
      fullName: '',
      address: '',
      phoneNumber: '',
      mobileNumber: '',
      geoLocation: '',
      avatarUrl: '',
      description: ''
    }
  }
}

const actions = {
  editDonor({ commit }, information) {
    commit('editDonor', information)
  },
  resetDonorToEdit({ commit }) {
    commit('resetDonorToEdit')
  }
}

const getters = {
  donorToEdit: () => state.donorToEdit
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
