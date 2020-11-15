<template>
  <div>
    <h1>Register</h1><br>
    <form>
    <fieldset>
      <div class="form-group">
        <div>
        <label for="username">Username</label>
        <input v-if="username==''" v-model="username" type="text" class="form-control" id="username" placeholder="Enter username">
        <input v-else-if="uniqueUsername(userName)" v-model="username" type="text" class="form-control is-valid" id="username" placeholder="Enter username">
        <input v-else v-model="username" type="text" class="form-control is-invalid" id="username" placeholder="Enter username">
        <div class="valid-feedback">Username is available</div>
        <div class="invalid-feedback">Username is already in use</div><br>
        </div>
        <div>
        <label for="email">Email address</label>
        <input v-if="email==''" v-model="email" type="text" class="form-control" id="email" placeholder="Enter email">
        <input v-else-if="emailUnique(email) && emailValid(email)" v-model="email" type="text" class="form-control is-valid" id="email" placeholder="Enter email">
        <input v-else v-model="email" type="text" class="form-control is-invalid" id="email" placeholder="Enter email">
        <div class="valid-feedback">Email is available</div>
        <div class="invalid-feedback">Email is already in use or is invalid</div><br>
        </div>
        <div>
        <label for="verifyEmail">Verify Email</label>
        <input v-if="verifyEmail==''" v-model="verifyEmail" type="text" class="form-control" id="verifyEmail" placeholder="Verify email">
        <input v-else-if="emailsMatch(email, verifyEmail)" v-model="verifyEmail" type="text" class="form-control is-valid" id="verifyEmail" placeholder="Verify email">
        <input v-else v-model="verifyEmail" type="text" class="form-control is-invalid" id="verifyEmail" placeholder="Verify email">
        <div class="valid-feedback">Emails match</div>
        <div class="invalid-feedback">Emails do not match</div><br>
        </div>
        <div>
        <label for="password">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" placeholder="Password"><br>
        <label for="verifyPassword">Verify Password</label>
        <input v-if="verifyPassword==''" v-model="verifyPassword" type="password" class="form-control" id="verifyPassword" placeholder="Verify password">
        <input v-else-if="passwordsMatch(password, verifyPassword)" v-model="verifyPassword" type="password" class="form-control is-valid" id="verifyPassword" placeholder="Verify password">        
        <input v-else v-model="verifyPassword" type="password" class="form-control is-invalid" id="verifyPassword" placeholder="Verify password">
        <div class="valid-feedback">Passwords match</div>
        <div class="invalid-feedback">Passwords do not match</div><br>        
        </div>
        <div>
        <label for="college">Select College</label>
        <select class="form-control" v-model="college" id="college">
          <option v-for="college in colleges" :key="college.name">{{college.name}}</option>
        </select><br>
        </div>
        <div v-if="college=='Other'">
          <label for="enterCollege">Enter College</label>
          <input type="text" class="form-control" id="enterCollege" placeholder="Enter College Name"><br>
        </div>
        <div>
        <button style="width:400px;" v-on:click="register" type="submit" class="btn btn-primary is-invalid">Create Account</button><br>
        <div style="text-align:center; font-weight:bold;" class="invalid-feedback">{{errorMessage}}</div>
        </div>
      </div>
    </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AccountAdd',
  data: function() {
    return {
      usernameTakenMessage: 'Username is already in use',
      emailNotValidMessage: 'Please enter a valid email',
      emailTakenMessage: 'An account already exists with this email address',
      emailsNotMatchedMessage: 'Emails do not match',
      passwordsNotMatchedMessage: 'Passwords do not match',
      // Fake data for now
      colleges: [
        {name: 'University of Nebraska at Omaha', id: 1},
        {name: 'Iowa State', id: 2},
        {name: 'Other', id: 3}
      ],
      username: '',
      email: '',
      verifyEmail: '',
      password: '',
      verifyPassword: '',
      college: '',
      errorMessage: '',
    }
  },
  methods: {
    uniqueUsername(username) {
      return username != '';
    },
    emailValid(email) {
      return email.includes('@');
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
    register() {
        if (this.uniqueUsername(this.username) && this.emailValid(this.email) && this.emailUnique(this.email) 
        && this.emailsMatch(this.email, this.verifyEmail) && this.passwordsMatch(this.password, this.verifyPassword)) {
          // Call register account logic if there are no errors
          this.$router.push('/');
        }
        else {
          this.errorMessage = "One or more fields is blank"
        }
    }

  }
}
</script>

<style>
  h1 {
   text-align: center;
  }
  fieldset {
    width: 400px;
    margin: auto;
  }
  label {
    width: 400px;
    text-align: center;
  }
  input {
    width: 400px;
  }
  input[type="text"]::placeholder {
    text-align:center;
  }
  input[type="email"]::placeholder {
    text-align:center;
  }
  input[type="password"]::placeholder {
    text-align:center;
  }
  select {
    width: 400px;
  }
</style>
