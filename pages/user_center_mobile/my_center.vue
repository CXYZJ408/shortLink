<template>
  <div class="center-back">
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <userCenterDialog :title="title">
        <vip @back="back" v-if="which===0"></vip>
        <invite @back="back" v-else-if="which===2"></invite>
        <v-layout class="text-xs-center temp" v-else justify-center row wrap>
          <v-btn absolute dark fab class="my-absolute-btn" color="grey" flat @click="back">
            <v-icon size="30">iconfont icon-aui-icon-back</v-icon>
          </v-btn>
          <v-flex xs10>
            <v-icon size="100" color="#5D6D7E">iconfont icon-developing</v-icon>
          </v-flex>
          <v-flex xs10>
            <div class="empty px-3">
              手机版正在紧张开发中，敬请期待。。。
            </div>
          </v-flex>
        </v-layout>
      </userCenterDialog>
    </v-dialog>
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
              <v-icon size="30">close</v-icon>
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
    </div>
    <div class="list">
      <div class="list-item" @click="go(0)" v-ripple="{ class: 'grey--text' }">
        <div class="list-item-icon">
          <v-icon color="blue" size="4.5vh">iconfont icon-riqi</v-icon>
        </div>
        <div class="list-item-main">
          <div class="list-item-content">
            <div class="item-content-main">
              <div class="item-content-up">
                <div class="text-main">会员剩余<span class="vip-day pl-2">{{day}}</span><span class="pl-2">天</span>
                </div>
              </div>
              <div class="item-content-down">
                <div class="text-sub">{{date}}</div>
              </div>
            </div>
          </div>
          <div class="list-item-action" style="color: #FF9800;">
            续费
            <v-icon color="#FF9800" size="3vh">iconfont icon-right</v-icon>
          </div>
          <v-divider style="  border-color: #EBF0F2;"/>
        </div>

      </div>
      <div class="list-item" @click="go(1)" v-ripple="{ class: 'grey--text' }">
        <div class="list-item-icon">
          <v-icon color="#42426A" size="4.5vh">iconfont icon-tmpassword</v-icon>
        </div>
        <div class="list-item-main">
          <div class="list-item-content">
            <div class="item-content-main one-text">
              重置密码
            </div>
          </div>
          <div class="list-item-action">
            <v-icon color="#D0D3D4" size="3vh">iconfont icon-right</v-icon>
          </div>
          <v-divider style="  border-color: #EBF0F2;"/>
        </div>
      </div>
      <div class="list-item" @click="go(2)" v-ripple="{ class: 'grey--text' }">
        <div class="list-item-icon">
          <v-icon color="#FF4081" size="4.5vh">iconfont icon-add-friends_icon</v-icon>
        </div>
        <div class="list-item-main">
          <div class="list-item-content">
            <div class="item-content-main">
              <div class="item-content-up">
                <div class="text-main">邀请好友</div>
              </div>
              <div class="item-content-down">
                <div class="text-sub">已邀请 {{people}} 位好友</div>
              </div>
            </div>
          </div>
          <div class="list-item-action">
            <v-icon color="#D0D3D4" size="3vh">iconfont icon-right</v-icon>
          </div>
          <v-divider style="  border-color: #EBF0F2;"/>
        </div>

      </div>
    </div>
    <div class="exit">
      <v-btn block large dark color="rgba(229,28,35,.7)" @click="quit">
        <span class="exit-btn">退出账号</span>
        <v-icon size="3.8vh" class=" mt-1 ml-1">iconfont icon-sign-out</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
  import {UserApi} from "../../api/UserApi";
  import {transformTime} from "../../utils";
  import userCenterDialog from '../../components/Mobile/userCenter/UserCenterMobileDialog'
  import vip from '../../components/Mobile/userCenter/VIPDialog'
  import invite from '../../components/Mobile/userCenter/inviteDialog'

  let $userApi
  let $cookie
  export default {
    name: "userCenter",
    components: {
      userCenterDialog, vip, invite
    },
    data: function () {
      return {
        fab: false,
        people: 0,
        users: [],
        dialog: false,
        title: "",
        which: -1,
      }
    },
    created() {
      //初始化
      $cookie = require('js-cookie')
      $userApi = new UserApi()
      this.getInvite()
    },
    methods: {
      back() {
        this.dialog = false
        this.which = -1
      },
      go(index) {
        switch (index) {
          case 0:
            this.title = "会员充值"
            this.which = 0
            break
          case 1:
            this.title = "重置密码"
            this.which = 1
            break
          case 2:
            this.title = "邀请好友"
            this.which = 2
            break
        }
        this.dialog = true
      },
      getInvite() {
        $userApi.inviteList().then(res => {
          if (res.code === this.$code.SUCCESS) {
            this.people = res.data.length
            res.data.forEach(item => {
              this.users.push({
                userName: item.username,
                registerData: transformTime(item.register_datetime),
                days: item.days
              })
            })
          } else {
            if (this.$store.state.isLogin) {
              this.$message.error(res.msg)
            }
          }
        }).catch((e) => {
          if (this.$store.state.isLogin) {
            this.$message.error("网络异常，获取数据失败")
          }
        })
      },
      quit() {
        this.$store.commit("logout")//删除状态树信息
        $cookie.remove('user')
        this.$router.push({path: '/login'})//跳转页面
        $userApi.logout()
      }
    },
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
          return `您的会员将在  ${transformTime(this.$store.state.user.expireTime)}  到期`
        }
      },
      vipColor: function () {
        if (this.$store.state.user.isVip) {
          return "#FF9800"
        }
        return "grey"
      },
    }
  }
