<template>
    <b-navbar toggleable='lg' type='dark' variant='primary'>
        <b-navbar-brand href='/'>
            <!-- Book Vectors by Vecteezy https://www.vecteezy.com/free-vector/book -->
            <img src='@/assets/logo.png'>
            LibTrade
        </b-navbar-brand>
        <b-navbar-toggle target='nav-main'></b-navbar-toggle>
        <b-collapse id='nav-main' is-nav>
            <b-navbar-nav>
                <b-nav-item id="home" href='/'>Home</b-nav-item>
                <b-nav-item v-if="Username == null" id="register" href='/register'>Register</b-nav-item>
                <b-nav-item id="listings" href='/listings'>Book Listings</b-nav-item>
                <b-nav-item id="addListing" href='/listings/add'>Add Listing</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class='ml-auto'>
                <b-button v-if="Username != null" id="logout" v-on:click="logout" style="position:absolute; right:20px; top:20px">Log Out</b-button>
                <b-button v-else id="login" href='/login'>Log In</b-button>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import axios from "axios";
import Vue from 'vue';
import { ButtonPlugin } from 'bootstrap-vue'
Vue.use(ButtonPlugin)
import { NavbarPlugin } from 'bootstrap-vue'
Vue.use(NavbarPlugin)
import { ImagePlugin } from 'bootstrap-vue'
Vue.use(ImagePlugin)
export default {
    name: 'NavBar',
    props: {
        Username: String
    },
    methods: {
        logout() {
            const data = {
                Username: this.Username,
            }
            axios.post("/api/account/logout", data)
            .then(this.Username = null);
        },
        login() {
            this.$router.push('/login');
        }
    }
}
</script>

<style>

</style>