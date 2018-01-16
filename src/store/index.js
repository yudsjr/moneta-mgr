import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
            router.push('/transactions/new')
          })
        .catch(
          error => {
            console.log(error)
      });
    },
    setUser ({commit}, payload) {
      commit('setUser', payload)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
})
