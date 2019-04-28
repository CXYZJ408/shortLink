<template>
  <div>
    <div v-if="$store.state.isMobile">
      my_center
    </div>
    <div v-else>not my_center</div>
  </div>
</template>

<script>
  export default {
    name: "my_center"
  }
</script>

<style scoped>

</style>
