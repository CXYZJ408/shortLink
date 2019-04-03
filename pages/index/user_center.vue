<template>
  <v-layout row wrap justify-center id="user-center">
    <v-flex md10 class="mt-2">
      <div class="my-title text-md-center color-dark">用户中心</div>
    </v-flex>
    <v-flex md6 xl5>
      <v-layout row wrap justify-center class="vip-card" id="vip">
        <v-flex md12 class="text-md-center">
          <div class="color-dark card-title">会员充值</div>
        </v-flex>
        <v-flex md12 class="text-md-center mt-3">
          <div class="color-dark font-1">会员剩余<span class=" pl-2 pr-3 day-font">{{day}}</span>天</div>
        </v-flex>
        <v-flex md12 class="text-md-center mt-2">
          <div class="color-dark font-1" v-html="date"></div>
        </v-flex>
        <v-flex md12 class=" mt-4 ml-5">
          <div class="color-dark font-2 "> 续费天数选择：</div>
        </v-flex>
        <v-flex md12 class=" mt-2 ml-5">
          <v-radio-group row v-model="radioGroup">
            <v-radio
              color="#40A1FA"
              class="font-2 "
              v-for="(selection,index) in selections"
              :label="selection"
              :key="index"
              :value="index"
            ></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex md6 class="text-md-center mt-2">
          <v-btn dark block depressed color="#FF9800" round><span class="headline">续费</span></v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <div class="divider">
      <v-divider vertical></v-divider>
    </div>
    <v-flex md6 xl5>
      <v-card flat class="password-card" color="white" height="450px" width="420px">
        <v-form v-model="valid" ref="form">
          <v-layout row wrap justify-center>
            <v-flex md12 class="text-md-center">
              <div class="card-title color-dark" style="margin-top: 3.5vh">密码重置</div>
            </v-flex>
            <v-flex md12 class="text-md-center">
              <v-text-field
                label="用户名"
                disabled
                value="Yaser"
                prepend-icon="iconfont icon-yonghu"
              ></v-text-field>
            </v-flex>
            <v-flex md12 class="text-md-center">
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
            <v-flex md12 class="text-md-center">
              <v-text-field
                label="新密码"
                :type="show2?'text':'password'"
                :append-icon="show2?'visibility_off':'visibility'"
                :rules="passwordRules"
                @click:append="show2=!show2"
                @keyup.enter="resetPassword"
                required
                v-model="newPassword"
                @input="passwordStrength"
                prepend-icon="iconfont icon-login_password"
              ></v-text-field>
            </v-flex>
            <v-flex md3 class="grey--text text-md-left title  pt-2">密码强度：</v-flex>
            <v-flex md9>
              <el-progress class="pt-3 pr-3" :percentage="strength" :stroke-width="6"
                           :show-text="false" :color="strengthColor"></el-progress>
            </v-flex>
            <v-flex md9 class="text-md-center mt-4">
              <v-btn dark block depressed color="#40A1FA" round @click="resetPassword"><span
                class="headline">重置密码</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import {transformTime} from "../../utils";
  import {UserApi} from '../../api/UserApi'

  let $userApi
  let $md5
  let $strength

  export default {

    name: "user_center",
    mounted() {
      $userApi = new UserApi()
      $strength = require('zxcvbn')
      $md5 = require('js-md5')
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
          return `您的会员将在<span class="mx-2" style="color: #FF9800;">${transformTime(this.$store.state.user.expireTime)}</span>到期`
        }
      }
    },

    data: function () {
      return {
        valid: false,
        show2: false,
        show: false,
        strength: 0,
        oldPassword: "",
        newPassword: "",
        reset: false,
        radioGroup: 0,
        selections: ["一个月（10元）", "半年（50元）", "一年（100元）"],
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
    methods: {
      //处理密码强度
      passwordStrength() {
        if (!this.reset) {
          let score = $strength(this.newPassword).score
          console.log(score)
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
      resetPassword() {
        if (this.$refs.form.validate() && this.valid) {
          if (this.strength < 75) {//如果密码强度太低，则进行提示用户加强
            this.$message.warning('密码太简单啦，加强一下吧！')
          } else {//通过验证后
            let oldPassword = $md5(this.oldPassword.split('').reverse().join(''))//将密码逆序同时进行md5处理
            let newPassword = $md5(this.newPassword.split('').reverse().join(''))//将密码逆序同时进行md5处理
            console.log(oldPassword, newPassword)
            //todo 用户名
            $userApi.resetPassword(oldPassword, newPassword).then(res => {
              this.handleResult(res)
            }).catch(e => {
              this.$message.error("抱歉，出错啦！！")
            })
          }
        }
      },
      handleResult(res) {
        if (res.code === this.$code.SUCCESS) {
          this.reset = true
          this.$refs.form.reset()
          this.reset = false
          this.newPassword = ""
          this.oldPassword = ""
          this.strength = 0
          this.$message.success("密码修改成")
        } else {
          this.$message.error(res.msg)
        }
      }
    }
  }
</script>

<style scoped>

  .font-1 {
    font-size: 28px;
  }

  .day-font {
    color: #3FA3F9;
    font-size: 35px;
    font-style: italic;
  }

  .font-2 {
    font-size: 20px;
  }

  .color-dark {
    color: #3D3D60;
    font-family: 黑体, serif;
  }

  .divider {
    position: absolute;
    height: 80%;
    top: 80px;
    left: 49%;
  }

  .vip-card {
    margin-top: 8vh;
  }

  .password-card {
    margin-top: 4vh;
    margin-right: auto;
    margin-left: auto;
  }

  .card-title {
    font-size: 40px
  }
</style>
<style>
  #vip .v-label {
    color: #3FA3F9 !important;
    font-weight: 600;
  }

  #vip .theme--light.v-icon {
    color: #85C1E9

  }
</style>
