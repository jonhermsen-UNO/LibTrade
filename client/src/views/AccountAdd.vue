<template>
  <div id="registerForm" class="text-center">
    <h1>Register</h1><br>
    <b-form v-on:submit.prevent="register">
    <fieldset class="mx-auto w-100" style="max-width:400px">
      <b-form-group label="Username" label-for="username">
        <b-form-input v-if="username==''" id="username" v-model="username" type="text" placeholder="Enter username"></b-form-input>
        <b-form-input v-else-if="uniqueUsername(username)" id="username" class="is-valid" v-model="username" type="text" placeholder="Enter username"></b-form-input>
        <b-form-input v-else id="username" class="is-invalid" v-model="username" type="text" placeholder="Enter username"></b-form-input>
        <div class="valid-feedback">Username is available</div>
        <div class="invalid-feedback">Username is already in use</div>
      </b-form-group>
      <b-form-group label="Email Address" label-for="email">
        <b-form-input v-if="email==''" id="email" v-model="email" type="email" placeholder="Enter email"></b-form-input>
        <b-form-input v-else-if="emailUnique(email) && emailValid(email)" id="email" class="is-valid" v-model="email" type="email" placeholder="Enter email"></b-form-input>
        <b-form-input v-else id="email" class="is-invalid" v-model="email" type="email" placeholder="Enter email"></b-form-input>
        <div class="valid-feedback">Email is available</div>
        <div class="invalid-feedback">Email is already in use or is invalid</div>      
      </b-form-group>
      <b-form-group label="Verify Email" label-for="verifyEmail">
        <b-form-input v-if="verifyEmail==''" id="verifyEmail" v-model="verifyEmail" type="email" placeholder="Verify email"></b-form-input>
        <b-form-input v-else-if="emailsMatch(email, verifyEmail)" id="verifyEmail" class="is-valid" v-model="verifyEmail" type="email" placeholder="Verify email"></b-form-input>
        <b-form-input v-else id="verifyEmail" class="is-invalid" v-model="verifyEmail" type="email" placeholder="Verify email"></b-form-input>      
        <div class="valid-feedback">Emails match</div>
        <div class="invalid-feedback">Emails do not match</div>
      </b-form-group>   
      <b-form-group label="Password" label-for="password">
        <b-form-input v-if="password != '' && passwordsMatch(password, verifyPassword)" id="password" class="is-valid" v-model="password" type="password" placeholder="Enter password"></b-form-input>
        <b-form-input v-else id="password" v-model="password" type="password" placeholder="Enter password"></b-form-input>
        <div class="valid-feedback">Passwords match</div>
      </b-form-group>      
      <b-form-group label="Verify Password" label-for="verifyPassword">
        <b-form-input v-if="verifyPassword==''" id="verifyPassword" v-model="verifyPassword" type="password" placeholder="Verify password"></b-form-input>
        <b-form-input v-else-if="passwordsMatch(password, verifyPassword)" id="verifyPassword" class="is-valid" v-model="verifyPassword" type="password" placeholder="Verify password"></b-form-input>
        <b-form-input v-else id="verifyPassword" class="is-invalid" v-model="verifyPassword" type="password" placeholder="Verify password"></b-form-input>
        <div class="valid-feedback">Passwords match</div>
        <div class="invalid-feedback">Passwords do not match</div>      
      </b-form-group>    
      <b-form-group label="Select College" label-for="college">
        <b-form-select id="college" v-model="college" :options="collegeList" value-field="CollegeID"></b-form-select>  
      </b-form-group>
      <b-form-group v-if="college=='Other'" label="Enter College" label-for="enterCollege">
        <b-form-input id="enterCollege" type="text" placeholder="Enter College Name"></b-form-input>
      </b-form-group>
      <b-button block variant="minty" type="submit" class="btn btn-primary is-invalid">Register</b-button>
      <div style="text-align:center; font-weight:bold;" class="invalid-feedback">{{errorMessage}}</div><br>
    </fieldset>
    </b-form>
  </div>
</template>

<script>
import axios from "axios"
import Vue from 'vue';
import { ButtonPlugin } from 'bootstrap-vue'
Vue.use(ButtonPlugin)
import { FormPlugin } from 'bootstrap-vue'
Vue.use(FormPlugin)
import { BFormInput } from 'bootstrap-vue'
Vue.component('b-form-input', BFormInput)
import { BFormGroup } from 'bootstrap-vue'
Vue.component('b-form-group', BFormGroup)
import { BFormSelect } from 'bootstrap-vue'
Vue.component('b-form-select', BFormSelect)
export default {
  name: 'AccountAdd',
  created: function() {
    // axios.get("/api/account/colleges").then((response) => this.collegeList = response.data)
  },
  data: function() {
    return {
      usernameTakenMessage: 'Username is already in use',
      emailNotValidMessage: 'Please enter a valid email',
      emailTakenMessage: 'An account already exists with this email address',
      emailsNotMatchedMessage: 'Emails do not match',
      passwordsNotMatchedMessage: 'Passwords do not match',
      collegeList: [],
      username: '',
      email: '',
      verifyEmail: '',
      password: '',
      verifyPassword: '',
      college: '',
      errorMessage: '',
    }
  },
  mounted: function() {
    this.getColleges();
  },
  methods: {
    uniqueUsername(username) {
      return username != '';
    },
    emailValid(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    emailUnique(email) {
      return email != '';
    },
    emailsMatch(email, verifyEmail) {
     return email.localeCompare(verifyEmail) == 0;
    },
    passwordsMatch(password, verifyPassword) {
      return password.localeCompare(verifyPassword) == 0;
    },
    async register() {
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
        college: this.college
      }
        if (this.uniqueUsername(this.username) && this.emailValid(this.email) && this.emailUnique(this.email) 
        && this.emailsMatch(this.email, this.verifyEmail) && this.passwordsMatch(this.password, this.verifyPassword)) {
          axios.post("/api/account/register", data)
          .then(axios.post("/auth/google/redirect", data))
          .then(this.$router.go('-1'))
          .catch(this.errorMessage = "There was a problem creating your account.")
        }
        else {
          this.errorMessage = "One or more fields is blank or you have an error with your input";
        }
    },
    getColleges() {
      axios
        .get('/api/account/colleges')
        .then((response) => {
          if (response.data) response.data.map(obj => {
            obj.text = `${ obj.State } - ${ obj.Name }`;
          });
          this.collegeList = response.data;
        })
        .catch((error) => (console.log(error)))
    }
  }
}
</script>

<style>
</style>
