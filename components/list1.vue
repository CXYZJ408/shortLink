<template>
  <div>

    <ol>
      <li v-for="item in textList">{{item}}</li>
    </ol>
  </div>
</template>

<script>
  export default {
    //todo delete
    name: "list1",
    props:{
      textList:{
        type:Array
      }
    }
  }
</script>

<style scoped>

</style>
