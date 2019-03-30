<template>
  <v-layout class="toolbar">
    <v-flex md4 class="pl-3">
      <div class="d-inline-block day-icon mr-1">
        <v-icon color="blue">iconfont icon-riqi</v-icon>
      </div>
      <div class="d-inline-block pl-2">
        <div>
          <span class="vip-text1">会员剩余</span><span class="vip-day pl-2">{{day}}</span>
          <span class="vip-text1 pl-2">天</span>
          <nuxt-link class="vip-link pl-2" to="/user_center">续费</nuxt-link>
        </div>
        <div class="vip-text2">
          {{date}}
        </div>
      </div>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex md1 class="mr-5">
      <v-btn depressed flat round color="red" @click="quit">
        <span class="quit">退出</span>
        <v-icon color="red" class="pl-1" size="20">iconfont icon-sign-out</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import {transformTime} from "../utils";
  import {UserApi} from '../api/UserApi'

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
          return Math.floor((expireDay - today) / oneDay)
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
        $userApi.logout().then(res => {
          if (res.code === this.$code.SUCCESS) {
            //退出，删除cookie信息
            this.$store.commit("logout")//删除状态树信息
            $cookie.remove('user')
            this.$router.push({path: '/login'})//跳转页面
          }
        }).catch(e => {
          this.$message.error("抱歉，出错啦！！")
        })
      }
    },
    data: function () {
      return {}
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
    z-index: 11;
    padding-top: 20px;
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
