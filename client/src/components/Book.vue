<template>
    <div>
        <b-row>
            <b-col cols="12" sm="4" class="text-center text-sm-right">
                <b-img v-if="bookData.ThumbnailURL" :src=bookData.ThumbnailURL fluid/>
            </b-col>
            <b-col cols="12" sm="8" class="text-left">
                <h2 v-if="bookData.Title" class="text-primary">{{bookData.Title}}</h2>
                <div v-if="bookData.Publisher && bookData.PublishYear" class="lead">{{bookData.Publisher}}, {{bookData.PublishYear}}</div>
                <div>{{bookData.Authors}}</div>
                <div v-if="bookData.ISBN10 && bookData.ISBN13">ISBN: {{bookData.ISBN10}} / {{bookData.ISBN13}}</div>
                <div v-if="bookData.RetailPrice && bookData.RetailPrice > 0">Retail: ${{bookData.RetailPrice}}</div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue';
import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)
export default {
  name: 'Book',
  data: function() {
    return {
        bookData: {}
    }
  },
  created () {
      axios.get(`/api/listing/book/${this.id}`)
      .then((response) => { this.bookData = response.data })
  },
  props: {
      id: String
  }
}
</script>

<style>
</style>