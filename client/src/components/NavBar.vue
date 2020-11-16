<template>
    <b-navbar class="navbar navbar-expand-lg navbar-dark bg-primary">
        <b-navbar-brand href='/'>
            <!-- Book Vectors by Vecteezy https://www.vecteezy.com/free-vector/book -->
            <img src='@/assets/logo.png'>
            LibTrade
        </b-navbar-brand>
        <b-collapse is-nav>
            <b-navbar-nav>
                <b-nav-item href='/'>Home</b-nav-item>
                <b-nav-item href='/register'>Register</b-nav-item>
                <b-button v-if="username != ''" v-on:click="logout" style="position:absolute; right:20px; top:20px">Log Out</b-button>
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