<template>
  <v-btn @click="save()"><span>sdgek</span></v-btn>
</template>
<script>
  export default {
    methods: {
      save(){
        this.$emit("returnFromChild", false)
      }
    }
  }
</script>
