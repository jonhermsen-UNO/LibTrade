<template>
  <div>
    <h1>Login</h1><br>
    <form>
      <fieldset>
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="username" type="text" class="form-control" id="username" placeholder="Enter Username"/><br>
          <label for="password">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter Password"/><br>
          <div>
            <button style="width:400px;" v-on:click="login" type="submit" class="btn btn-primary is-invalid">Login</button><br>
            <div style="text-align:center; font-weight:bold;" class="invalid-feedback">{{errorMessage}}</div>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data: function() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    login() {
      // Call API that verifies email and password
      this.errorMessage = "Invalid credentials";
      this.$router.push('/');
    }
  }
}
</script>

<style>
</style>
