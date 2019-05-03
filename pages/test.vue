<template>
  <div>
    <v-btn id="copy" :data-clipboard-text="url" @click="copy">
      test
    </v-btn>
    <el-input resize="none" v-model="url" type="textarea" :rows="2"></el-input>
  </div>
</template>

<script>
  import Clipboard from 'clipboard';

  export default {
    name: "test",
    data: function () {
      return {
        url: "nihao",
        copyBtn: undefined
      }
    },
    mounted() {
      this.copyBtn = new Clipboard(document.getElementById("copy"))
    },
    methods: {
      copy() {
        // return
        let clipboard = this.copyBtn;
        console.log(clipboard)
        clipboard.on('success', e => {
          this.$message.success("复制成功！")
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          this.$message.error("复制失败！")
          clipboard.destroy()
        })
        this.copyBtn = undefined
        this.copyBtn = new Clipboard(document.getElementById("copy"))
      },
    }
  }
</script>

<style scoped>

</style>
