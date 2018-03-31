<template>
  <div>
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
        :label="label"
        v-model="date"
        prepend-icon="event"
        readonly
        pb-0
      ></v-text-field>
      <v-date-picker v-model="date" no-title scrollable @change="pickDate()">
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="pickDate()">OK</v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      date: null,
      dateFormatted: moment(new Date()).format('L'),
      menu: false
    }
  },
  methods: {
    pickDate () {
      this.$refs.menu.save(this.date)
      this.$emit('input', this.date)
    },
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
  created: function () {
    this.date = this.parseDate(this.dateFormatted)
    this.$emit('input', this.date)
  },
  props: ['label']
}
</script>
