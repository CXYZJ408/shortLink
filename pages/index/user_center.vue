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
          <div class="color-dark font-1">将在<span class="mx-2 expire-day">{{expire}}</span>到期</div>
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
              prepend-icon="iconfont icon-tmpassword"
            ></v-text-field>
          </v-flex>
          <v-flex md12 class="text-md-center">
            <v-text-field
              label="新密码"
              prepend-icon="iconfont icon-login_password"
            ></v-text-field>
          </v-flex>
          <v-flex md3 class="grey--text text-md-left title  pt-2">密码强度：</v-flex>
          <v-flex md9>
            <el-progress class="pt-3 pr-3" :percentage="strength" :stroke-width="6"
                         :show-text="false" :color="strengthColor"></el-progress>
          </v-flex>
          <v-flex md9 class="text-md-center mt-4">
            <v-btn dark block depressed color="#40A1FA" round><span class="headline">重置密码</span></v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "user_center",
    computed:{
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
        day: 12,
        strength: 25,
        expire: "2019-4-12",
        radioGroup: 0,
        selections: ["一个月（10元）", "半年（50元）", "一年（100元）"]
      }
    }
  }
</script>

<style scoped>

  .font-1 {
    font-size: 28px;
  }

  .expire-day {
    color: #FF9800;
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
