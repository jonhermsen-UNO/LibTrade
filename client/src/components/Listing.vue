<template>
    <div>
        <b-button variant="info" class="float-right">Buy ${{listingData.AskingPrice.toFixed(2)}}</b-button>
        <Book :id=listingData.BookListingID></Book>
    </div>
</template>

<script>
import Book from '../components/Book.vue'
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