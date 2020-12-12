<template>
    <div>
        <b-button id="buy" v-b-modal="'modal' + listingData.BookListingID" variant="info" class="float-right">Buy ${{listingData.AskingPrice}}</b-button>
        <Book :id=listingData.BookID></Book><br>
    </div>
</template>

<script>
import Book from '../components/Book.vue'
import Vue from 'vue'
import { ButtonPlugin } from 'bootstrap-vue'
Vue.use(ButtonPlugin)
import { VBModal } from 'bootstrap-vue'
Vue.component('v-b-modal', VBModal)
export default {
  name: 'Listing',
  components: {
      Book
  },
  directives: { 
    'b-modal': VBModal 
  },
  props: {
    listingData: {
        "BookListingID": Number,
        "AccountID": Number,
        "BookID": String,
        "AskingPrice": Number
    }
  }
}
</script>

<style>
</style>