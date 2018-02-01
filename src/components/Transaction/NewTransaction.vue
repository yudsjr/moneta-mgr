<template>
  <v-container fluid itemsgrid-list-xl elevation-3>
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

    <v-layout row justify-space-center>
      <v-flex xs10 offset-xs1 sm6 offset-sm3 center>
        <v-select
          :items="accounts"
          v-model="account"
          label="Account"
          autocomplete
        ></v-select>
      </v-flex>
    </v-layout>

    <v-layout row justify-space-center>
      <v-flex xs10 offset-xs1 sm6 offset-sm3 center>
        <v-select
          :items="categories"
          v-model="category"
          label="Category"
          autocomplete
        ></v-select>
      </v-flex>
    </v-layout>

    <v-layout row justify-space-center>
      <v-flex xs10 offset-xs1 sm6 offset-sm3 center>
        <v-text-field
          label="Amount"
          v-model="amount"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row justify-space-center>
      <v-flex xs10 offset-xs1 sm6 offset-sm3 center>
        <v-select
          v-model="tags"
          label="Tags"
          chips
          tags
          clearable
          solo
          :items="tagItems"></v-select>
      </v-flex>
    </v-layout>

    <v-layout row justify-space-center mt-3>
      <v-flex xs10 offset-xs1 sm6 offset-sm3 center>
        <v-btn
          color="primary"
          @click="submit"
        >Submit</v-btn>
        <v-btn
          color="primary"
          @click="signOut"
        >Sign Out</v-btn>
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
      // Date
      date: null,
      dateFormatted: moment(new Date()).format('L'),
      menu: false,

      // Account
      account: '',
      accounts: [
        'BPI', 'Metrobank', 'Udel', 'Dela Cruz'
      ],

      // Category
      category: '',
      categories: [
        'Food', 'Gas', 'House', 'Parking'
      ],

      // Amount
      amount: '',

      // Tags
      tags: [],
      tagItems: ['Tag 1', 'Vacation', 'Work related']
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
    },

    submit () {
      const [year, month, day] = this.date.split('-')
      const transaction = {
        date: `${month}/${day}/${year}`,
        account: this.account,
        category: this.category,
        amount: this.amount,
        tags: this.tags
      }
      firebase.database().ref('transactions-try').push(transaction)
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    signOut () {
      firebase.auth().signOut().then(a => {
        this.$store.dispatch('setUser', null)
        this.$router.push('/user/signin')
      })
    }
  }
}
</script>
