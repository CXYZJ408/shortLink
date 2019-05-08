<template>
  <div>
    <v-layout class="text-xs-center temp" v-if="$store.state.isMobile" justify-center row wrap>
      <v-flex xs10>
        <v-icon size="100" color="#5D6D7E">iconfont icon-developing</v-icon>
      </v-flex>
      <v-flex xs10>
        <div class="empty px-3">
          手机版正在紧张开发中，敬请期待。。。
        </div>
      </v-flex>
      <v-flex xs10 mt-3>
        <v-btn v-if="$store.state.isLogin" style="text-transform:none"
               :color="$store.state.user.isVip?'red':'grey'" nuxt to="/user_center_mobile" depressed flat>
          <span class="headline">{{$store.state.user.username}}</span>
        </v-btn>
        <v-btn v-else dark depressed round large color="#ffa018" nuxt to="/login">
          <span class="login-register-btn">登录/注册</span>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-card v-else flat class="index-card">
      <v-toolbar color="white" fixed flat height="55" style="z-index: 999">
        <nuxt-link to="/" style="text-decoration: none">
          <v-icon size="30" color="#FF9800">iconfont icon-link</v-icon>
          <span class="toolbar-title">JumpLinker</span>
        </nuxt-link>
        <v-spacer></v-spacer>
        <v-btn flat round color="#AEB6BF" nuxt to="/">
          <span class="toolbar-action">首页</span>
        </v-btn>
        <v-btn flat round color="#AEB6BF" nuxt to="/transfer">
          <span class="toolbar-action">短链生成</span>
        </v-btn>

        <v-btn flat round color="#AEB6BF" nuxt to="/recovery">
          <span class="toolbar-action">短链还原</span>
        </v-btn>

        <v-btn flat round color="#AEB6BF" nuxt to="/generateQRcode">
          <span class="toolbar-action">二维码生成</span>
        </v-btn>

        <!--    <v-btn flat round nuxt to="/DNSRed">
              <span class="toolbar-action">域名防红</span>
            </v-btn>-->
        <v-btn target="_blank" flat round href="https://pay.jumplinker.com/ ">
          <span class="toolbar-action">三码合一</span>
        </v-btn>
        <v-btn v-if="$store.state.isLogin" style="text-transform:none"
               :color="$store.state.user.isVip?'red':'grey'" nuxt to="/user_center" depressed flat>
          <span class="headline">{{$store.state.user.username}}</span>
        </v-btn>
        <v-btn v-else dark depressed round large color="#ffa018" nuxt to="/login">
          <span class="login-register-btn">登录/注册</span>
        </v-btn>
      </v-toolbar>
      <div style="margin-top: 55px;">
        <nuxt-child></nuxt-child>
      </div>
    </v-card>
  </div>

</template>

<script>

  export default {
    name: "index",
    layout: "index",
    head: {
      title: "短网址_短链接_流量统计_缩短网址_微信活码_活链_活码_三码合一_收款码合一-jumplinker短网址"
    }
  }
</script>

<style scoped>
  .toolbar-title {
    font-size: 25px;
    font-family: "黑体", serif;
    color: #30304D;
    margin-left: 8px;
  }

  .index-card {
    min-height: 100vh;
  }


  .toolbar-action {
    font-family: "黑体", serif;
    color: rgba(69, 81, 87, .8);
    font-size: 18px;
  }

  .login-register-btn {
    font-family: "微软雅黑", serif;
    font-size: 19px;
    color: white;

  }

  .empty {
    text-align: center;
    width: 100%;
    font-weight: bold;
    font-style: italic;
    font-family: "微软雅黑", serif;
    font-size: 25px;
    color: rgba(40, 55, 71, .4);
  }

  .temp {
    margin-top: 40%;
  }
</style>

