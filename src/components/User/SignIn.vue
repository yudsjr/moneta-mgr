<template>
  <v-container fluid itemsgrid-list-xl>
    <v-layout row>
      <form @submit.prevent="submit">
        <v-text-field
          label="Email"
          v-model="email"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          required
        ></v-text-field>
        <v-btn
          type="submit"
          color="primary"
        >Submit</v-btn>
      </form>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('signUserIn', {
        email: this.email,
        password: this.password
      })
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