</script>

<style scoped>
  .toolbar {
    background-color: #42426A;
    height: 11vh;
  }

  .user-name {
    vertical-align: top;
    height: 100%;
    font-size: 7vh;
    color: white;
    padding-left: 22px;
    max-width: 25vh;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }

  .vip {
    vertical-align: top;
    font-size: 5vh;
    margin-left: 1vh;
    margin-top: 3.5vh;
  }

  .toolbar-left {
    float: left;
    height: 100%;
  }

  .toolbar-right {
    float: right;
    width: 80px;
    padding-top: 1vh;
    padding-left: 3.5vh;
    height: 100%;
  }

  .center-back {
    height: 100vh;
    background-color: rgba(245, 245, 245, .6);
  }

  .list {
    background-color: white;
    width: 100%;
  }

  .list-item {
    width: 100%;
    height: 10vh;
    background-color: white;
  }

  .list-item-icon {
    text-align: center;
    padding-top: 2.7vh;
    height: 10vh;
    width: 15%;
    vertical-align: top;
    display: inline-block;
  }

  .list-item-content {
    height: 10vh;
    width: 70%;
    vertical-align: top;
    display: inline-block;
  }

  .list-item-action {
    padding-top: 3vh;
    padding-right: 1vh;
    text-align: right;
    font-size: 2.5vh;
    height: 10vh;
    width: 28%;
    vertical-align: top;
    display: inline-block;
  }

  .item-content-main {
    height: 10vh;
    width: 100%;
  }

  .item-content-up {
    height: 6vh;
    width: 100%;
  }

  .item-content-down {
    width: 100%;
    height: 4vh;
  }

  .text-main {
    padding-top: 1.7vh;
    font-size: 2.5vh;
    font-family: 微软雅黑, serif;
    color: #30304D;
  }

  .list-item-main {
    display: inline-block;
    vertical-align: top;
    width: 83%;
    height: 10vh;
  }

  .one-text {
    padding-top: 3vh;
    font-size: 3vh;
    font-family: 微软雅黑, serif;
    color: #30304D;
  }

  .vip-day {
    font-size: 3vh;
    font-family: 微软雅黑, serif;
    font-style: italic;
    color: #3FA3F9;
  }

  .text-sub {
    font-size: 1.5vh;
    font-family: 微软雅黑, serif;
    color: #ACAAAA;
  }

  .exit-btn {
    font-size: 3vh;
    font-family: 微软雅黑, serif;
  }

  .exit {
    padding-left: 20%;
    padding-right: 20%;
    width: 100%;
    height: 10vh;
    margin-top: 28vh;
  }

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

  .my-absolute-btn {
    bottom: 50px;
    right: 20px;
  }
</style>
<style>
  .v-dialog {
    margin: 0;
  }
</style>
