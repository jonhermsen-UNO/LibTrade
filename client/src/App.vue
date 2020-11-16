<template>
  <div id="app">
    <NavBar v-bind:username="username"></NavBar>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import axios from "axios"
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
  data: function() {
    return {
      username: ''
    }
  },
  mounted: function() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      axios.get("/api/user")
      .then((response) => self.$set(this, "username", response.data.user))
      .catch((error) => console.log(error))
    }
  }
}
</script>

<style>
html, body {
width: 100%;
}
</style>
