<template>
  <v-app class="back">
    <div class="back-blue"></div>
      <nuxt style="z-index: 1"/>
  </v-app>
</template>

<script>
  export default {}
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
