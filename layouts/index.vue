<template>
  <v-app class="back">
    <nuxt/>
    <detect-device></detect-device>
    <baidu></baidu>
  </v-app>
</template>

<script>
  import detectDevice from "../components/other/detectDevice";
  import baidu from '../components/other/Baidu'

  export default {
    name: "index",
    components: {
      detectDevice, baidu
    }
  }
</script>

<style scoped>
  .back {
    background-color: white;
  }
</style>
