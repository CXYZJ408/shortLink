<template>
  <div class="back" id="transfer">
    <copy ref="copy"></copy>
    <v-dialog
      hide-overlay
      v-model="showQRCodeDialog"
      max-width="400">
      <v-card class="edit-card" max-height="380px">
        <div class="card-title text-md-center my-title">二维码生成</div>
        <v-btn icon small flat color="red" class="card-close" @click="showQRCodeDialog=false">
          <v-icon size="12">iconfont icon-close</v-icon>
        </v-btn>
        <v-card-text class="pa-0">
          <div style="background-color: white" class="text-md-center">
            <canvas id="qrcode"></canvas>
          </div>
        </v-card-text>
        <v-layout justify-center>
          <v-flex md10 class="text-md-right pb-3">
            <v-btn color="grey" dark depressed @click="download" block>
              <v-icon size="18">iconfont icon-xiazai</v-icon>
              <span class="btn-title ml-2">保存</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <v-layout row wrap justify-center class="main">
      <v-flex md12 class="text-md-center mt-5 mb-2">
        <v-icon color="#FF9800" size="120" class="my-left">iconfont icon-link</v-icon>
        <div class="icon-title text-md-left">JumpLinker</div>
      </v-flex>

      <v-flex md6 class="text-md-center mt-3">
        <el-input class="d-inline-block margin-0 top" placeholder="请输入要生成二维码的链接" v-model="longLink"
                  :clearable="true"></el-input>
        <v-btn class="d-inline-block transfer-btn top" dark color="grey" depressed @click="generate">
          <v-icon size="18">iconfont icon-QR-code</v-icon>
          <span class="btn-text ml-2">生成</span></v-btn>
      </v-flex>
    </v-layout>
    <div class="foot-div">
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
  import myFooter from '../../components/myFooter'
  import {LinkApi} from "../../api/LinkApi";
  import copy from '../../components/copy'

  let $linkApi
  let QRCode = require("qrcode")
  export default {
    name: "qrcode",
    layout: "index",
    components: {myFooter, copy},
    created() {
      $linkApi = new LinkApi()
    },
    data: function () {
      return {
        longLink: "",
        showQRCodeDialog: false,
      }
    },
    methods: {
      download() {

      },
      checkURL(URL) {
        //判断url地址是否正确
        let str = URL;
        let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        let objExp = new RegExp(Expression);
        return objExp.test(str) === true;
      },
      generate() {
        if (this.checkURL(this.longLink)) {
          QRCode.toCanvas(document.getElementById('qrcode'), this.longLink).then(() => {
            this.showQRCodeDialog = true
          })
        } else {
          this.$message.warning("请输入正确的地址")
        }
      }

    }
  }
</script>

<style scoped>
  .card-title {
    padding-top: 20px;
  }

  .back {
    width: 100%;
    /*position: relative;*/
  }

  .edit-card {
    position: relative;
  }

  .label {
    padding-top: 4px;
    font-size: 16px;
    color: #30304D;
    font-family: 微软雅黑, serif;
  }

  .foot-div {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .icon-title {
    display: inline-block;
    font-size: 50px;
    color: #30304D;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    vertical-align: top;
    margin-top: 30px;
  }

  .my-left {
    display: inline-block;
    vertical-align: top;
  }

  .btn-text {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 18px;
  }

  .main {
    margin-top: 10%;
  }

  .top {
    vertical-align: top;
  }

  .transfer-btn {
    margin: 0 0 0 -4px;
  }

  .card-close {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  #qrcode {
    width: 150px;
    height: 150px;
  }

  .btn-title {
    font-size: 22px;
    font-family: "黑体", serif;
  }
</style>

<style>
  #transfer .el-input {
    width: 80% !important;
  }

  #transfer .el-input__inner {
    border-radius: 0;
    height: 36px;
  }
</style>
