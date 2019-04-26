<template>
  <v-app class="back">
    <nuxt/>
    <detect-device></detect-device>
  </v-app>
</template>

<script>
  import detectDevice from "../components/detectDevice";

  export default {
    name: "index",
    components: {
      detectDevice
    }
  }
</script>

<style scoped>
  .back {
    background-color: white;
  }
</style>
