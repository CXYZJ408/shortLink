<template>
  <div>
    <test></test>
  </div>
</template>

<script>
  import {Test} from "../api/Test"
  import axios from 'axios'
  import test from "../components/input1"

  export default {
    //todo delete
    name: "Test",
    layout: "signIn",
    components: {
      test
    },
    data: function () {
      return {
        count: 0,
        x: 1
      }
    },
    methods: {
      addOne() {
        let $testApi = new Test()
        $testApi.test().then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>
  .my-left {
    width: 150px;
    display: inline-block;
  }

  .my-right {
    right: 150px;
    display: inline-block;

  }
</style>
