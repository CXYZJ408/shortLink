<template>

</template>

<script>
  var _hmt = _hmt || [];
  export default {
    name: "Baidu",
    mounted() {
      this.init()
      this.init2()
    },
    methods: {
      init() {
        let hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?ff7d560838e9b17de10d0e3a59675b5d";
        let s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      },
      init2() {
        let bp = document.createElement('script');
        let curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
          bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        } else {
          bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        let s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
      }
    }
  }
</script>
