// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import colors from 'vuetify/es5/util/colors'
import firebase from 'firebase'

import App from './App'
import router from './router'

import { store } from './store'

Vue.use(Vuetify, {
  theme: {
    primary: colors.cyan.darken2,
    secondary: colors.cyan.lighten1
  }
})

Vue.config.productionTip = false

let app
firebase.initializeApp({
  apiKey: "AIzaSyAXvEOysrvzt2DAXS7VsaK71DmzumhbSN8",
  authDomain: "moneta-mm.firebaseapp.com",
  databaseURL: "https://moneta-mm.firebaseio.com",
  projectId: "moneta-mm",
  storageBucket: "",
  messagingSenderId: "531015139918"
})
firebase.auth().onAuthStateChanged(function (user) {
  if(!app) {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App }
    })
  }
})
