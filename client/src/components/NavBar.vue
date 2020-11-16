<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <p><img src='../assets/temp-logo.png' width='40' height='40'></p>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <router-link to="/"  class="nav-link" exact>Home</router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/register">Register</a>
            </li>

            <!-- <li class="nav-item dropdown" style="position:absolute; right:20px; top:20px">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" href="/" aria-haspopup="true" aria-expanded="false">User</a>
                <div class="dropdown-menu" aria-labelledby="options">
                    <a v-if="loggedIn" v-on:click="logout" class="dropdown-item" href="/">Log Out</a>
                    <a v-else class="dropdown-item" href="/account">Log In</a>
                </div>
            </li> -->
            <button v-if="loggedIn" v-on:click="logout" style="position:absolute; right:20px; top:20px" type="button" class="btn btn-secondary">Log Out</button>
            <button v-else v-on:click="login" style="position:absolute; right:20px; top:20px" type="button" class="btn btn-secondary">Log In</button>
        </ul>
    </div>
    </nav>
</template>

<script>
import axios from "axios";
export default {
    name: 'NavBar',
    props: {
        loggedIn: Boolean,
        username: String
    },
    methods: {
        logout() {
            const data = {
                username: this.username,
            }
            axios.post("/api/account/logout", data);
        },
        login() {
            this.$router.push('login');
        }
    }
}
</script>

<style>

</style>