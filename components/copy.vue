<template>
  <input type="text" v-model="path" id="urlPath">
</template>

<script>
  export default {
    name: "copy",
    data: function () {
      return {
        path: ""
      }
    },
    methods: {
      copy(url) {
        this.path = url
        setTimeout(() => {
          let url = document.getElementById('urlPath')
          url.select()
          document.execCommand('Copy')
          this.$message.success("链接复制成功！")
        }, 100)
      }
    }
  }
</script>

<style scoped>
  #urlPath {
    opacity: 0;
    position: absolute;
    top: -100px;
  }

</style>
