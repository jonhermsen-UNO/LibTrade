<template>
  <div id="loginForm" class="text-center">
    <h1>Login</h1><br>
    <b-form v-on:submit.prevent="login">
      <fieldset class="mx-auto w-100" style="max-width:400px">
      <b-form-group label="Username" label-for="username">
        <b-form-input id="username" v-model="Username" type="text" placeholder="Enter Username"></b-form-input>
      </b-form-group>
      <b-form-group label="Password" label-for="password">
        <b-form-input id="password" v-model="Password" type="password" placeholder="Enter Password"></b-form-input>
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
      Username: '',
      Password: '',
      errorMessage: ''
    }
  },
  mounted: function() {
    this.errorMessage = '';
  },
  methods: {
    login() {
      const data = {
        Username: this.Username,
        Password: this.Password
      }
      if (this.Username == "" || this.Password == "") {
        this.errorMessage = "One or more fields is blank";
      } else {
          axios.post("/api/account/login", data)
            .then((response) => {
              if (response == 'Invalid credentials') {
                this.errorMessage = response;
              } else {
                // use go() to force the page to reload auth state
                this.$router.go(this.$router.push('/listings'));
              }
            })
            .catch((error) => {
              if (error.response.status == 400) this.errorMessage = 'Invalid credentials'
              else this.errorMessage = 'Something went wrong, please try again.'
            })
      }
    }
  }
}
</script>

<style>
</style>
