<template></template>
<script>
  //用于检测用户客户端
  let _ = require("lodash")
  export default {
    name: "detectiveDeceive",
    data: function () {
      return {
        allowDevice: ["windows", "iphone", "android"]
      }
    },
    methods: {
      detective() {
        let userAgent = window.navigator.userAgent.toLowerCase()
        _.forEach(this.allowDevice, device => {
          if (userAgent.indexOf(device) !== -1) {
            this.$store.commit("changeDevice", device)
          }
        })
      },
      setEvent() {
        window.onresize = () => {
          this.detective()
        }
      }
    },
    mounted() {
      this.detective()
      this.setEvent()
    }
  }
</script>

