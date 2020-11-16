<template>
    <b-navbar class="navbar navbar-expand-lg navbar-dark bg-primary">
        <p><b-img thumbnail src='../assets/temp-logo.png' width='40' height='40'></b-img></p>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <b-collapse is-nav>
            <b-navbar-nav>
                <b-nav-item href='/'>Home</b-nav-item>
                <b-nav-item href='/register'>Register</b-nav-item>
                <b-button v-if="loggedIn" v-on:click="logout" style="position:absolute; right:20px; top:20px">Log Out</b-button>
                <b-button v-else href='/login' style="position:absolute; right:20px; top:20px">Log In</b-button>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
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