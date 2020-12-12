import Vue from 'vue'
import Router from 'vue-router'
import Account from '@/views/Account'
import AccountAdd from '@/views/AccountAdd'
import ListingAdd from '@/views/ListingAdd'
import ListingList from '@/views/ListingList'
import Home from '@/views/Home'
import PageNotFound from '@/views/PageNotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Account
    },
    {
      path: '/register',
      name: 'Register',
      component: AccountAdd
    },
    {
      path: '/listings',
      name: 'ListingList',
      component: ListingList
    },
    {
      path: '/listings/add',
      name: 'ListingAdd',
      component: ListingAdd
    },
    {
      path: '*',
      name: '404',
      component: PageNotFound
    }
  ]
})
