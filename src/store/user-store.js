const state = {
  isLoggedIn: false
};

const mutations = {
  logInUser(state) {
    state.isLoggedIn = true;
  },
  logOutUser(state) {
    state.isLoggedIn = false;
  }
};

const actions = {
  logInUser({ commit }) {
    console.log('login action');
    commit('logInUser');
  },
  logOutUser({ commit }) {
    commit('logOutUser');
  }
};

const getters = {
  isLoggedIn: () => state.isLoggedIn
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
