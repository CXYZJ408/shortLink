<template>
  <div class="back">
    <div class="toolbar">
      <div class="toolbar-left">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <div v-on="on" class="user-name">{{$store.state.user.username}}</div>
          </template>
          <span>{{$store.state.user.username}}</span>
        </v-tooltip>
        <v-icon :color="vipColor" class="vip">iconfont icon-huiyuan</v-icon>
      </div>
      <div class="toolbar-right">
        <v-speed-dial
          v-model="fab"
          depressed
          direction="bottom"
          transition="scale-transition"
          style="width: 50px"
        >
          <template v-slot:activator>
            <v-btn small v-model="fab" fab color="white" flat depressed>
              <v-icon>iconfont icon-more</v-icon>
              <v-icon size="20">close</v-icon>
            </v-btn>
          </template>
          <v-btn fab dark small depressed color="red" @click="quit">
            <v-icon class="pl-1" size="24">iconfont icon-sign-out</v-icon>
          </v-btn>
          <v-btn fab dark small depressed color="grey" nuxt to="/">
            <v-icon size="24">home</v-icon>
          </v-btn>
        </v-speed-dial>
      </div>
      <div class="toolbar-down">
        {{title}}
      </div>

    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import {UserApi} from "../../api/UserApi";

  let $cookie
  let $userApi
  export default {
    name: "UserCenterMobileDialog",
    props: {
      title: {
        type: String
      }
    },
    methods: {
      quit() {
        $cookie = require('js-cookie')
        $userApi = new UserApi()
        this.$store.commit("logout")//删除状态树信息
        $cookie.remove('user')
        this.$router.push({path: '/login'})//跳转页面
        $userApi.logout()
      }
    },
    computed: {
      vipColor: function () {
        if (this.$store.state.user.isVip) {
          return "#FF9800"
        }
        return "grey"
      },
    },
    data: function () {
      return {
        fab: false
      }
    }
  }
</script>

<style scoped>
  .back {
    height: 100vh;
    background-color: white;
  }

  .vip {
    vertical-align: top;
    font-size: 2vh;
    margin-top: 1.5vh;
  }

  .user-name {
    vertical-align: top;
    height: 3.5vh;
    font-size: 3vh;
    color: white;
    padding-left: 15px;
    max-width: 25vh;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }

  .toolbar {
    position: relative;
    background-color: #42426A;
    height: 10vh;
    width: 100%;
  }

  .toolbar-down {
    width: 100%;
    padding-top: 2.8vh;
    height: 8vh;
    color: white;
    font-family: 微软雅黑, serif;
    font-size: 4vh;
    text-align: center;
  }

  .toolbar-left {
    position: absolute;
    top: 10px;
    height: 3.5vh;
  }

  .toolbar-right {
    top: 0;
    right: 0;
    width: 60px;
    position: absolute;
    height: 3.5vh;
  }


</style>
