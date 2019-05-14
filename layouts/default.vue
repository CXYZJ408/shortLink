<template>
  <v-app class="back">
    <div class="back-blue" v-if="!$store.state.isMobile"></div>
    <nuxt style="z-index: 1"/>
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
    },
  }
</script>
<style scoped>
  .back {
    background-color: #EAEFF3;
    position: relative;
  }

  .back-blue {
    position: absolute;
    width: 100%;
    height: 270px;
    background-color: #5EA6FB;
    z-index: 0;
  }
</style>
