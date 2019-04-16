<template>
  <div class="back" id="transfer">
    <v-layout row wrap justify-center class="main">
      <v-flex md12 class="text-md-center mt-5">
        <v-icon color="#FF9800" size="120" class="my-left">iconfont icon-link</v-icon>
        <div class="icon-title text-md-left">JumpLinker</div>
      </v-flex>

      <v-flex md6 class="text-md-center mt-3">
        <el-input class="d-inline-block margin-0 top" placeholder="请输入要转换的链接" v-model="url"
                  :clearable="true"></el-input>
        <v-btn class="d-inline-block transfer-btn top" dark color="#F8990C" depressed>
          <v-icon size="18">iconfont icon-shuaxin</v-icon>
          <span class="btn-text ml-2">转换</span></v-btn>
      </v-flex>
    </v-layout>
    <div class="foot-div">
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
  import myFooter from '../../components/myFooter'

  export default {
    name: "transfer",
    layout: "index",
    components: {myFooter},

    data: function () {
      return {
        url: ""
      }
    }
  }
</script>

<style scoped>
  .back {
    width: 100%;
  }

  .foot-div {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .icon-title {
    display: inline-block;
    font-size: 50px;
    color: #30304D;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    vertical-align: top;
    margin-top: 30px;
  }

  .my-left {
    display: inline-block;
    vertical-align: top;
  }

  .btn-text {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 18px;
  }

  .main {
    margin-top:10%;
  }

  .top {
    vertical-align: top;
  }

  .transfer-btn {
    margin: 0 0 0 -4px;
  }
</style>

<style>
  #transfer .el-input {
    width: 80% !important;
  }

  #transfer .el-input__inner {
    border-radius: 0;
    height: 36px;
  }
</style>
