<template>
  <div class="back" id="transfer">
    <v-dialog
      hide-overlay
      v-model="showTransferDialog"
      max-width="400">
      <v-card class="edit-card" max-height="380px">
        <copy ref="copy"></copy>
        <div class="card-title text-md-center my-title">转换完成</div>
        <v-btn icon small flat color="red" class="card-close" @click="showTransferDialog=false">
          <v-icon size="12">iconfont icon-close</v-icon>
        </v-btn>
        <v-card-text>
          <v-layout row wrap justify-center>
            <v-flex md12>
              <v-layout justify-center>
                <v-flex md2>
                  <div class="label">长链接:</div>
                </v-flex>
                <v-flex md9>
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
            <v-flex md12 class="mt-4">
              <v-layout justify-center>
                <v-flex md2>
                  <div class="label">短链接:</div>
                </v-flex>
                <v-flex md9>
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
          <v-flex md10 class="text-md-right pb-3">
            <v-btn color="#4EA1FF" dark depressed @click="showTransferDialog=false" block>
              <span class="btn-title">确定</span>
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
        <el-input class="d-inline-block margin-0 top" placeholder="请输入要转换的链接" v-model="longLink"
                  :clearable="true"></el-input>
        <v-btn class="d-inline-block transfer-btn top" dark color="#F8990C" depressed @click="transfer">
          <v-icon size="18">iconfont icon-shuaxin</v-icon>
          <span class="btn-text ml-2">转换</span></v-btn>
      </v-flex>
    </v-layout>
    <div class="foot-div">
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
  import myFooter from '../../components/layout/myFooter'
  import {LinkApi} from "../../api/LinkApi";
  import copy from '../../components/other/copy'

  let $linkApi
  let QRCode = require("qrcode")
  export default {
    head: {
      title: "JumpLinker - 短链生成"
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
        this.$refs.copy.copy(link, isShort)
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
          this.showTransferDialog = true
          $linkApi.transferFree(this.longLink).then(res => {
            if (res.code === this.$code.SUCCESS) {
              this.shortLink = res.data.shorturl
              QRCode.toCanvas(document.getElementById('qrcode'), this.shortLink).then(() => {
                this.showTransferDialog = true
              })
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
    right: 5px;
    top: 0;
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
