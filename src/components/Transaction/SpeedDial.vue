<template>
  <v-container fluid grid-list-xs>
    <v-layout row justify-space-center>
      <v-flex xs10 offset-xs1
        sm6 offset-sm3 left>
        <h1>New Transaction</h1>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-center>
      <v-flex xs10 offset-xs1 sm6 offset-sm3 center>
        <v-menu
          lazy
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            label="Transaction Date"
            v-model="dateFormatted"
            prepend-icon="event"
            @blur="date = parseDate(dateFormatted)"
          ></v-text-field>
          <v-date-picker v-model="date" @input="dateFormatted = formatDate($event)" no-title scrollable actions>
            <template slot-scope="{ save, cancel }">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                <v-btn flat color="primary" @click="save">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>


    <v-layout row justify-space-center class="pb-5">
      <v-flex xs2 offset-xs2>
        <v-btn block color="primary" dark large style="height: 200%">1</v-btn>
      </v-flex>
      <v-flex xs2 offset-xs1>
        <v-btn block color="primary" dark large style="height: 200%">2</v-btn>
      </v-flex>
      <v-flex xs2 offset-xs1>
        <v-btn block color="primary" dark large style="height: 200%">3</v-btn>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>
    <v-layout row justify-space-center class="pb-5">
      <v-flex xs2 offset-xs2>
        <v-btn block color="primary" dark large style="height: 200%">4</v-btn>
      </v-flex>
      <v-flex xs2 offset-xs1>
        <v-btn block color="primary" dark large style="height: 200%">5</v-btn>
      </v-flex>
      <v-flex xs2 offset-xs1>
        <v-btn block color="primary" dark large style="height: 200%">6</v-btn>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>
    <v-layout row justify-space-center class="pb-5">
      <v-flex xs2 offset-xs2>
        <v-btn block color="primary" dark large style="height: 200%">7</v-btn>
      </v-flex>
      <v-flex xs2 offset-xs1>
        <v-btn block color="primary" dark large style="height: 200%">8</v-btn>
      </v-flex>
      <v-flex xs2 offset-xs1>
        <v-btn block color="primary" dark large style="height: 200%">9</v-btn>
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
