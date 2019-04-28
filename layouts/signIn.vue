<template>
  <v-app id="back">
    <nuxt/>
    <detect-device></detect-device>
  </v-app>
</template>

<script>
  import detectDevice from "../components/detectDevice";

  export default {
    components: {
      detectDevice
    }
  }
</script>

<style scoped>
  #back {
    background-size: cover;
    width: 100%;
    overflow: hidden;
    background-attachment: fixed;
  }

</style>
