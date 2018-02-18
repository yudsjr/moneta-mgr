<template>
  <v-container fluid grid-list-xs>
    <v-layout row justify-space-center pb-3 pt-5>
      <v-flex xs10 offset-xs1
        sm6 offset-sm3 left>
        <span class="headline">New Transaction</span>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-center>
      <v-flex xs6 offset-xs1 sm4 offset-sm1 left>
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
            readonly
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
      <v-flex xs2 sm3 center>
        <v-btn block round color="primary" large><</v-btn>
      </v-flex>
      <v-flex xs2 sm3 center>
        <v-btn block round color="primary" large>></v-btn>
      </v-flex>
    </v-layout>

    <!-- First row -->
    <v-layout align-center>
      <v-flex xs5 offset-xs1 text-xs-center>
        <div>
          <v-btn block color="primary" dark style="height: 230%; padding: 32px" @click="showSpeedDialog = true">
            <div>
              <span class="headline">{{option1.category}}</span><br />
              <small>{{option1.account}}</small>
            </div>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs5 text-xs-center>
        <div>
          <v-btn block color="primary" dark style="height: 230%; padding: 32px" @click="showSpeedDialog = true">
            <div>
              <span class="headline">{{option2.category}}</span><br />
              <small>{{option2.account}}</small>
            </div>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>

    <!-- Second row -->
    <v-layout align-center>
      <v-flex xs5 offset-xs1 text-xs-center>
        <div>
          <v-btn block color="primary" dark style="height: 230%; padding: 32px" @click="showSpeedDialog = true">
            <div>
              <span class="headline">{{option3.category}}</span><br />
              <small>{{option3.account}}</small>
            </div>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs5 text-xs-center>
        <div>
          <v-btn block color="primary" dark style="height: 230%; padding: 32px" @click="showSpeedDialog = true">
            <div>
              <span class="headline">{{option4.category}}</span><br />
              <small>{{option4.account}}</small>
            </div>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>

    <!-- Third row -->
    <v-layout align-center>
      <v-flex xs5 offset-xs1 text-xs-center>
        <div>
          <v-btn block color="primary" dark style="height: 230%; padding: 32px" @click="showSpeedDialog = true">
            <div>
              <span class="headline">{{option5.category}}</span><br />
              <small>{{option5.account}}</small>
            </div>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs5 text-xs-center>
        <div>
          <v-btn block color="primary" dark style="height: 230%; padding: 32px" @click="showSpeedDialog = true">
            <div>
              <span class="headline">{{option6.category}}</span><br />
              <small>{{option6.account}}</small>
            </div>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>

    <v-layout row justify-space-center class="pb-5">
      <v-flex xs8 offset-xs2>
        <v-btn block color="primary" dark style="height: 230%; width: 100%">New Transaction</v-btn>
      </v-flex>
    </v-layout>

    <v-dialog v-model="showSpeedDialog" persistent max-width="500px">
      <v-card>
    	<v-card-title>
    	  <span class="headline">User Profile</span>
    	</v-card-title>
    	<v-card-text>
    	  <v-container grid-list-md>
    		<v-layout wrap>
    		  <large>content</large>
    		</v-layout>
    	  </v-container>
    	</v-card-text>
    	<v-card-actions>
    	  <v-spacer></v-spacer>
    	  <v-btn color="blue darken-1" flat @click.native="showSpeedDialog = false">Close</v-btn>
    	  <v-btn color="blue darken-1" flat @click.native="showSpeedDialog = false">Save</v-btn>
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
  }

}
</script>
