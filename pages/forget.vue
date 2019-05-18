<template>
  <v-container grid-list-md text-xs-center fluid>
    <v-layout row wrap class="hidden-sm-and-down" align-center justify-center pt-3>
      <v-flex md12 class="text-md-center mb-3" style="margin-top: 2%">
        <nuxt-link to="/">
          <v-icon color="#FF9800" size="120" class="my-left">iconfont icon-link</v-icon>
          <div class="icon-title text-md-left">JumpLinker</div>
        </nuxt-link>
      </v-flex>
      <v-flex md4 xl3>
        <v-card class="pa-3 ma-2 elevation-10 form">
          <v-card-text class="display-2">忘记密码</v-card-text>
          <v-form v-model="valid" ref="form">
            <v-text-field
              class="pt-2 px-3"
              prepend-icon="account_circle"
              v-model="userName"
              :rules="userNameRules"
              label="用户名"
              required
              @keyup.enter="resetPassword"
            ></v-text-field>
            <v-text-field class="pt-2 px-3"
                          prepend-icon="phone"
                          v-model="phone"
                          :rules="phoneRules"
                          :error="phoneError"
                          label="手机号"
                          :error-messages="phoneMsg"
                          @keyup.enter="resetPassword"
                          required>
            </v-text-field>
            <v-text-field class="pt-2 px-3"
                          prepend-icon="email"
                          v-model="email"
                          :rules="emailRules"
                          :error="emailError"
                          :error-messages="emailMsg"
                          @keyup.enter="resetPassword"
                          label="邮箱"
                          required>
            </v-text-field>
            <v-text-field
              class="pt-2 px-3"
              :type="show1?'text':'password'"
              :append-icon="show1?'visibility_off':'visibility'"
              prepend-icon="lock"
              v-model="password1"
              :rules="passwordRules"
              label="输入新密码"
              :error="error"
              :error-messages="errorMsg"
              @click:append="show1=!show1"
              @input="passwordStrength"
              @keyup.enter="resetPassword"
              required
            ></v-text-field>
            <v-text-field
              class="pt-3 px-3"
              :type="show2?'text':'password'"
              :append-icon="show2?'visibility_off':'visibility'"
              prepend-icon="lock"
              v-model="password2"
              :rules="passwordRules"
              label="再次输入密码"
              :error="error"
              :error-messages="errorMsg"
              @click:append="show2=!show2"
              @keyup.enter="resetPassword"
              required
            ></v-text-field>
            <v-layout class="px-3">
              <v-flex md4 xl4 class="grey--text text-md-center  text-xl-center  title2">密码强度：</v-flex>
              <v-flex md8 xl8>
                <el-progress class="pt-3" :percentage="strength" :stroke-width="6"
                             :show-text="false"
                             :color="strengthColor"></el-progress>
              </v-flex>
            </v-layout>
            <v-layout pb-2 justify-center mt-2>
              <v-flex md8>
                <v-btn block depressed dark round large @click="resetPassword"
                       color="light-blue ">
                  <span class="forget-btn">重置密码</span>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-btn round flat color="white" to="/login" class="float-btn" small>
              <v-icon color="grey">iconfont icon-aui-icon-back</v-icon>
              <span class="grey--text pl-1" style="font-size: 14px">登录</span>
            </v-btn>
          </v-form>

        </v-card>
      </v-flex>
    </v-layout>
    <v-layout mx-1 class="hidden-md-and-up" mt-3 row wrap>
      <v-flex xs12>
        <nuxt-link to="/">
          <v-icon color="#FF9800" size="50" class="my-left">iconfont icon-link</v-icon>
          <div class="icon-title-2 text-md-left">JumpLinker</div>
        </nuxt-link>
      </v-flex>
      <v-flex xs12>
        <v-form v-model="valid" ref="form">
          <v-text-field
            class="pt-2"
            prepend-icon="account_circle"
            v-model="userName"
            :rules="userNameRules"
            label="用户名"
            required
            @keyup.enter="resetPassword"
          ></v-text-field>
          <v-text-field class="pt-2 "
                        prepend-icon="phone"
                        v-model="phone"
                        :rules="phoneRules"
                        :error="phoneError"
                        label="手机号"
                        :error-messages="phoneMsg"
                        @keyup.enter="resetPassword"
                        required>
          </v-text-field>
          <v-text-field class="pt-2"
                        prepend-icon="email"
                        v-model="email"
                        :rules="emailRules"
                        :error="emailError"
                        :error-messages="emailMsg"
                        @keyup.enter="resetPassword"
                        label="邮箱"
                        required>
          </v-text-field>
          <v-text-field
            class="pt-2"
            :type="show1?'text':'password'"
            :append-icon="show1?'visibility_off':'visibility'"
            prepend-icon="lock"
            v-model="password1"
            :rules="passwordRules"
            label="输入新密码"
            :error="error"
            :error-messages="errorMsg"
            @click:append="show1=!show1"
            @input="passwordStrength"
            @keyup.enter="resetPassword"
            required
          ></v-text-field>
          <v-text-field
            class="pt-3"
            :type="show2?'text':'password'"
            :append-icon="show2?'visibility_off':'visibility'"
            prepend-icon="lock"
            v-model="password2"
            :rules="passwordRules"
            label="再次输入密码"
            :error="error"
            :error-messages="errorMsg"
            @click:append="show2=!show2"
            @keyup.enter="resetPassword"
            required
          ></v-text-field>
          <v-layout pb-2 justify-center mt-2>
            <v-flex xs12>
              <v-btn block depressed dark round large @click="resetPassword"
                     color="light-blue ">
                <span class="forget-btn">重置密码</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
    <v-btn class="hidden-md-and-up ma-0 mobile-bottom" nuxt to="/login" left absolute depressed flat
           color="#5D6D7E">用户登录
    </v-btn>
    <v-btn class="hidden-md-and-up ma-0 mobile-bottom" nuxt to="/register" right absolute depressed flat
           color="#4EA1FF">新用户注册
    </v-btn>
  </v-container>
