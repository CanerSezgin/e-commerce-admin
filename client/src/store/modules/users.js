import Axios from 'axios'
const baseUrl = 'https://node-shop-ws.herokuapp.com';

const state = {
    token: localStorage.getItem('access_token') || null,
}
const getters = {
    loggedIn(state){
        return state.token !== null
    },
}
const mutations = {
    SET_TOKEN(state, token){
        state.token = token
    },
}
const actions = {
    retrieveToken({commit}, {email, password}){

        return new Promise((resolve, reject) => {
          Axios.post(baseUrl + '/user/login', {
            email: email,
            password: password 
          })
          .then(response => {
            const token = response.data.token
            localStorage.setItem('access_token', token)
            commit('SET_TOKEN', token)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          });
        })
    },
    logout({commit}){
        commit('SET_TOKEN', null)
        localStorage.removeItem('access_token')
    }
}

export default {
    state, getters, mutations, actions, namespaced: true,
}