<template>
  <v-layout style="z-index: 1" class="px-3 pt-5" row wrap justify-center>
    <v-btn absolute dark fab class="my-absolute-btn" color="grey" flat @click="back">
      <v-icon size="30">iconfont icon-aui-icon-back</v-icon>
    </v-btn>
    <v-flex xs12 class="text-xs-center">
      <v-text-field
        label="用户名"
        disabled
        v-model="$store.state.user.username"
        prepend-icon="iconfont icon-yonghu"
      ></v-text-field>
    </v-flex>
    <v-flex xs12 class="text-xs-center">
      <v-form v-model="valid" ref="form">
        <v-layout row wrap justify-center>
          <v-flex xs12 class="text-xs-center">
            <v-text-field
              label="旧密码"
              :type="show?'text':'password'"
              :append-icon="show?'visibility_off':'visibility'"
              :rules="passwordRules"
              @click:append="show=!show"
              @keyup.enter="resetPassword"
              required
              v-model="oldPassword"
              prepend-icon="iconfont icon-tmpassword"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="text-xs-center">
            <v-text-field
              label="新密码"
              :type="show2?'text':'password'"
              :append-icon="show2?'visibility_off':'visibility'"
              :rules="passwordRules"
              @click:append="show2=!show2"
              @keyup.enter="resetPassword"
              @input="passwordStrength"
              required
              v-model="newPassword"
              prepend-icon="iconfont icon-login_password"
            ></v-text-field>
          </v-flex>
          <v-flex xs9 class="text-xs-center mt-4">
            <v-btn dark block depressed color="#40A1FA" round @click="resetPassword"><span
              class="headline">重置密码</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  import {UserApi} from "../../../api/UserApi";

  let $userApi
  let _ = require("lodash")
  let $md5
  let $strength

  export default {
    name: "resetPassword",
    data: function () {
      return {
        valid: false,
        show: false,
        oldPassword: "",
        strength: 0,
        newPassword: "",
        show2: false,
        reset: false,
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
      }
    },
    created() {
      $userApi = new UserApi()
      $md5 = require('js-md5')
      $strength = require('zxcvbn')

    },
    methods: {
      passwordStrength() {
        if (!this.reset) {
          let score = $strength(this.newPassword).score
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
          if (this.strength === process) {
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
      handleResult(res) {
        if (res.code === this.$code.SUCCESS) {
          this.reset = true
          this.$refs.form.reset()
          this.reset = false
          this.newPassword = ""
          this.oldPassword = ""
          this.$message.success("密码修改成功!")
        } else {
          if (this.$store.state.isLogin) {
            this.$message.error(res.msg)
          }
        }
      },
      resetPassword() {
        if (this.$refs.form.validate() && this.valid) {
          if (this.strength < 25) {//如果密码强度太低，则进行提示用户加强
            this.$message.warning('密码太简单啦，加强一下吧！')
          } else {//通过验证后
            let oldPassword = $md5(this.oldPassword.split('').reverse().join(''))//将密码逆序同时进行md5处理
            let newPassword = $md5(this.newPassword.split('').reverse().join(''))//将密码逆序同时进行md5处理
            //TypeError: Cannot set property 'strength' of undefined
            $userApi.resetPassword(oldPassword, newPassword).then(res => {
              this.handleResult(res)
            }).catch(e => {
              this.$message.error("抱歉，出错啦！！" + e)
            })
          }
        }
      },
      back() {
        this.$emit("back")
      }
    }
  }
</script>

<style scoped>
  .my-absolute-btn {
    bottom: 50px;
    right: 20px;
  }
</style>
