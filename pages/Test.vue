<template>
  <div>
    <v-btn @click="test">test</v-btn>
  </div>
</template>

<script>
  import {UserApi} from "../api/UserApi";

  let api
  export default {
    name: "Test",
    created() {
      api = new UserApi()
      console.log("发送")
      api.test("123").then(res => {
        console.log(res)
      })
    },
    methods: {
      test() {

      }
    }
  }
</script>

<style scoped>

</style>
