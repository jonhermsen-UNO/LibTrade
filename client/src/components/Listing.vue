<template>
    <div>
        <b-button variant="info" class="float-right">Buy ${{listingData.AskingPrice.toFixed(2)}}</b-button>
        <Book :id=listingData.BookID></Book><br>
    </div>
</template>

<script>
import Book from '../components/Book.vue'
import Vue from 'vue'
import { ButtonPlugin } from 'bootstrap-vue'
Vue.use(ButtonPlugin)
export default {
  name: 'Listing',
  components: {
      Book
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