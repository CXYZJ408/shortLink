<template>
  <div class="out">
    <v-btn @click="set">set</v-btn>
    <v-btn @click="get">get</v-btn>
    <v-btn @click="get1">get1</v-btn>
  </div>
</template>

<script>
  import {LinkApi} from "../api/LinkApi";

  export default {
    name: "test",
    data: function () {
      return {
        showLeft: false
      }
    },
    mounted() {


    },
    methods: {
      set() {
        localStorage.setItem("test", "abc")
      },
      get() {
        console.log(localStorage.getItem("test"))
      },
      get1() {
        let api = new LinkApi()
        api.transferFree("http://www.baidu.com")
      },
      leave(el, done) {

        done()
      }
    }
  }
</script>

<style scoped>
  .out {
    width: 100%;
    height: 100vh;
  }

  .left-div {
    width: 33%;
    height: 100vh;
    background-color: orangered;
    position: absolute;
    z-index: 99;
  }

  .center-div {
    width: 34%;
    height: 100vh;
    background-color: black;
    position: absolute;
    left: 33%;
  }

  .right-div {
    width: 33%;
    height: 100vh;
    background-color: green;
    position: absolute;
    z-index: 99;
    left: 67%;
  }
</style>
