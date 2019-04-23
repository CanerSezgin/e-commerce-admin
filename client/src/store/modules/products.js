import Axios from 'axios'
const baseUrl = 'https://node-shop-ws.herokuapp.com';
import {store} from '../../store'

const errorHandling = {
  unauthorzied: () => {
      store.dispatch('users/logout')
  }
}

function checkErrors(error){
  if(error.response.status === 401 ){
    errorHandling.unauthorzied();
  }
}

const state = {
    products: null,
    product: null
}
const getters = {
    productList(state){
        return state.products
    }
}
const mutations = {
    SET_PRODUCTS(state, products){
        state.products = products;
    },
    SET_PRODUCT(state, product){
        state.product = product
    }
}
const actions = {
    fetchProducts({commit}){
      return new Promise((resolve, reject) => {
        Axios.get(baseUrl + '/products')
        .then(response => {
          commit('SET_PRODUCTS', response.data.products)
          resolve(response)
        })
        .catch(error => {
          checkErrors(error)
          reject(error)
        })
      })
    },
    fetchProduct({commit}, id){
        return new Promise((resolve, reject) => {
          Axios.get(baseUrl + '/products/' + id)
          .then(response => {
            commit('SET_PRODUCT', response.data.product)
            resolve(response)
          })
          .catch(error => {
            checkErrors(error)
            reject(error)
          })
        })
    },
    addProduct({commit}, newProduct){
      return new Promise((resolve, reject) => {
        var bodyFormData = new FormData();
        bodyFormData.set('name', newProduct.name);
        bodyFormData.set('price', newProduct.price);
        bodyFormData.append('productImage', newProduct.productImage); 

        Axios({
          method: 'post',
          url: baseUrl + '/products',
          data: bodyFormData,

            headers: { 
              Authorization: "Bearer " + localStorage.getItem('access_token'),
              'Content-Type': 'multipart/form-data' 
            }
          

          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            checkErrors(error)
            reject(error)
          })

      })
    },
    putProduct({commit}, product){
      return new Promise((resolve, reject) => {
        Axios.patch(baseUrl + '/products/' + product._id, 
        [
          {
            "propName": "name",
            "value": product.name
          },
          {
            "propName": "price",
            "value": product.price
          }
        ],
        {
          headers: { Authorization: "Bearer " + localStorage.getItem('access_token') }
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          checkErrors(error)
          reject(error)
        })
      })
    },
    removeProduct({commit}, product){
      return new Promise((resolve, reject) => {
        Axios.delete(baseUrl + '/products/' + product._id, {
          headers: { Authorization: "Bearer " + localStorage.getItem('access_token') }
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          checkErrors(error)
          reject(error)
        })
      })
    }
}

export default {
    state, getters, mutations, actions, namespaced: true,
}