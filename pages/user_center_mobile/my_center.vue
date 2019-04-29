<template>
  <div>
    <v-toolbar flat color="#2ECC71">
      <span class="list-title">用户中心</span>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-layout class="text-xs-center temp" v-if="$store.state.isMobile" justify-center row wrap>
      <v-flex xs10>
        <v-icon size="100" color="#5D6D7E">iconfont icon-developing</v-icon>
      </v-flex>
      <v-flex xs10>
        <div class="empty px-3">
          手机版正在紧张开发中，敬请期待。。。
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: "userCenter"
  }
</script>

<style scoped>
  .empty {
    text-align: center;
    width: 100%;
    font-weight: bold;
    font-style: italic;
    font-family: "华文楷体", serif;
    font-size: 25px;
    color: rgba(40, 55, 71, .6);
  }

  .temp {
    margin-top: 40%;
  }

  .list-title {
    font-family: "微软雅黑", sans-serif;
    font-size: 20px;
    color: white;
  }
</style>
