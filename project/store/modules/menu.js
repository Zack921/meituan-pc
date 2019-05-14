const state = () => ({
  menu: []
});

const mutations = {
  setMenu(state, val) {
    state.menu = val
  }
};

const actions = {
  setMenu: ({commit, menu}) => {
    commit('setMenu', menu);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};