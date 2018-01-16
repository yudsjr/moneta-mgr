<template>
  <v-select
    v-bind:items="categories"
    v-model="a1"
    label="Category"
    autocomplete
  ></v-select>
</template>

<script>
export default {
  data () {
    return {
      a1: null,
      categories: [
        'Food', 'Gas', 'House', 'Parking'
      ]
    }
  }
}
</script>
