<template>
  <b-container class="text-center">
    <h1>{{ msg }}</h1>
  </b-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style>
</style>
