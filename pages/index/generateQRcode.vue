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
            <a id="download" href="" download="二维码" style="text-decoration: none">
              <v-btn color="grey" dark depressed block>
                <v-icon size="18">iconfont icon-xiazai</v-icon>
                <span class="btn-title ml-2">保存</span>
              </v-btn>
            </a>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <v-layout row wrap justify-center class="main">
      <v-flex md12 xs12 class="text-md-center text-xs-center mt-5 mb-2">
        <v-icon color="#FF9800" size="8vh" class="my-left">iconfont icon-link</v-icon>
        <div class="icon-title text-md-left text-xs-left">JumpLinker</div>
      </v-flex>
      <v-flex class="hidden-md-and-up mt-3 text-xs-right" xs2>
        <div class="my-title1">链接：</div>
      </v-flex>
      <v-flex md7 xs7 class="text-md-center text-xs-right mt-3">
        <no-ssr>
          <el-input class="margin-0" placeholder="请输入要生成二维码的链接" v-model="longLink"
                    :clearable="true"></el-input>
        </no-ssr>
      </v-flex>
      <v-flex md1 class="hidden-sm-and-down mt-3 text-xs-left">
        <v-btn class=" transfer-btn" dark color="grey" depressed @click="generate">
          <v-icon size="18">iconfont icon-QR-code</v-icon>
          <span class="btn-text ml-2">生成</span></v-btn>
      </v-flex>
      <v-flex xs3 class="hidden-md-and-up text-xs-left mt-3">
        <v-btn class="transfer-btn top" dark color="grey" depressed @click="generate">
          <v-icon size="18">iconfont icon-QR-code</v-icon>
          <span class="btn-text ml-2">生成</span></v-btn>
      </v-flex>
      <v-flex xs12 class="text-xs-center hidden-md-and-up mt-5">
        <img class="qrcode-img" :src="src" alt="">
      </v-flex>
    </v-layout>
    <div class="foot-div">
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
  import myFooter from '../../components/PC/layout/myFooter'
  import {LinkApi} from "../../api/LinkApi";
  import copy from '../../components/other/copy'

  let $linkApi
  let QRCode = require("qrcode")
  export default {
    head: {
      title: "JumpLinker - 二维码生成"
    },
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
        src: ""
      }
    },
    methods: {
      checkURL(URL) {
        //判断url地址是否正确
        let str = URL;
        let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        let objExp = new RegExp(Expression);
        return objExp.test(str) === true;
      },
      generate() {
        if (this.checkURL(this.longLink)) {
          if (!this.$store.state.isMobile) {
            let canvas = document.getElementById('qrcode')
            QRCode.toCanvas(canvas, this.longLink).then(() => {
              this.showQRCodeDialog = true
              let image = document.getElementById('download')
              image.href = canvas.toDataURL('image/png')
            })
          } else {

            let link = this.longLink
            this.src = `https://jumplinker.com/api/feature/urls/qrcode?url=${link}`
          }
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
    font-size: 5vh;
    color: #30304D;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    vertical-align: top;
    margin-top: 1vh;
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

  .my-title1 {
    line-height: 36px;
    font-family: 黑体, serif;
    color: #3D3D60;
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
    text-decoration: none;
    color: white;
  }

  .qrcode-img {
    width: 30vh;
    height: 30vh;
  }
</style>

<style>
  #transfer .el-input__inner {
    border-radius: 0;
    height: 36px;
  }
</style>
