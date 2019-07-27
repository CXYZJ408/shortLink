<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      style="z-index: 999"
      absolute
      temporary
      width="200"
      class="hidden-md-and-up"
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <nuxt-link to="/" style="text-decoration: none">
            <v-icon size="20" color="#FF9800">iconfont icon-link</v-icon>
            <span class="toolbar-title-mobile title">JumpLinker</span>
          </nuxt-link>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          nuxt
          :to="item.link"
          active-class="deep-purple--text text--darken-2"
          class="grey--text"
        >
          <v-list-tile-action>
            <v-icon size="18">{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="list-title">{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile href="https://pay.jumplinker.com/">
          <v-list-tile-action>
            <v-icon size="18">iconfont icon-erweima</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="list-title">三码合一</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-btn v-if="$store.state.isLogin" style="text-transform:none" block small
                   :color="$store.state.user.isVip?'red':'grey'" nuxt to="/user_center" depressed flat>
              <span class="headline">{{$store.state.user.username}}</span>
            </v-btn>
            <v-btn v-else block dark depressed round small color="#ffa018" nuxt to="/login">
              <span class="login-register-btn-mobile">登录/注册</span>
            </v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-card flat class="index-card hidden-md-and-up ">

      <v-toolbar color="white" fixed flat height="55" style="z-index: 200">
        <nuxt-link to="/" style="text-decoration: none">
          <v-icon size="30" color="#FF9800">iconfont icon-link</v-icon>
          <span class="toolbar-title">JumpLinker</span>
        </nuxt-link>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-toolbar>
      <div style="height: 100vh;overflow: auto">
        <nuxt-child></nuxt-child>
      </div>
    </v-card>

    <v-card flat class="index-card hidden-sm-and-down ">
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
        <v-btn  flat round nuxt to="/DNSRed">
          <span class="toolbar-action">域名防红</span>
        </v-btn>
        <v-btn target="_blank" flat round href="https://pay.jumplinker.com/">
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
      <div style="height: 100vh;overflow: auto">
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
    },
    data: function () {
      return {
        drawer: false,
        items: [
          {title: '首页', link: '/', icon: 'iconfont icon-home'},
          {title: '短链生成', link: '/transfer', icon: 'iconfont icon-share_link'},
          {title: '短链还原', link: '/recovery', icon: 'iconfont icon-huanyuan'},
          {title: '二维码生成', link: '/generateQRcode', icon: 'iconfont icon-QR-code'},
          {title: '域名防红', link: '/DNSRed', icon: 'iconfont icon-dns'},

        ]
      }
    }
  }
</script>

<style scoped>
  .list-title {
    font-family: "黑体", serif;
    color: #30304D;
    font-size: 2vh;
    text-align: left;
  }

  .toolbar-title {
    font-size: 25px;
    font-family: "黑体", serif;
    color: #30304D;
    margin-left: 8px;
  }

  .toolbar-title-mobile {
    font-family: "黑体", serif;
    color: #30304D;
    margin-left: 8px;
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

  .login-register-btn-mobile {
    font-family: "微软雅黑", serif;
    font-size: 12px;
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

