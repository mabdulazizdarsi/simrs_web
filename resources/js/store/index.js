import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../store/auth/index'
import igd from '../store/igd/index'
import gambar from '../store/gambar/index'

import TicketBooking from '../store/TicketBooking/index'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    loader: false
  },
  mutations: {
    commitLoader (state, data) {
      state.loader = data
    }
  },
  actions: {
    updateLoader (context, payload) {
      context.commit('commitLoader', payload)
    }
  },
  getters: {
    loader: state => state.loader
  },
  modules: {
    auth,
    igd,
    TicketBooking,gambar
  },
  strict: debug
})
