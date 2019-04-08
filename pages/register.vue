<template>
  <v-container grid-list-md text-xs-center fluid>
    <v-layout align-center justify-center pt-3>
      <v-card class="elevation-10 pa-3 card">
        <v-card-text class="display-2">
          <nuxt-link class="grey--text" to="/login">登录</nuxt-link>
          ·注册
        </v-card-text>
        <v-form v-model="valid" ref="form">
          <v-layout algin-center justify-center row wrap>
            <v-flex md12>
              <v-text-field label="用户名" class="pt-2 px-3 text" v-model="user.userName" :rules="userNameRules"
                            prepend-icon="account_circle" @keyup.enter="register"
                            required></v-text-field>
            </v-flex>
            <v-flex md12>
              <v-text-field
                class="pt-2 px-3"
                prepend-icon="phone"
                v-model="user.phone"
                :rules="phoneRules"
                :error="phoneError"
                label="手机号" :error-messages="phoneMsg"
                required
                @keyup.enter="login"
              ></v-text-field>
            </v-flex>
            <v-flex md12>
              <v-text-field
                class="pt-2 px-3"
                prepend-icon="email"
                v-model="user.email"
                :rules="emailRules"
                :error="emailError"
                :error-messages="emailMsg"
                label="邮箱"
                required
                @keyup.enter="login"
              ></v-text-field>
            </v-flex>
            <v-flex md12>
              <v-text-field
                class="pt-2 px-3"
                prepend-icon="iconfont icon-yaoqing"
                v-model="user.invert"
                label="邀请码(非必填项)"
                @keyup.enter="login"
              ></v-text-field>
            </v-flex>
            <v-flex md12>
              <v-text-field :type="show1?'text':'password'"
                            :append-icon="show1?'visibility_off':'visibility'"
                            prepend-icon="lock"
                            class="pt-3 px-3"
                            v-model="password1"
                            :rules="passwordRules"
                            label="输入密码"
                            :error="passwordError"
                            :error-messages="errorMsg"
                            @click:append="show1=!show1"
                            @input="passwordStrength"
                            required
                            @keyup.enter="register"></v-text-field>
            </v-flex>
            <v-flex md12>
              <v-text-field :type="show2?'text':'password'"
                            class="pt-3 px-3"
                            :append-icon="show2?'visibility_off':'visibility'"
                            prepend-icon="lock"
                            v-model="password2"
                            :rules="passwordRules"
                            label="再次输入密码"
                            :error="passwordError"
                            :error-messages="errorMsg"
                            @click:append="show2=!show2"
                            @keyup.enter="register"
                            required></v-text-field>
            </v-flex>
            <v-flex md4 class="grey--text text-md-left title pl-3 pt-2">密码强度：</v-flex>
            <v-flex md8>
              <el-progress class="pt-2 pr-3" :percentage="strength" :stroke-width="6"
                           :show-text="false" :color="strengthColor"></el-progress>
            </v-flex>
          </v-layout>
        </v-form>
        <v-layout justify-center align-center pt-3>
          <v-flex md11>
            <v-btn @click="register" class="display-1" block large outline round color="green">注册
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  import {UserApi} from '../api/UserApi'

  let $md5
  let $userApi
  let $strength
  let $cookie
  export default {
    head: {
      title: '短链 - 注册'
    },
    layout: 'signIn',
    mounted() {
      $userApi = new UserApi()
      $strength = require('zxcvbn')
      $md5 = require('js-md5')
      $cookie = require('js-cookie')
      this.user.invert = this.$route.query.inviteId
    },
    methods: {
      //处理密码强度
      passwordStrength() {
        let score = $strength(this.password1).score
        let process
        if (score === 0) {
          process = 0
        } else if (score === 1) {
          process = 25
        } else if (score === 2) {
          process = 50
        } else if (score === 3) {
          process = 75
        } else if (score === 4) {
          process = 100
        }
        this.changeProcess(score, process)
      },
      changeProcess(score, process) {
        let timer = setInterval(() => {
          if (this.strength === process || $strength(this.password1).score !== score) {
            clearInterval(timer)
          } else {
            if (this.strength > process) {
              this.strength--
            } else {
              this.strength++
            }
          }
        }, 5)
      },
      //用户注册
      register() {
        if (this.$refs.form.validate() && this.valid) {
          if (this.strength < 25) {//如果密码强度太低，则进行提示用户加强
            this.$message.warning('密码太简单啦，加强一下吧！')
          } else {//通过验证后
            let password = $md5(this.user.password.split('').reverse().join(''))//将密码逆序同时进行md5处理
            console.log(this.user)
            $userApi.register(this.user.userName, password, this.user.email, this.user.phone, this.user.invert).then(res => {
              this.handleResult(res)
            }).catch(e => {
              this.$message.error("抱歉，出错啦！！")
            })
          }
        }
      },
      //处理注册结果
      handleResult(res) {
        if (res.code === this.$code.SUCCESS) {
          this.$message.success("注册成功")
          //将用户的相关信息存放到store中
          //页面跳转
          this.$router.push({path: `/login`})
        } else {
          this.$message.error(res.msg)
        }
      },
    },
    computed: {
      passwordError: function () {
        if (this.password1.length > 0 && this.password2.length > 0 && this.password1 !== this.password2) {
          this.errorMsg = '两次密码不一致'
          return true
        }
        this.errorMsg = ''
        this.user.password = this.password1
        return false
      },
      phoneError: function () {
        const pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        if (typeof (this.user.phone) === 'undefined' || pattern.test(this.user.phone) || this.user.phone.length === 0) {
          this.phoneMsg = ''
          return false
        }
        this.phoneMsg = '请输入正确的手机号'
        return true
      },
      emailError: function () {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (typeof (this.user.email) === 'undefined' || pattern.test(this.user.email) || this.user.email.length === 0) {
          this.emailMsg = ''
          return false
        }
        this.emailMsg = '请输入正确的邮箱'
        return true
      },
      strengthColor: function () {
        if (this.strength <= 25) {
          return '#E74C3C'
        } else if (this.strength > 25 && this.strength <= 50) {
          return '#F1C40F'
        } else if (this.strength > 50 && this.strength <= 75) {
          return '#F39C12'
        } else if (this.strength > 75 && this.strength <= 100) {
          return '#28B463'
        }
      },
    },
    data: function () {
      return {
        valid: false,
        strength: 0,
        show1: false,
        show2: false,
        user: {
          userName: "",
          password: "",
          phone: "",
          email: "",
          invert: ""
        },
        password1: '',
        password2: '',
        errorMsg: "",
        phoneMsg: "",
        emailMsg: '',
        passwordRules: [
          v => !!v || '密码不为空',
          v => {
            if (typeof (v) === 'undefined') {
              return true
            }
            return v.length >= 8 || '密码不得少于8位'
          },
          v => {
            if (typeof (v) === 'undefined') {
              return true
            }
            return v.length <= 16 || '密码不得超过16位'
          }
        ],
        userNameRules: [
          v => !!v || '用户名不为空',
          v => {
            if (typeof (v) === 'undefined') {
              return true
            }
            return v.length >= 3 || '用户名不得少于3位'
          },
          v => {
            if (typeof (v) === 'undefined') {
              return true
            }
            return v.length <= 10 || '用户名不得超过10位'
          }
        ],
        phoneRules: [
          v => !!v || '手机号不可为空'
        ],
        emailRules: [
          v => !!v || '邮箱不可为空'
        ]
      }
    }
  }
</script>

<style scoped>
  .card {
    margin-top: 5%;
    margin-right: auto;
    margin-left: auto;
    width: 480px;
    height: 680px;
  }

  a {
    text-decoration: none;
  }

  .v-stepper {
    box-shadow: none;
  }

</style>
