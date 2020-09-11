
import axios from 'axios'
const state = {
  token: null,
  user: null,
}

export default {
  namespaced: true,
  state,
  getters: {
    authenticated(state) {
      return (state.token && state.user) ? true : false
    },
    user(state) {
      return state.user
    }
  },
  actions: {
    async SignIn({ dispatch }, credentials) {
      let response = await axios.post('http://localhost/emr/api/GetToken', credentials)
      // console.log(response);
      return dispatch('attempt', response.data.token)
    },
    async attempt({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token);
      }
      if (!state.token) {
        return
      }
      try {
        let response = await axios.get('http://localhost/emr/api/GetUser')
        // console.log(response.data);
        if (response.data.NoPIN) {
          commit('SET_USER', response.data);

        }
        else {
          commit('SET_TOKEN', null);
          commit('SET_USER', null);
        }
      } catch (e) {


      }

    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, data) {
      state.user = data
    }
  }
}
