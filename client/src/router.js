import Vue from 'vue'
import Router from 'vue-router'
import Account from '@/views/Account'
import AccountAdd from '@/views/AccountAdd'
import HelloWorld from '@/views/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld,
      props: {
        msg: "Hello World!"
      }
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
    }
  ]
})
