<template>
  <div class="back" id="transfer">
    <v-dialog
      hide-overlay
      v-model="showTransferDialog"
      max-width="400">
      <v-card class="edit-card" max-height="380px">
        <copy ref="copy"></copy>
        <div class="card-title text-xs-center my-title">转换完成</div>
        <v-btn icon small flat color="red" class="card-close" @click="showTransferDialog=false">
          <v-icon size="12">iconfont icon-close</v-icon>
        </v-btn>
        <v-card-text>
          <v-layout row wrap justify-center>
            <v-flex md12 xs12>
              <v-layout justify-center>
                <v-flex md2 xs2>
                  <div class="label">链接:</div>
                </v-flex>
                <v-flex md9 xs9>
                  <no-ssr>
                    <el-input readonly v-model="longLink">
                      <template v-slot:suffix>
                        <v-btn icon small flat color="#ACAAAA" class="margin-x-0" @click="copy(false)">
                          <v-icon size="12">iconfont icon-copy</v-icon>
                        </v-btn>
                      </template>
                    </el-input>
                  </no-ssr>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex md12 xs12 class="mt-4">
              <v-layout justify-center>
                <v-flex md2 xs2>
                  <div class="label">防红:</div>
                </v-flex>
                <v-flex md9 xs9>
                  <no-ssr>
                    <el-input v-model="shortLink" readonly>
                      <template v-slot:suffix>
                        <v-menu class="d-inline-block">
                          <template v-slot:activator="{ on }">
                            <v-btn v-on="on" icon small flat color="#ACAAAA" class="margin-x-0">
                              <v-icon size="12">iconfont icon-QR-code</v-icon>
                            </v-btn>
                          </template>
                          <div style="background-color: white">
                            <canvas id="qrcode"></canvas>
                          </div>
                        </v-menu>
                        <v-btn icon small flat color="#ACAAAA" class="margin-x-0" @click="copy(true)">
                          <v-icon size="12">iconfont icon-copy</v-icon>
                        </v-btn>
                      </template>
                    </el-input>
                  </no-ssr>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-layout justify-center class="mt-1">
          <v-flex md10 xs10 class="text-md-right text-xs-right pb-3">
            <v-btn color="#4EA1FF" dark depressed @click="showTransferDialog=false" block>
              <span class="btn-title">确定</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>

    </v-dialog>
    <v-layout row wrap justify-center class="main">
      <input readonly style="width: 100%;height:36px;position: absolute;opacity: 0" type="text" id="url"
             v-model="shortLink">
      <v-flex md12 xs12 class="text-md-center text-xs-center mt-5 mb-2">
        <v-icon color="#FF9800" size="8vh" class="my-left">iconfont icon-link</v-icon>
        <div class="icon-title text-md-left text-xs-left">JumpLinker</div>
      </v-flex>
      <v-flex class="hidden-md-and-up mt-3 text-xs-right" xs2>
        <div class="my-title1">链接：</div>
      </v-flex>
      <v-flex md7 xs7 class="text-md-center text-xs-right mt-3">
        <no-ssr>
          <el-input class="margin-0 " placeholder="请输入要防红的链接" v-model="longLink"
                    :clearable="true"></el-input>
        </no-ssr>

      </v-flex>
      <v-flex md1 class="hidden-sm-and-down mt-3 text-xs-left">
        <v-btn class="transfer-btn" dark color="#F8990C" depressed
               @click="transfer">
          <v-icon size="18">iconfont icon-shuaxin</v-icon>
          <span class="btn-text ml-2">防红</span>
        </v-btn>
      </v-flex>
      <v-flex xs3 class="hidden-md-and-up text-xs-left mt-3">
        <v-btn class="transfer-btn " dark color="#F8990C" depressed
               @click="transfer">
          <v-icon size="18">iconfont icon-shuaxin</v-icon>
          <span class="btn-text ml-2">防红</span>
        </v-btn>
      </v-flex>
      <v-flex class="hidden-md-and-up mt-3 text-xs-right" xs2 v-show="shortLink.length>0">
        <div class="my-title1">防红：</div>
      </v-flex>
      <v-flex xs7 class="hidden-md-and-up text-xs-right mt-3" v-show="shortLink.length>0">
        <no-ssr>
          <el-input style="width: 100%" class="margin-0 top" v-model="shortLink"></el-input>
        </no-ssr>
      </v-flex>
      <v-flex xs3 class="transfer-btn hidden-md-and-up text-xs-left  mt-3" v-show="shortLink.length>0">
        <v-btn class="d-inline-block transfer-btn top" dark color="grey" depressed
               @click="copy">
          <v-icon size="18">iconfont icon-copy</v-icon>
          <span class="btn-text ml-2">复制</span>
        </v-btn>
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
      title: "JumpLinker - 链接防红"
    },
    name: "transfer",
    layout: "index",
    components: {myFooter, copy},
    created() {
      $linkApi = new LinkApi()
    },
    data: function () {
      return {
        longLink: "",
        shortLink: "",
        showTransferDialog: false,
        src: ""
      }
    },
    methods: {
      copy(isShort) {
        let link = ''
        if (isShort) {
          link = this.shortLink
        } else {//
          link = this.longLink
        }
        if (this.$store.state.isMobile) {
          document.getElementById('url').select()
          document.execCommand('copy')
          this.$message.success("防红链接复制成功")
        } else {
          this.$refs.copy.copy(link, isShort)
        }
      },
      checkURL(URL) {
        //判断url地址是否正确
        let str = URL;
        let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        let objExp = new RegExp(Expression);
        return objExp.test(str) === true;
      },
      transfer() {
        if (this.checkURL(this.longLink)) {

          $linkApi.transferFree(this.longLink, true).then(res => {
            if (res.code === this.$code.SUCCESS) {
              this.shortLink = res.data.shorturl
              if (!this.$store.state.isMobile) {
                QRCode.toCanvas(document.getElementById('qrcode'), this.shortLink).then(() => {
                  this.showTransferDialog = true
                })
              } else {
                let link = this.shortLink
                this.src = `https://jumplinker.com/api/feature/urls/qrcode?url=${link}`
              }
            } else {
              this.$message.error(res.msg)
            }
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

  .qrcode-img {
    width: 30vh;
    height: 30vh;
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
    right: 5px;
    top: 0;
  }

  .btn-title {
    font-size: 22px;
    font-family: "黑体", serif;
  }

  .my-title {
    font-size: 4.5vh;
    color: #3D3D60;
    font-family: 黑体, serif;
  }

  .my-title1 {
    line-height: 36px;
    font-family: 黑体, serif;
    color: #3D3D60;
  }
</style>

<style>
  #transfer .el-input__inner {
    border-radius: 0;
    height: 36px;
  }
</style>
