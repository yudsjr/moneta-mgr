<template>
  <v-card tile style="height: 100vh">

    <v-toolbar card dark color="primary">
      <v-btn icon @click.native="close()" dark>
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>New Expense</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark flat @click.native="save()">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-container pt-2 itemgrid-list-xl>
      <v-layout justify-center>
        <v-flex xs12 sm6>
          <date-picker v-model="date" label="Expense Date"></date-picker>
        </v-flex>
      </v-layout>

      <v-layout justify-center>
        <v-flex xs6 sm3>
          <v-list>
            <template v-for="(speedDial, index) in speedDials">
              <v-list-tile avatar ripple :key="index" @click="showAmountModal(speedDial)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ speedDial.category }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ speedDial.account }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index + 1 < speedDials.length" :key="`divider-${index}`"></v-divider>
            </template>
          </v-list>
        </v-flex>
        <v-flex xs6 sm3>
          <v-list>
            <template v-for="(speedDial, index) in speedDials">
              <v-list-tile avatar ripple :key="index" @click="showAmountModal(speedDial)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ speedDial.category }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ speedDial.account }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index + 1 < speedDials.length" :key="`divider-${index}`"></v-divider>
            </template>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider></v-divider>

    <v-container itemsgrid-list-xl pt-1 style="height: 200px; overflow: auto">
      <v-layout justify-center>
        <v-flex xs12 sm6>
          <v-list dense>
            <transition-group name="list" tag="p">
            <template v-for="(expense, index) in expensesToSave">
              <v-list-tile avatar ripple :key="index" @click="">
                <v-list-tile-content>
                  <v-list-tile-title>{{ expense.category }} &mdash; <small>{{ expense.amount }}</small></v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ expense.account }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon @click.native="expensesToSave.splice(index, 1)"><v-icon>clear</v-icon></v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < expensesToSave.length" :key="`divider-${index}`"></v-divider>
            </template>
            </transition-group>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
  import DatePicker from './DatePicker'
  export default {
    components: {
      'date-picker': DatePicker
    },
    methods: {
      close() {
        this.$emit("close", false)
      },
      save() {
        this.$emit("close", false)
      },
      showAmountModal(expense) {
        
      }
    },
    data () {
      return {
        date: null,
        speedDials : [
          {category: "Food", account: "Cash", amount: 100 },
          {category: "Transportation", account: "Metrobank", amount: 2000},
          {category: "Food", account: "Cash", amount: 100 }
        ],
        expensesToSave: [
          {category: "Food", account: "Cash", amount: 100 },
          {category: "Transportation", account: "Metrobank", amount: 2000},
          {category: "Food", account: "Cash", amount: 100 },
          {category: "Food", account: "Cash", amount: 100 },
          {category: "Transportation", account: "Metrobank", amount: 2000},
          {category: "Food", account: "Cash", amount: 100 },
          {category: "Food", account: "Cash", amount: 100 },
          {category: "Transportation", account: "Metrobank", amount: 2000},
          {category: "Food", account: "Cash", amount: 100 }
        ]
      }
    }
  }
</script>
<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(20px);
}
</style>
