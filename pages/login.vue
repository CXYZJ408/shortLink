<template>
  <v-container grid-list-md text-xs-center fluid>
    <v-layout align-center justify-center pt-3>
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
              <v-btn flat color="blue"  round ><nuxt-link class="blue--text" to="/forget">忘记密码?</nuxt-link></v-btn>
            </v-flex>
          </v-layout>
        </v-form>
        <v-layout justify-center>
          <v-flex md11 class="">
            <v-btn block round depressed large class="display-1 white--text" color="light-blue "
                   @click="login">登录
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
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
      title: '短链 - 登录'
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
          this.$message.success('登陆成功！！')
          this.handleRemember()
          //将用户的相关信息存放到store中
          this.$store.commit('login', res.data)
          //页面跳转
          this.$router.push({path: `/user_center`})
        } else {
          this.$message.error(res.msg)
        }
      },
      handleRemember() {
        //判断是否需要记住密码
        if (this.remember) {
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
        console.log("read")
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
      this.readCookie()
    }
  }
</script>
<style scoped>
  a {
    text-decoration: none;
  }

  .form {
    margin-top: 8%;
    margin-right: auto;
    margin-left: auto;
    width: 400px;
    height: 410px;
  }

  .icon {
    height: 30px;
  }

</style>
