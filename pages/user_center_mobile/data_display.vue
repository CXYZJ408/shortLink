<template>
  <div>
    <div v-if="$store.state.isMobile">data_display</div>
    <div v-else>not data_display</div>
  </div>

</template>

<script>
  export default {
    name: "data_display"
  }
</script>

<style scoped>

</style>
