<template>
  <div id="loginForm" class="text-center">
    <h1>Login</h1><br>
    <b-form v-on:submit.prevent="login">
      <fieldset class="mx-auto w-100" style="max-width:400px">
      <b-form-group label="Username" label-for="username">
        <b-form-input id="username" v-model="username" type="text" placeholder="Enter Username"></b-form-input>
      </b-form-group>
      <b-form-group label="Password" label-for="password">
        <b-form-input id="password" v-model="password" type="password" placeholder="Enter Password"></b-form-input>
      </b-form-group>
      <b-button id="loginButton" block variant="minty" type="submit" class="btn btn-primary is-invalid">Login</b-button><br>
      <div style="text-align:center; font-weight:bold;" class="invalid-feedback">{{errorMessage}}</div>
      </fieldset>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import Vue from 'vue';
import { ButtonPlugin } from 'bootstrap-vue'
Vue.use(ButtonPlugin)
import { FormPlugin } from 'bootstrap-vue'
Vue.use(FormPlugin)
import { BFormInput } from 'bootstrap-vue'
Vue.component('b-form-input', BFormInput)
import { BFormGroup } from 'bootstrap-vue'
Vue.component('b-form-group', BFormGroup)
export default {
  name: 'Account',
  data: function() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  mounted: function() {
    this.errorMessage = '';
  },
  methods: {
    async login() {
      const data = {
        username: this.username,
        password: this.password
      }
      if (this.username == "" || this.password == "") this.errorMessage = "One or more fields is blank"
      else { 
          axios.post("/auth/google/redirect", data)
          .then(this.$router.go('-1'))
          .catch(this.errorMessage = "Invalid credentials")
      }
    }
  }
}
</script>

<style>
</style>
