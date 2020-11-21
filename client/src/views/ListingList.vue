<template>
    <div>
    <b-container fluid="lg">
        <b-row>
            <b-col cols="12" lg="4"></b-col>
            <b-col cols="12" lg="8">
                <b-list-group>
                    <b-list-group-item v-for="listing in listings" :key="listing">
                        <Listing :listingData="listing"></Listing>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
    </div>
</template>

<script>
import Listing from '../components/Listing.vue'
// import axios from 'axios'
export default {
  name: 'ListingList',
  components: {
      Listing
  },
  data: function() {
      return {
          listings: [
              // axios.get("api/listing")
          {
              "BookListingID": 15,
              "AccountID": 2,
              "BookID": "Lj-4ZUY4QQsC",
              "AskingPrice": 9.80
          },
          {
            "BookListingID": 10,
            "AccountID": 2,
            "BookID": "Lj-4ZUY4QQC",
            "AskingPrice": 10.23
          },
          {
            "BookListingID": 12,
            "AccountID": 2,
            "BookID": "LjUY4QQsC",
            "AskingPrice": 104.99
          }
      ]
    }
  }
}
</script>

<style>
</style>