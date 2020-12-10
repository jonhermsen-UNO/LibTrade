<template>
    <div>
    <b-container fluid="lg">
        <b-row>
            <b-col cols="12" lg="4">
                <b-alert v-if="!hasSearched" variant="secondary" show>Please search for a book</b-alert>
                <b-card class="w-100 mb-2">
                    <b-form v-on:submit.prevent="search">
                        <fieldset class="mx-auto w-100" style="max-width:400px">
                            <b-form-input v-model="isbn" type="text" placeholder="ISBN"></b-form-input>
                            <br><b-form-input v-model="title" type="text" placeholder="Title"></b-form-input>
                            <br>
                            <b-button id="search" style="float:right;" type="submit" class="btn btn-primary">Search</b-button>
                            <p style="color:red; font-weight:bold;">{{errorMessage}}</p>
                        </fieldset>
                    </b-form>
                </b-card>
            </b-col>
            <b-col cols="12" lg="8">
                <b-alert v-if="listings.length==0" variant="danger" show>No Results Found.</b-alert>
                <b-list-group>
                    <b-list-group-item v-for="listing in listings" :key="listing.BookListingID">
                        <Listing :listingData="listing"></Listing>
                        <b-button v-if="listing.AccountID == accountID" id="remove" v-on:click="remove(listing)">Remove This Listing</b-button>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
    </div>
</template>

<script>
import Listing from '../components/Listing.vue'
import Vue from 'vue'
import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)
import { BListGroup, BListGroupItem } from 'bootstrap-vue'
Vue.component('b-list-group', BListGroup)
Vue.component('b-list-group-item', BListGroupItem)
import { CardPlugin } from 'bootstrap-vue'
Vue.use(CardPlugin)
import { AlertPlugin } from 'bootstrap-vue'
Vue.use(AlertPlugin)
import { ImagePlugin } from 'bootstrap-vue'
Vue.use(ImagePlugin)
import axios from 'axios'
export default {
  name: 'ListingList',
  components: {
      Listing
  },
    mounted: function() {
    this.getUserData();
    this.getListings();
  },
  data: function() {
      return {
          listings: [],
    //       listings: [
    //       {
    //           "BookListingID": 15,
    //           "AccountID": 2,
    //           "BookID": "Lj-4ZUY4QQsC",
    //           "AskingPrice": 9.80
    //       },
    //       {
    //         "BookListingID": 10,
    //         "AccountID": 2,
    //         "BookID": "Lj-4ZUY4QQC",
    //         "AskingPrice": 10.23
    //       },
    //       {
    //         "BookListingID": 12,
    //         "AccountID": 2,
    //         "BookID": "LjUY4QQsC",
    //         "AskingPrice": 1.99
    //       }
    //   ],
      isbn: '',
      title: '',
      hasSearched: false,
      errorMessage: '',
      username: null,
      accountID: null
    }
  },
  methods: {
      search() {
          this.hasSearched = true
          const data = {
              ISBN: this.isbn,
              Title: this.title
          }
          this.listings = axios.get("api/listing", data)
          .catch(this.errorMessage = "There was a problem performing your search.")
      },
      remove(listing) {
          const data = {
              BookListingID: listing.BookListingID
          }
          axios.post("api/listing/remove", data)
          .then(this.getListings())
          .catch((error) => console.log(error));
      },
      getListings() {
          axios.post("api/listing")
        .then((response) => this.listings = response.data)
        .catch((error) => console.log(error));
      },
    getUserData() {
      axios.get("/api/account")
      .then((response) => { this.username = response.data.Username; this.accountID = response.data.AccountID;})
      .catch((error) => {console.log(error); this.$router.push('/login')})
    }
  }
}
</script>

<style>
</style>