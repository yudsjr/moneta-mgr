import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NewTransaction from '@/components/Transaction/NewTransaction'
import SignIn from '@/components/User/SignIn'
import firebase from 'firebase'
import { store } from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
      path: '/user/signin',
      name: 'SignIn',
      component: SignIn
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (currentUser) store.dispatch('setUser', { id: currentUser.uid })
  if (requiresAuth && !currentUser) next({path:'/user/signin'})
  else if (!requiresAuth && currentUser) next({path:'/transaction/new'})
  else next()
})

export default router
