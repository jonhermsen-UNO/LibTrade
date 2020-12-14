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
                        {{listing}}
                        <b-modal :id="'modal' + listing.BookListingID" title="Buy Book" ok-title="Purchase" @ok.prevent="purchase(listing)" @hidden="clearData">
                            <b-form-group label="Card Number" label-for="cardnumber">
                            <b-form-input id="cardnumber" v-model="creditCardData.number" type="number"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Name on Card" label-for="cardname">
                            <b-form-input id="cardname" v-model="creditCardData.name" type="text"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Expiration Month" label-for="cardexpMonth">
                            <b-form-select id="cardexpMonth" v-model="creditCardData.expMonth" :options="monthList"></b-form-select>  
                            </b-form-group>
                            <b-form-group label="Expiration Year" label-for="cardexpYear">
                            <b-form-select id="cardexpYear" v-model="creditCardData.expYear" :options="yearList"></b-form-select>  
                            </b-form-group>
                            <b-form-group label="Security Code" label-for="cardcvv">
                            <b-form-input id="cardcvv" v-model="creditCardData.cvv" type="number"></b-form-input>
                            </b-form-group>
                            <p style="color:red; font-weight:bold">{{popupErrorMessage}}</p>
                        </b-modal>
                        <b-button v-if="listing.AccountID == accountID" id="remove" v-on:click="remove(listing)">Remove This Listing</b-button>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
    <div>
</div>
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
import { BModal } from 'bootstrap-vue'
Vue.component('b-modal', BModal)
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
      isbn: '',
      title: '',
      hasSearched: false,
      errorMessage: '',
      popupErrorMessage: '',
      username: null,
      accountID: null,
      creditCardData: {
          number: '',
          name: '',
          expMonth: 0,
          expYear: 0,
          cvv: ''
      },
      monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      yearList: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033]
    }
  },
  methods: {
      search() {
          this.hasSearched = true
          const data = {
              ISBN: this.isbn,
              Title: this.title
          }
          axios.post("api/listing", data)
          .then((response) => { this.listings = response.data; })
          .catch(() => { this.errorMessage = "There was a problem performing your search." })
      },
      remove(listing) {
          const data = {
            AccountID: listing.AccountID,
            BookID: listing.BookID,
            AskingPrice: listing.AskingPrice
          }
          axios.post("api/listing/remove", data)
          .then(() => { this.getListings(); })
          .catch((error) => console.log(error.response));
      },
    purchase(listing) {
        if (this.creditCardData.number == '' || this.creditCardData.name == '' || this.creditCardData.expMonth == 0
        || this.creditCardData.expYear == 0 || this.creditCardData.cvv == '')
        this.popupErrorMessage = 'There is an error with your input'
        else this.remove(listing);
    },
    getListings() {
        axios.post("api/listing")
        .then((response) => { this.listings = response.data; })
      },
    getUserData() {
     axios.get("/api/account")
      .then((response) => { this.username = response.data.Username; this.accountID = response.data.AccountID;})
      .catch((error) => {console.log(error); this.$router.push('/login')})
    },
    clearData() {
        this.creditCardData = {
          number: '',
          name: '',
          expMonth: 0,
          expYear: 0,
          cvv: ''
        };
        this.popupErrorMessage = '';
    }
  }
}
</script>

<style>
</style>