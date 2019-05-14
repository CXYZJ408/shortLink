<template>
  <v-app id="back">
    <nuxt/>
    <detect-device></detect-device>
    <baidu></baidu>
  </v-app>
</template>

<script>
  import detectDevice from "../components/other/detectDevice";
  import baidu from '../components/other/Baidu'

  export default {
    components: {
      detectDevice,baidu
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
