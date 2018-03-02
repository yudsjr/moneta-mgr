<template>
  <v-container fluid grid-list-xs>
    <!-- Header -->
    <v-layout row pb-3 pt-5>
      <v-flex xs10 offset-xs1
        sm6 offset-sm3 left>
        <span class="headline">New Transaction</span>
      </v-flex>
    </v-layout>

    <!--Date -->
    <v-layout row justify-space-center>
      <v-flex xs10 offset-xs1 sm6 offset-sm3 left>
        <v-menu
          ref="menu"
          lazy
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          min-width="290px"
          :return-value.sync="date"
        >
          <v-text-field
            slot="activator"
            label="Transaction Date"
            v-model="date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" no-title scrollable @change="$refs.menu.save(date)">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>

    <!-- First row -->
    <v-layout align-center>
      <v-flex xs5 offset-xs1 sm3 offset-sm3 text-xs-center>
        <div>
          <v-btn block color="primary" dark style="height: 230%; padding: 25px" @click="showDialog()">
            <div>
              <span class="subheading">{{option1.category}}</span><br />
              <small>{{option1.account}}</small>
            </div>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs5 sm3 text-xs-center>
        <div>
          <v-btn block color="primary" dark style="height: 230%; padding: 25px" @click="showDialog()">
            <div>
              <span class="subheading">{{option2.category}}</span><br />
              <small>{{option2.account}}</small>
            </div>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>

    <!-- Second row -->
    <v-layout align-center>
      <v-flex xs5 offset-xs1 sm3 offset-sm3 text-xs-center>
        <div>
          <v-btn block color="primary" dark style="height: 230%; padding: 25px" @click="showDialog()">
            <div>
              <span class="subheading">{{option3.category}}</span><br />
              <small>{{option3.account}}</small>
            </div>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs5 sm3 text-xs-center>
        <div>
          <v-btn block color="primary" dark style="height: 230%; padding: 25px" @click="showDialog()">
            <div>
              <span class="subheading">{{option4.category}}</span><br />
              <small>{{option4.account}}</small>
            </div>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>

    <!-- Third row -->
    <v-layout align-center>
      <v-flex xs5 offset-xs1 sm3 offset-sm3 text-xs-center>
        <div>
          <v-btn block color="primary" dark style="height: 230%; padding: 25px" @click="showDialog()">
            <div>
              <span class="subheading">{{option5.category}}</span><br />
              <small>{{option5.account}}</small>
            </div>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs5 sm3 text-xs-center>
        <div>
          <v-btn block color="primary" dark style="height: 230%; padding: 25px" @click="showDialog()">
            <div>
              <span class="subheading">{{option6.category}}</span><br />
              <small>{{option6.account}}</small>
            </div>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>

    <!-- Manual Transaction -->
    <v-layout align-center>
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-btn block color="primary" dark style="height: 230%; padding: 12px" @click="showDialog()">
          <div>
            <span class="subheading">New Transaction</span>
          </div>
        </v-btn>
      </v-flex>
    </v-layout>

    <!-- Dialog Window -->
    <v-dialog v-model="showSpeedDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-xs>
            <v-layout row align-center>
              <v-text-field v-model="amount" type="number" label="Amount" prefix="P" ref="amount"></v-text-field>
            </v-layout>
            <v-layout row align-center>
              <v-select v-model="account" :items="accountItems" label="Account" class="input-group--focused" item-value="text"></v-select>
            </v-layout>
            <v-layout row align-center>
              <v-select v-model="category" :items="categoryItems" label="Category" class="input-group--focused" item-value="text"></v-select>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="showSpeedDialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="submit()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dateFormatted: moment(new Date()).format('L'),
      menu: false,

      amount: null,
      account: null,
      accountItems:[ "BPI Savings", "Metrobank Debit", "Cash", "HSBC Visa", "BPI Mastercard" ],
      category: null,
      categoryItems: [ "Food", "Eat Out", "Parking", "Social", "Personal", "Groceries", "Car Care", "Gas", "Phone Bill", "Credit Card", "Rental", "Car Mortgage" ],

      // options
      option1: {category: "", account: ""},
      option2: {category: "", account: ""},
      option3: {category: "", account: ""},
      option4: {category: "", account: ""},
      option5: {category: "", account: ""},
      option6: {category: "", account: ""},

      showSpeedDialog: false
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
    },
    showDialog() {
      this.showSpeedDialog = true
      this.$nextTick(() => this.$refs.amount.focus())
    },
    submit() {
      const transaction = {
        date: this.date,
        account:this.account,
        category:this.category,
        amount:this.amount
      }
      firebase.database().ref('Transactions').push(transaction)
        .then((data) => {
          this.showSpeedDialog = false
        })
        .catch((error) => {
          console.log(error)
        })
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
    this.option1 = {category: "Food", account: "Metrobank Debit"}
    this.option2 = {category: "Eat Out", account: "Metrobank Debit"}
    this.option3 = {category: "Groceries", account: "Metrobank Debit"}
    this.option4 = {category: "Credit Card", account: "Metrobank Debit"}
    this.option5 = {category: "Car Mortgage", account: "Metrobank Debit"}
    this.option6 = {category: "Emergency Fund", account: "Metrobank Debit"}
    firebase.database().ref('/rdo/Accounts').once('value').then(function(snapshot){
      console.log('asdf')
      console.log(snapshot)
    })
  }

}
</script>
