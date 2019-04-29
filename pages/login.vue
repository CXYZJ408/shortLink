<template>
  <v-container grid-list-md text-xs-center fluid>
    <v-layout align-center justify-center row wrap v-if="!$store.state.isMobile">
      <v-flex md12 class="text-md-center mb-3" style="margin-top: 4%">
        <nuxt-link to="/">
          <v-icon color="#FF9800" size="120" class="my-left">iconfont icon-link</v-icon>
          <div class="icon-title text-md-left">JumpLinker</div>
        </nuxt-link>
      </v-flex>
      <v-flex md12>
        <v-card class="pa-3  elevation-10 form">
          <v-card-text class="display-2">登录·
            <nuxt-link class="grey--text" to="/register">注册</nuxt-link>
          </v-card-text>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap justify-end>
              <v-flex md12>
                <v-text-field
                  class="pt-2 px-3"
                  prepend-icon="account_circle"
                  v-model="user.userName"
                  :rules="userNameRules"
                  label="用户名"
                  required
                  @keyup.enter="login"
                ></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field
                  class="pt-3 px-3"
                  :type="show?'text':'password'"
                  :append-icon="show?'visibility_off':'visibility'"
                  prepend-icon="lock"
                  v-model="user.password"
                  :rules="passwordRules"
                  label="密码"
                  @click:append="show=!show"
                  required
                  @keyup.enter="login"
                ></v-text-field>
              </v-flex>
              <v-flex md5 class="text-md-left">
                <v-checkbox
                  class="pl-3"
                  height="8px"
                  color="#40A1FA"
                  v-model="remember"
                  label="记住密码"
                ></v-checkbox>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex md5 class="text-md-right">
                <v-btn flat color="blue" round>
                  <nuxt-link class="blue--text" to="/forget">忘记密码?</nuxt-link>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
          <v-layout justify-center>
            <v-flex md11>
              <v-btn block round depressed large class="display-1 white--text" color="light-blue "
                     @click="login">登录
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>

    <v-form v-model="valid" ref="form" lazy-validation v-else>
      <v-layout mx-1 align-center justify-center row wrap style="padding-top: 18%">
        <v-flex xs12>
          <nuxt-link to="/">
            <v-icon color="#FF9800" size="50" class="my-left">iconfont icon-link</v-icon>
            <div class="icon-title-2 text-md-left">JumpLinker</div>
          </nuxt-link>
        </v-flex>
        <v-flex xs12 style="margin-top: 5vh">
          <v-text-field
            class="pt-2 "
            prepend-icon="account_circle"
            v-model="user.userName"
            :rules="userNameRules"
            label="用户名"
            required
            @keyup.enter="login"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            class="pt-3 "
            :type="show?'text':'password'"
            :append-icon="show?'visibility_off':'visibility'"
            prepend-icon="lock"
            v-model="user.password"
            :rules="passwordRules"
            label="密码"
            @click:append="show=!show"
            required
            @keyup.enter="login"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 mt-3>
          <v-btn block round depressed large class="display-1 white--text" color="light-blue "
                 @click="login">登录
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>

    <v-btn v-if="$store.state.isMobile" class="ma-0 mobile-bottom" nuxt to="/register" left absolute depressed flat
           color="#5D6D7E">新用户注册
    </v-btn>
    <v-btn v-if="$store.state.isMobile" class="ma-0 mobile-bottom" nuxt to="/forget" right absolute depressed flat
           color="#4EA1FF">忘记密码?
    </v-btn>
  </v-container>


</template>
<script>
  import {UserApi} from '../api/UserApi'
  import {encrypt, decode} from "../utils";

  let $userApi
  let $cookie
  import axios from 'axios'

  export default {
    head: {
      title: "JumpLinker - 登录"
    },
    layout: 'signIn',
    data: function () {
      return {
        user: {
          userName: "",
          password: ""
        },
        remember: false,
        valid: false,
        show: false,
        userNameRules: [
          v => !!v || '用户名不可为空',
        ],
        passwordRules:
          [v => !!v || '密码不可为空']
      }
    },
    methods: {
      login() {
        if (this.$refs.form.validate()) {
          let $md5 = require('js-md5')
          let password = $md5(this.user.password.split('').reverse().join(''))//将密码逆序同时进行md5处理
          $userApi.login(this.user.userName, password).then((res) => {
            this.handleLoginResult(res)
          }).catch(e => {
            this.$message.error("抱歉，出错啦！！")
          })
        }
      },
      handleLoginResult(res) {
        if (res.code === this.$code.SUCCESS) {
          this.$message.success('登录成功！！')
          this.handleRemember()
          //将用户的相关信息存放到store中
          this.$store.commit('login', res.data)
          //页面跳转
          if (this.$store.state.purchaseVip) {//如果购买，跳转到vip购买页面
            if (this.$store.state.isMobile) {
              this.$router.push({path: `/user_center_mobile/my_center`})
            } else {
              this.$router.push({path: `/user_center/my_center`})
            }
            this.$store.commit("setPurchaseVip", false)
          } else {
            if (this.$store.state.isMobile) {
              this.$router.push({path: `/user_center_mobile`})
            } else {
              this.$router.push({path: `/user_center`})
            }
          }
        } else {
          this.$message.error(res.msg)
        }
      },
      handleRemember() {
        //判断是否需要记住密码
        //手机端默认记住密码
        if (this.remember || this.$store.state.isMobile) {
          //将用户信息加密后存入cookie中
          let userName = encrypt(this.user.userName)
          let password = encrypt(this.user.password)
          $cookie.set('userName', userName, {expires: 7})
          $cookie.set('password', password, {expires: 7})
        } else {
          $cookie.remove('userName')
          $cookie.remove('password')
        }
      },
      readCookie() {
        //读取本地cookie信息，查看之前是否有将用户的登录信息存放在cookie中
        let userName = $cookie.get('userName')
        let password = $cookie.get('password')
        if (!_.isUndefined(userName) && !_.isUndefined(password)) {
          //读取到信息，开始解析数据
          userName = decode(userName)
          password = decode(password)
          this.user.userName = userName
          this.user.password = password
          this.remember = true
        }
      }
    },
    mounted() {
      //初始化
      $cookie = require('js-cookie')
      $userApi = new UserApi()
      let back = document.getElementById("back")//获取背景
      if (this.$store.state.isMobile) {
        //手机端添加上颜色
        back.style.backgroundColor = "white"
      } else {
        //PC端加上背景
        back.style.backgroundImage = "url('/img/Login/background.jpg')"
      }
      this.readCookie()
    }
  }
</script>
<style scoped>
  a {
    text-decoration: none;
  }

  .form {
    margin-right: auto;
    margin-left: auto;
    margin-top: 1%;
    width: 400px;
    height: 410px;
  }

  .my-left {
    display: inline-block;
    vertical-align: top;
  }

  .icon-title {
    display: inline-block;
    font-size: 50px;
    color: #30304D;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    vertical-align: top;
    margin-top: 30px;
  }

  .icon-title-2 {
    display: inline-block;
    font-size: 40px;
    color: #30304D;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    vertical-align: top;
  }

  .icon {
    height: 30px;
  }

  .mobile-bottom {
    bottom: 10px;
  }
</style>
