<template>
    <div>
    <b-container fluid="lg">
        <b-row>
            <b-col cols="12" lg="4"></b-col>
            <b-col cols="12" lg="8">
                <b-list-group>
                    <b-list-group-item v-for="listing in listings" :key="listing.BookListingID">
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
import Vue from 'vue'
import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)
import { BListGroup, BListGroupItem } from 'bootstrap-vue'
Vue.component('b-list-group', BListGroup)
Vue.component('b-list-group-item', BListGroupItem)
import { ImagePlugin } from 'bootstrap-vue'
Vue.use(ImagePlugin)
import axios from 'axios'
export default {
  name: 'ListingList',
  components: {
      Listing
  },
  data: function() {
      return {
        listings: []
      }
  },
  mounted () {
      axios.get('http://localhost:8001/api/listing')
      .then((response) => {
          this.listings = response.data
      })
  }
}
</script>

<style>
</style>