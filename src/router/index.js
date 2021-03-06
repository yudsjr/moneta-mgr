import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NewTransaction from '@/components/Transaction/NewTransaction'
import SpeedDial from '@/components/Transaction/SpeedDial'
import Home from '@/home/Home'
import SignIn from '@/components/User/SignIn'
import firebase from 'firebase'
import { store } from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/transaction/new',
      name: 'NewTransaction',
      component: NewTransaction,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/transaction/speeddial',
      name: 'SpeedDial',
      component: SpeedDial,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
/*
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (currentUser) store.dispatch('setUser', { id: currentUser.uid })
  if (requiresAuth && !currentUser) next({path:'/user/signin'})
  else if (!requiresAuth && currentUser) next({path:'/home'})
  else next()
})*/

export default router
