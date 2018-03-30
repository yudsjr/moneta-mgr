<template>
  <v-card tile>

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

    <v-card-text>
      <v-container fluid>
        <v-layout justify-center align-center>
          <v-flex xs12 sm6>
            <v-list two-line mt-5>
              <template v-for="(speedDial, index) in speedDials">
                <v-list-tile avatar ripple :key="index" @click="">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ speedDial.category }}</v-list-tile-title>
                    <v-list-tile-sub-title class="text--primary">{{ speedDial.account }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text>{{ speedDial.amount }}</v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-if="index + 1 < speedDials.length" :key="`divider-${index}`"></v-divider>
              </template>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>


    </v-toolbar>

  </v-card>
</template>
<script>
  export default {
    methods: {
      close() {
        this.$emit("close", false)
      },
      save() {
        this.$emit("close", false)
      }
    },
    data () {
      return {
        speedDials : [{
          category: "Food",
          account: "Cash",
          amount: 100
        }, {
          category: "Transportation",
          account: "Metrobank",
          amount: 2000
        }]
      }
    }
  }
</script>
