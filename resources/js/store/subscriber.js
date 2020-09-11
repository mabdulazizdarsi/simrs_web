import store from '../store'
import axios from 'axios'
store.subscribe((mutation) => {
switch(mutation.type){
    case 'auth/SET_TOKEN':{
        if(mutation.payload){
            localStorage.setItem('token',mutation.payload)
            axios.defaults.headers.common['Authorization'] = 'Bearer '+mutation.payload
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

        }
        else{
            localStorage.removeItem('token')
            axios.defaults.headers.common['Authorization'] = null
        }
        break;
    }
}
})