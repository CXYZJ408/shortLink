<template>
  <v-navigation-drawer
    stateless
    value="true"
    class="sidebar-theme"
    width="200"
    id="sidebar"
  >
    <div class="user-card">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on" class="user-name">{{$store.state.user.username}}</span>
        </template>
        <span>{{$store.state.user.username}}</span>
      </v-tooltip>
      <v-icon :color="vipColor" style="vertical-align: top" class="mt-3" size="28">iconfont icon-huiyuan</v-icon>
    </div>
    <v-list class="sidebar-theme" dense :expand="true">
      <div class="background" :style="{'top':top+'px'}"></div>
      <v-list-tile to="/user_center" nuxt active-class="active">
        <v-list-tile-action>
          <v-icon :color="color1">iconfont icon-lianjie-duankai</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>短链生成</v-list-tile-title>
      </v-list-tile>
      <v-list-tile to="/user_center/user_link" nuxt active-class="active">
        <v-list-tile-action>
          <v-icon :color="color2">iconfont icon-share_link</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>个人短链</v-list-tile-title>
      </v-list-tile>
      <v-list-tile to="/user_center/my_center" nuxt active-class="active">
        <v-list-tile-action>
          <v-icon :color="color3">iconfont icon-gerenzhongxin</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>用户中心</v-list-tile-title>
      </v-list-tile>
      <v-list-tile to="/user_center/invite" nuxt active-class="active">
        <v-list-tile-action>
          <v-icon :color="color4">iconfont icon-add-friends_icon</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>好友邀请</v-list-tile-title>
      </v-list-tile>

      <v-list-tile to="/user_center/data_display" nuxt active-class="active">
        <v-list-tile-action>
          <v-icon :color="color5">iconfont icon-shuju</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>数据统计</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

</template>

<script>
  export default {
    //侧边栏
    name: "Sidebar",

    computed: {
      vipColor: function () {
        if (this.$store.state.user.isVip) {
          return "#FF9800"
        }
        return "grey"
      },
      color1: function () {
        if (this.now === '/user_center') {
          this.top = 0
          return "#FF9800"
        }
        return "#E1E9F0"
      },
      color2: function () {
        if (this.now === '/user_center/user_link') {
          this.top = 40
          return "#40A1FA"
        }
        return "#E1E9F0"
      },
      color3: function () {
        if (this.now === '/user_center/my_center') {
          this.top = 80
          return "#2ECC71"
        }
        return "#E1E9F0"
      },
      color4: function () {
        if (this.now === '/user_center/invite') {
          this.top = 120
          return "#E74C3C"
        }
        return "#E1E9F0"
      },
      color5: function () {
        if (this.now === '/user_center/data_display') {
          this.top = 160
          return "#40A1FA"
        }
        return "#E1E9F0"
      },
    },
    props: {
      user: {
        type: Object
      },
      now: {
        type: String
      }
    },
    data: function () {
      return {
        top: 0
      }
    },
  }
</script>

<style scoped>
  .sidebar-theme {
    background-color: #515075 !important;
    color: #BFCBD9 !important;
    position: relative;
    padding-top: 0 !important;
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
  }

  .user-card {
    width: 100%;
    height: 85px;
    background-color: #42426A !important;
    padding-top: 15px;
  }

  .user-name {
    font-size: 35px;
    color: white !important;
    padding-left: 22px;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }

  .background {
    width: 200px;
    height: 40px;
    background-color: #3D3D60 !important;
    position: absolute;
  }

</style>
<style>
  #sidebar .active {
    color: #E7EEF6 !important;
  }
</style>
