import Vue from 'vue'
import Router from 'vue-router'
import Account from '@/views/Account'
import AccountAdd from '@/views/AccountAdd'
import TextbookDetails from '@/views/TextbookDetails'
import TextbookSearch from '@/views/TextbookSearch'
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
      path: '/textbookDetails',
      name: 'TextbookDetails',
      component: TextbookDetails
    },
    {
      path: '/textbookSearch',
      name: 'TextbookSearch',
      component: TextbookSearch
    },
    {
      path: '*',
      name: '404',
      component: PageNotFound
    } 
  ]
})
