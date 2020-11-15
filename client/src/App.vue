<template>
  <div id="app">
    <NavBar v-bind:loggedIn="false"></NavBar>
    <AccountAdd/>
    <Account/>
    <Footer/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import AccountAdd from './views/AccountAdd.vue'
import Account from './views/Account.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    AccountAdd,
    Account,
    Footer
  }
}
</script>

<style>
</style>
