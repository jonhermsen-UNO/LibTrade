<template>
  <div id="app">
    <NavBar v-bind:loggedIn="false"></NavBar>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  }
}
</script>

<style>
html, body {
width: 100%;
}
</style>
