<template>
  <div style="width: 100%;height: 100%">
    <input type="text" v-model="url" id="urlPath">
    <v-layout justify-center row wrap class="main">
      <v-flex xs3 class="text-xs-center">
        <div class="invite ">邀请链接:</div>
      </v-flex>
      <v-flex xs8>
        <el-input readonly v-model="url">
        </el-input>
      </v-flex>
      <v-flex xs11 class="mt-3 pt-2">
        <v-btn style="height: 55px" dark large block outline depressed flat color="#2ECC71" round @click="copy">
          <v-icon size="4vh">iconfont icon-share_link</v-icon>
          <span class="btn-text">一键复制</span></v-btn>
      </v-flex>
    </v-layout>
    <v-btn absolute dark fab class="my-absolute-btn" color="grey" flat @click="back">
      <v-icon size="30">iconfont icon-aui-icon-back</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: "inviteDialog",
    computed: {
      url: function () {
        return `https://jumplinker.com/register?inviteId=${this.$store.state.user.userId}`
      }
    },
    methods: {
      copy() {
        let url = document.getElementById('urlPath')
        url.select()
        document.execCommand('Copy')
        this.$message.success("链接复制成功！")
      },
      back() {
        this.$emit("back")
      },
    }
  }
</script>

<style scoped>
  .main {
    margin-top: 17vh;
  }

  #urlPath {
    opacity: 0;
    position: absolute;
    top: -100px;
  }

  .invite {
    padding-top: .5vh;
    font-size: 2.5vh;
    color: #3D3D60;
    font-family: 黑体, serif;
  }

  .btn-text {
    font-family: 微软雅黑,serif;
    font-size: 3vh;
    padding-left: 8px;
  }

  .my-absolute-btn {
    bottom: 50px;
    right: 20px;
  }
</style>
