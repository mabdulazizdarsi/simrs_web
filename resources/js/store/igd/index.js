
import axios from 'axios'
const state = {
  pasien:null
}

export default {
  namespaced: true,
  state,
  getters: {
    // navTicket: state => state.navTicket,
    pasien:state => state.pasien?state.pasien.data_pasien:null,
    data_igd : state => state.pasien,
    pasien_alergi : state => state.pasien.Alergi,
    pasien_exist : state => state.pasien?false:true,

    // (state) {
    //   return state.pasien
    // },
    // pasien_exist(state){
    //   return state.pasien==null?false:true
    // }
  },
  actions: {
   async data_pasien({state,commit},payload){
    let response = await axios.post('/api/post_api',{
      "method":'get_dashboard_data_episode',
      "data":payload,"token":localStorage.getItem('token')
     })
    // console.log(response);
    commit('update_data_pasien', response.data);
    return response.data;
    }
  },
  mutations: {
   update_data_pasien(state,payload){
    state.pasien=payload;
    }
  }
}
