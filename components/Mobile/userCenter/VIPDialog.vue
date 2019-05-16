<template>
  <div style="width: 100%;height: 100%">
    <v-dialog
      v-model="showPay"
      max-width="50vh">
      <v-card class="pb-2">
        <div class="text-xs-center my-icon" style="width: 100%">
          <v-icon color="#FF9800" size="18vh">iconfont icon-money2</v-icon>
        </div>
        <v-card-text class="card-text">
          请在新打开的页面完成支付。
        </v-card-text>
        <v-card-actions class="text-xs-center d-block">
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
    <v-layout row wrap justify-center id="vip">
      <v-flex xs11 class="text-xs-center mt-3">
        <div class="color-dark font-1">会员剩余<span class=" pl-2 pr-3 day-font">{{day}}</span>天</div>
      </v-flex>
      <v-flex xs11 class="text-xs-center mt-2">
        <div class="color-dark font-1" v-html="date"></div>
      </v-flex>

      <v-flex xs11 class=" mt-4 ml-3">
        <div class="color-dark font-2 pay-title ">支付方式：</div>
        <el-select v-model="selected" class="pay-selection" placeholder="请选择">
          <el-option
            v-for="(item,index) in payType"
            :key="index"
            :value="item">
          </el-option>
        </el-select>
      </v-flex>
      <v-flex xs11 v-if="selected==='在线支付'">
        <v-layout row wrap>
          <v-flex xs11 class=" mt-4 ml-3">
            <div class="color-dark font-2 "> 续费天数选择：</div>
          </v-flex>
          <v-flex xs12 class="ml-3">
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
        </v-layout>
      </v-flex>
      <v-flex xs11 class=" ml-3 mt-4 mb-4" v-else>
        <div class="active-code-title">激活码：</div>
        <div class="active-code-action ml-3">
          <el-input v-model="activeCode" placeholder="请输入激活码" clearable></el-input>
        </div>
      </v-flex>


      <v-flex xs11 class="text-xs-center">
        <v-btn dark block depressed color="#FF9800" round @click="pay"><span class="headline">续费</span></v-btn>
      </v-flex>
    </v-layout>
    <v-btn absolute dark fab class="my-absolute-btn" color="grey" flat @click="back">
      <v-icon size="30">iconfont icon-aui-icon-back</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import {transformTime} from "../../../utils";
  import {OtherApi} from "../../../api/Other";

  let $otherApi
  let _ = require("lodash")

  export default {
    name: "VIPDialog",
    data: function () {
      return {
        selectedId: 0,
        moneyLabels: [],
        orderId: "",
        showPay: false,
        selected: "在线支付",
        payType: ["在线支付", "激活码支付"],
        activeCode: "",


      }
    },
    created() {
      $otherApi = new OtherApi()
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
    methods: {
      back() {
        this.$emit("back")
      },
      payFinish() {
        $otherApi.queryPay(this.orderId).then(res => {
          console.log(res)
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
      pay() {
        if (this.selected === '在线支付') {
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
        } else {
          $otherApi.payByActiveCode(this.activeCode).then(res => {
            if (res.code === this.$code.SUCCESS) {
              if (res.data.payed) {//激活成功
                //更新用户数据
                this.$store.commit("paySuccess", res.data)
                this.$message.success("恭喜您成为VIP会员!")
              } else {
                if (this.$store.state.isLogin) {
                  this.$message.warning(res.msg)
                }
              }
            } else {
              this.$message.warning(res.msg)
            }
          })
        }
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
          return `您的会员将在<span class="mx-2" style="color: #FF9800;">${transformTime(this.$store.state.user.expireTime)}</span>到期`
        }
      }
    }
  }
</script>

<style scoped>
  .color-dark {
    color: #3D3D60;
    font-family: 黑体, serif;
  }

  .day-font {
    color: #3FA3F9;
    font-size: 5vh;
    font-style: italic;
  }

  .font-1 {
    font-size: 3.5vh;
  }

  .font-2 {
    font-size: 2.8vh;
  }

  .my-icon {
    padding-top: 1vh;
  }

  .card-text {
    font-size: 3vh;
    font-family: 微软雅黑, serif;
    font-weight: 600;
    text-align: center;
    padding: 1vh;
  }

  .pay-finish {
    font-family: 微软雅黑, serif;
    font-size: 18px;
  }

  .my-absolute-btn {
    bottom: 50px;
    right: 20px;
  }

  .pay-title {
    display: inline-block;
    vertical-align: top;
    padding-top: 5px;
  }

  .pay-selection {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    width: 20vh;
  }

  .active-code-action {
    display: inline-block;
    vertical-align: top;
    font-family: "微软雅黑", sans-serif;
    font-size: 2vh;
    width: 30vh;
  }

  .active-code-title {
    display: inline-block;
    width: 13vh;
    color: #3D3D60;
    vertical-align: top;
    font-family: "微软雅黑", sans-serif;
    font-size: 3vh;
    padding-top: 5px;
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
