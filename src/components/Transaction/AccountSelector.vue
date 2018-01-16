<template>
  <div>
    <v-select
      ref="input"
      v-bind:items="accounts"
      @change.prevent="onChange"
      v-model="a1"
      label="Account"
      autocomplete
    ></v-select>
  {{a1}}
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: false
    }
  },
  data () {
    return {
      a1: null,
      accounts: [
        'BPI', 'Metrobank', 'Udel', 'Dela Cruz'
      ]
    }
  },
  methods: {
    onChange () {
      this.$emit('input', this.a1)
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (val) {
        return this.$emit('input', val)
      }
    }
  }
}
</script>
