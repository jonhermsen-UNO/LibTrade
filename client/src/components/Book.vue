<template>
    <div>
        <b-row>
            <b-col cols="4" class="text-right">
                <b-img :src=bookData.ThumbnailURL fluid/>
            </b-col>
            <b-col cols="8" class="text-left">
                <h2 class="text-primary">{{bookData.Title}}</h2>
                <div class="lead">{{bookData.Publisher}}, {{bookData.PublishYear}}</div>
                <div>{{bookData.Author}}<br>
                ISBN: {{bookData.ISBN10}} / {{bookData.ISBN13}}<br>
                Retail: ${{bookData.RetailPrice.toFixed(2)}}</div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
//import axios from 'axios'
import Vue from 'vue';
import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)
export default {
  name: 'Book',
  data: function() {
    return {
       // bookData: axios.get("/api/listing/book/" + this.id)
        bookData: {
            "BookID": "Lj-4ZUY4QQsC",
            "CacheDate": "2020-11-18",
            "PublishYear": 2005,
            "Publisher": "Cengage Learning",
            "Title": "Calculus",
            "Author": "Ron Larson, Robert P. Hostetler, Bruce Edwards",
            "ISBN10": "061850298X",
            "ISBN13": "9780618502981",
            "RetailPrice": 12.90,
            "ThumbnailURL": "https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
        }
    }
  },
  props: {
      id: String
  }
}
</script>

<style>
</style>