</template>

<script>
  import {UserApi} from '../api/UserApi'

  let $strength
  let $userApi
  export default {
    name: 'forget',
    head: {
      title: 'JumpLinker - 忘记密码'
    },
    mounted() {
      $userApi = new UserApi()
      $strength = require('zxcvbn')
      let back = document.getElementById("back")//获取背景
      if (this.$store.state.isMobile) {
        //手机端添加上颜色
        back.style.backgroundColor = "white"
      } else {
        //PC端加上背景
        back.style.backgroundImage = "url('/img/Login/background.jpg')"
      }
    },
    layout: 'signIn',
    methods: {
      passwordStrength: function () {
        if (typeof this.password1 !== 'undefined') {
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
        }
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
      resetPassword() {//重置密码
        if (this.$refs.form.validate() && this.valid) {//检查是否通过验证

          if (this.strength < 25) {
            this.$message.warning("新密码太简单了！")
          } else {
            let $md5 = require('js-md5')
            let password = $md5(this.password1.split('').reverse().join(''))//将新的密码进行加密处理
            $userApi.forget(this.userName, this.phone, this.email, password).then(res => {
              this.handleResetResult(res)
            })
          }
        }
      },
      handleResetResult(res) {//处理返回的结果
        if (res.code === this.$code.SUCCESS) {//操作成功
          this.$notify({
            title: '密码重置成功！',
            message: '密码已成功重置，请重新登录！',
            type: 'success'
          })
          this.$router.push({path: '/login'})
        } else {//操作失败
          this.$notify({
            title: '密码重置失败！',
            message: res.msg,
            type: 'error'
          })
        }
      }
    },
    computed: {
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
      error: function () {
        if (typeof (this.password1) === 'undefined' || typeof (this.password2) === 'undefined') {
          return false
        }
        if (this.password1.length > 0 && this.password2.length > 0 && this.password1 !== this.password2) {
          this.errorMsg = '两次密码不一致'
          return true
        }
        this.errorMsg = ''
        return false
      },
      phoneError: function () {
        const pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        if (typeof (this.phone) === 'undefined' || pattern.test(this.phone) || this.phone.length === 0) {
          this.phoneMsg = ''
          return false
        }
        this.phoneMsg = '请输入正确的手机号'
        return true
      },
      emailError: function () {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (typeof (this.email) === 'undefined' || pattern.test(this.email) || this.email.length === 0) {
          this.emailMsg = ''
          return false
        }
        this.emailMsg = '请输入正确的邮箱'
        return true
      }
    },
    data: function () {
      return {
        strength: 0,
        text: '使用手机验证',
        phone: '',
        email: '',
        userName: "",
        valid: false,
        show1: false,
        show2: false,
        password1: '',
        password2: '',
        errorMsg: '',
        phoneMsg: '',
        emailMsg: '',
        userNameRules: [
          v => !!v || '用户名不可为空',
        ],
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
        phoneRules: [
          v => !!v || '手机号不可为空'
        ],
        emailRules: [
          v => !!v || '邮箱不可为空'
        ]
      }
    },

  }
</script>

<style scoped>
  .form {
    z-index: 50;
    background-color: rgba(255, 255, 255, 1);
    position: relative;
  }

  .float-btn {
    position: absolute;
    z-index: 52;
    top: 15px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    left: 0;
  }

  .title2 {
    font-size: 23px !important;
  }

  .forget-btn {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 28px;
  }

  #send {
    background-color: #777676;
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

  .login {
    color: #27AE60;
  }

  .mobile-bottom {
    bottom: 10px;
  }

  a {
    text-decoration: none;
  }
</style>
