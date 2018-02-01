<template>
  <v-container fluid grid-list-xl>

    <v-layout row justify-space-center>
      <v-flex xs2 offset-xs2>
        <v-btn block color="primary" dark>1</v-btn>
      </v-flex>
      <v-flex xs2 offset-xs1>
        <v-btn block color="primary" dark>2</v-btn>
      </v-flex>
      <v-flex xs2 offset-xs1>
        <v-btn block color="primary" dark>3</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
export default {
  data () {
    return {
      // date
      date: null,
      dateFormatted: moment(new Date().format('L')),
      menu: false
    }
  },

  methods: {
    // Date
    formatDate (date) {
      if (!date) {
        return null
      }
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) {
        return null
      }
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, 0)}-${day.padStart(2, 0)}`
    }
  },

  computed: {
    user () {
      return this.$store.getters.user
    },
    firebaseUser () {
      return firebase.auth().currentUser
    }
  },

  created: function () {
    this.date = this.parseDate(this.dateFormatted)

  }

}
</script>
