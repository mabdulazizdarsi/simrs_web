
import axios from 'axios'
const state = {
  assesment1_img1:null
}

export default {
  namespaced: true,
  state,
  getters: {
    assesment1:state => state.assesment1_img1,
  },
  actions: {
   save_gambar({state,commit},payload){
    commit('update_gambar', payload);
    }
  },
  mutations: {
   update_gambar(state,payload){
     if(payload.item=="assesment1_img1")
    state.assesment1_img1=payload.data;
    }
  }
}
