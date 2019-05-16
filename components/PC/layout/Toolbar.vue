<template>
  <v-layout class="toolbar">
    <div class="my-title title-center  mt-3">
      {{$store.state.title}}
    </div>
    <v-flex class="pl-3 mt-3">
      <div class="d-inline-block day-icon mr-1">
        <v-icon color="blue">iconfont icon-riqi</v-icon>
      </div>
      <div class="d-inline-block pl-2">
        <div>
          <span class="vip-text1">会员剩余</span><span class="vip-day pl-2">{{day}}</span>
          <span class="vip-text1 pl-2">天</span>
          <nuxt-link class="vip-link pl-2" to="/user_center/my_center">续费</nuxt-link>
        </div>
        <div class="vip-text2">
          {{date}}
        </div>
      </div>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex md1>
      <v-speed-dial
        v-model="fab"
        top
        depressed
        right
        open-on-hover
        direction="bottom"
        transition="scale-transition"
        style="width: 50px"
      >
        <template v-slot:activator>
          <v-btn small v-model="fab" fab color="grey" flat depressed>
            <v-icon>iconfont icon-more</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small depressed color="red" @click="quit">
          <v-icon class="pl-1" size="24">iconfont icon-sign-out</v-icon>
        </v-btn>
        <v-btn fab dark small depressed color="grey" nuxt to="/">
          <v-icon size="24">home</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-flex>
  </v-layout>
</template>

<script>
  import {transformTime} from "../../../utils";
  import {UserApi} from '../../../api/UserApi'

  let $userApi
  let $cookie
  export default {
    name: "Toolbar",
    computed: {
      day: function () {
        let today = new Date().getTime()
        let expireDay = this.$store.state.user.expireTime
        if (today >= expireDay) {
          return 0
        } else {
          const oneDay = 1000 * 3600 * 24
          return Math.ceil((expireDay - today) / oneDay)
        }
      },
      date: function () {
        let today = new Date().getTime()
        if (today > this.$store.state.user.expireTime) {
          return "您的会员已到期"
        } else {
          return `您的会员将在${transformTime(this.$store.state.user.expireTime)}  到期`
        }
      }
    },
    methods: {
      quit() {
        this.$store.commit("logout")//删除状态树信息
        $cookie.remove('user')
        this.$router.push({path: '/login'})//跳转页面
        $userApi.logout()
      }
    },
    data: function () {
      return {
        fab: false
      }
    },
    mounted() {
      //初始化
      $cookie = require('js-cookie')
      $userApi = new UserApi()
    }
  }
</script>

<style scoped>
  .toolbar {
    height: 85px;
    background-color: white;
    position: relative;
    z-index: 11;
  }

  .day-icon {
    float: left;
    padding-top: 10px;
  }

  .vip-text2 {
    font-size: 11.2px;
    font-family: 黑体, serif;
    color: #ACAAAA;
  }

  .vip-text1 {
    font-size: 14px;
    font-family: 微软雅黑, serif;
    color: #30304D;
  }

  .vip-link {
    font-size: 14px;
    font-family: 微软雅黑, serif;
    color: #FF9800;
  }

  .title-center {
    width: 100%;
    position: absolute;
    height: 100%;
    text-align: center;
    z-index: -1;
  }

  a {
    text-decoration: none;
  }

  .vip-day {
    font-size: 20px;
    font-family: 微软雅黑, serif;
    font-style: italic;
    color: #3FA3F9;
  }

  .quit {
    font-size: 18px;
    font-family: 微软雅黑, serif;

  }
</style>
