<template>
    <b-container style="max-width:400px" class="text-center mx-auto-w-100" fluid="lg">
        <b-form v-on:submit.prevent="onSubmit">
            <h1>Add Listing</h1><br>
            <p style="color:red; font-weight:bold;" v-if="errorMessage != ''">{{errorMessage}}</p>
            <div label="Look Up Book" label-for="isbn">
                <div class="input-group">
                    <input id="isbn" class="form-control" v-model="isbn" type="text" placeholder="Enter ISBN"/>
                    <div class="input-group-append">
                        <b-btn id="search" v-on:click="searchBook">Look Up</b-btn>
                    </div>
                </div>
            </div>
            <br><Book v-if="book.BookID" :id="book.BookID"></Book><br>
            <b-form-group label="Asking Price" label-for="askingprice">
                <b-form-input id="askingprice" v-model="askingprice" type="number" step="any" placeholder="Enter Price"></b-form-input>
            </b-form-group>
            <b-button id="submit" block variant="minty" type="submit" class="btn btn-primary">Submit</b-button>
        </b-form>
    </b-container>
</template>

<script>
import Book from '../components/Book'
import axios from 'axios'
export default {
  name: 'ListingAdd',
  components: {
      Book
  },
  data: function() {
      return {
          askingprice: '',
          isbn: '',
          errorMessage: '',
          book: {},
          username: null,
          AccountID: null
    }
  },
    mounted: function() {
    this.getUserData();
  },
  methods: {
      onSubmit() {
        if (!this.book.BookID || this.askingprice <= 0 || this.errorMessage != '') this.errorMessage = "There is an issue with your input."
        else {
            let data = {
                BookID: this.book.BookID,
                AskingPrice: this.askingprice,
                AccountID: this.AccountID
            }
            axios.post("/api/listing/create", data)
            .then(this.$router.push('/listings'))
            .catch(this.errorMessage = "There was a problem adding your listing.")
        }
      },
    searchBook() {
          let data = {
              ISBN: this.isbn
          }
          axios.post("/api/listing/book", data)
          .then((response) => { this.book = response.data })
          .catch(() => {
              this.errorMessage = "Could not find book with that ISBN.";
              this.book = {}
          })
      },
    getUserData() {
      axios.get("/api/account")
      .then((response) => {this.username = response.data.Username; this.AccountID = response.data.AccountID})
      .catch(() => { this.$router.push('/login') })
    }
  }
}
</script>

<style>
</style>