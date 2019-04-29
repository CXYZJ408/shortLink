<template>

</template>

<script>
  var _hmt = _hmt || [];
  export default {
    name: "Baidu",
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?ff7d560838e9b17de10d0e3a59675b5d";
        let s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      }
    }
  }
</script>
