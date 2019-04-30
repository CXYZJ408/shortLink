<template>

  <v-layout row wrap justify-center id="user-center">
    <v-dialog
      v-model="showPay"
      max-width="400">
      <v-card class="pb-2">
        <div class="text-md-center icon-title" style="width: 100%">
          <v-icon color="#FF9800" size="110">iconfont icon-money2</v-icon>
        </div>
        <v-card-text class="card-text">
          请在新打开的页面完成支付。
        </v-card-text>
        <v-card-actions class="text-md-center d-block">
          <v-btn
            depressed
            dark
            color="grey"
            @click="showPay = false">
            <span class="tooltip" style="font-size: 18px">
            取消
            </span>
          </v-btn>
          <v-btn
            color="#2ECC71"
            depressed
            dark
            @click="payFinish">
            <span class="pay-finish">
              支付完成
            </span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        <v-flex md12 class="ml-5">
          <v-radio-group row v-model="selectedId">
            <v-radio
              color="#40A1FA"
              class="font-2 pa-2"
              v-for="(moneyLabel,index) in moneyLabels"
              :label="moneyLabel.name"
              :key="index"
              :value="moneyLabel.id"
            ></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex md6 class="text-md-center">
          <v-btn dark block depressed color="#FF9800" round @click="pay"><span class="headline">续费</span></v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <div class="divider">
      <v-divider vertical></v-divider>
    </div>
    <v-flex md6 xl5>
      <v-card flat class="password-card" color="white" height="450px" width="420px">
        <v-layout row wrap justify-center>
          <v-flex md12 class="text-md-center">
            <div class="card-title color-dark" style="margin-top: 3.5vh">密码重置</div>
          </v-flex>
          <v-flex md12 class="text-md-center">
            <v-text-field
              label="用户名"
              disabled
              v-model="$store.state.user.username"
              prepend-icon="iconfont icon-yonghu"
            ></v-text-field>
          </v-flex>
          <v-flex md12 class="text-md-center">
            <v-form v-model="valid" ref="form">
              <v-layout row wrap justify-center>
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
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
  import {parseCookieByName, transformTime} from "../../utils";
  import {OtherApi} from "../../api/Other";

  let $otherApi
  let $md5
  let $strength
  let _ = require("lodash")
  export default {
    transition: {
      beforeEnter(el) {
        el.style.opacity = 0
      },
      enter(el, done) {
        this.$velocity(el, {opacity: 1}, {duration: 1000}, {complete: done})
      },
      leave(el, done) {
        this.$velocity(el, {opacity: 0}, {duration: 1000}, {complete: done})
      }
    },
    name: "user_center",
    head: {
      title: "JumpLinker - 用户中心"
    },
    created() {
      $otherApi = new OtherApi()
      $strength = require('zxcvbn')
      $md5 = require('js-md5')
      this.$store.commit("setTitle", "用户中心")
    },
    mounted() {
      $otherApi.getCost().then(res => {
        if (res.code === this.$code.SUCCESS) {
          let tempId = false
          _.forEach(res.data, moneyItem => {
            if (!tempId) {
              tempId = moneyItem.id
            }
            let temp = {
              name: `${moneyItem.name}(${moneyItem.money}元)`,
              id: moneyItem.id
            }
            this.moneyLabels.push(temp)
          })
          this.selectedId = tempId
        } else {
          if (this.$store.state.isLogin) {
            this.$message.error(res.msg)
          }
        }
      }).catch(() => {
        this.$message.error("网络异常，获取数据失败！")
      })
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
        orderId: undefined,
        showPay: false,
        valid: false,
        show2: false,
        show: false,
        strength: 0,
        oldPassword: "",
        newPassword: "",
        reset: false,
        selectedId: 0,
        moneyLabels: [],
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
      pay() {
        let tempWindow = window.open()
        $otherApi.pay(this.selectedId).then(res => {
          if (res.code === this.$code.SUCCESS) {
            this.orderId = res.data.order_id
            tempWindow.location.href = res.data.url
            this.showPay = true
          } else {
            tempWindow.close()
            if (this.$store.state.isLogin) {
              this.$message.error(res.msg)
            }
          }
        }).catch(() => {
          tempWindow.close()
          this.$message.error("网络异常，支付失败！")
        })
      },
      resetPassword() {
        if (this.$refs.form.validate() && this.valid) {
          if (this.strength < 25) {//如果密码强度太低，则进行提示用户加强
            this.$message.warning('密码太简单啦，加强一下吧！')
          } else {//通过验证后
            let oldPassword = $md5(this.oldPassword.split('').reverse().join(''))//将密码逆序同时进行md5处理
            let newPassword = $md5(this.newPassword.split('').reverse().join(''))//将密码逆序同时进行md5处理
            //TypeError: Cannot set property 'strength' of undefined
            $otherApi.resetPassword(oldPassword, newPassword).then(res => {
              this.handleResult(res)
            }).catch(e => {
              this.$message.error("抱歉，出错啦！！" + e)
            })
          }
        }
      },
      payFinish() {
        $otherApi.queryPay(this.orderId).then(res => {
          if (res.code === this.$code.SUCCESS) {
            if (res.data.payed) {//支付成功
              //更新用户数据
              this.$store.commit("paySuccess", res.data)
              this.$message.success("恭喜您成为VIP会员!")
            } else {
              if (this.$store.state.isLogin) {
                this.$message.warning("抱歉，未查询到您的支付信息")
              }
            }
          }
          this.showPay = false
        })
      },
      handleResult(res) {
        if (res.code === this.$code.SUCCESS) {
          this.reset = true
          this.$refs.form.reset()
          this.reset = false
          this.newPassword = ""
          this.oldPassword = ""
          this.strength = 0
          this.$message.success("密码修改成功!")
        } else {
          if (this.$store.state.isLogin) {
            this.$message.error(res.msg)
          }
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
    margin-top: 12vh;
  }

  .password-card {
    margin-top: 8vh;
    margin-right: auto;
    margin-left: auto;
  }

  .card-title {
    font-size: 40px
  }

  .v-dialog {
    border-radius: 3px;
  }

  .icon-title {
    padding-top: 30px;
  }

  .card-text {
    font-size: 25px;
    font-family: 微软雅黑, serif;
    font-weight: 600;
    text-align: center;
  }

  .pay-finish {
    font-family: 微软雅黑, serif;
    font-size: 18px;
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
