<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <p><a href="#"><img src='../assets/temp-logo.png' width='40' height='40'></a></p>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <router-link to="/"  class="nav-link" exact>Home</router-link>
        </li>
        <li class="nav-item">
            <a v-if="loggedIn" class="nav-link" href="/account">Account</a>
            <a v-else class="nav-link" href="/register">Register</a>
        </li>
        <button v-if="loggedIn" v-on:click="logout" style="position:absolute; right:20px; top:20px" type="button" class="btn btn-secondary">Log Out</button>
        <button v-else v-on:click="login" style="position:absolute; right:20px; top:20px" type="button" class="btn btn-secondary">Log In</button>
        </ul>
    </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    props: {
        loggedIn: Boolean

    },
    methods: {
        logout() {
            // Call logout API
        },
        login() {
            this.$router.push('login');
        }
    }
}
</script>

<style>

</style>