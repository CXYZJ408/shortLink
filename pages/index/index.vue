<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-layout row wrap mt-2 justify-center id="index">
    <v-dialog
      v-model="showDeleteLink"
      max-width="400">
      <v-card flat>
        <v-card-title class="headline">是否删除链接?</v-card-title>
        <v-card-text>
          您是否想要删除该链接？
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="showDeleteLink = false">
            取消
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="deleteLink(modifyIndex)">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showCleanLink"
      max-width="400">
      <v-card flat>
        <v-card-title class="headline">是否清空链接?</v-card-title>
        <v-card-text>
          您是否想要删除所有链接？
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="showCleanLink = false">
            取消
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="cleanLinks">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex md8 xl9 class="text-md-center">
      <div class="my-title">短链生成</div>
    </v-flex>
    <!--链接输入框-->
    <v-flex md8 xl9>
      <v-layout>
        <v-flex md8 xl9>
          <el-input placeholder="请输入要转换的链接" v-model="url" :clearable="true">
            <template slot="prepend">Http(s)://</template>
          </el-input>
        </v-flex>
        <v-flex md4 xl3 class="text-md-center ">
          <v-btn v-if="modifyMode" round depressed color="#2ECC71" dark @click="modify">
            <v-icon size="15">iconfont icon-bianji</v-icon>
            <span class="font ml-1">修改</span>
          </v-btn>
          <v-btn v-else depressed round color="#2ECC71" dark @click="addLink">
            <v-icon size="24">iconfont icon-jiashang</v-icon>
            <span class="font ml-1">添加</span>
          </v-btn>
          &nbsp;
          <v-btn depressed round color="red" dark @click="handleClean">
            <v-icon size="20">iconfont icon-shanchu</v-icon>
            <span class="font ml-1">清空链接</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <!--链接转换框-->
    <v-flex md8 xl9 class="mt-4">
      <v-layout align-center justify-center>
        <!--待转换链接-->
        <v-flex md5 xl5>
          <v-card class="card" flat>
            <div class="top-title" style="background-color: #2ECC71;">
              <div>待转换的链接</div>
            </div>
            <div class="links-card-green links-card">
              <v-list v-if="links.length>0" class="link-theme">
                <div v-for="(link,index) in links">
                  <v-list-tile @click="">
                    <span style="color: #3D3D60;font-size: 20px">{{index+1}}.</span>
                    <v-list-tile-title class="ml-2" @click="changeLink(index)">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <div class="link" v-on="on">{{link.link}}</div>
                        </template>
                        <span>{{link.link}}</span>
                      </v-tooltip>
                    </v-list-tile-title>
                    <v-list-tile-content>
                      <v-text-field
                        v-model="link.note"
                        placeholder="添加备注"
                      ></v-text-field>
                    </v-list-tile-content>
                    <v-list-tile-action class="pr-3">
                      <v-btn class="my-btn" icon depressed color="red" small outline @click="deleteLink(index)">
                        <v-icon size="20" color="red">remove</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider class="divider"></v-divider>
                </div>
              </v-list>
              <div v-else class="empty">
                请添加链接
              </div>
            </div>
          </v-card>
        </v-flex>
        <v-flex md1 class="text-md-center mx-4 ">
          <v-icon size="40" color="grey">iconfont icon-zhuanhuan</v-icon>
        </v-flex>
        <!--已转换链接-->
        <v-flex md5 xl5>
          <v-card class="card">
            <div class="top-title" style="background-color: #40A1FA;">
              <div>转换后的链接</div>
            </div>
            <div class="links-card-blue links-card">
              <v-list v-if="shortLinks.length>0" class="link-theme">
                <div v-for="(link,index) in shortLinks">
                  <v-list-tile @click="">
                    <span style="color: #3D3D60;font-size: 20px">{{index+1}}.</span>
                    <v-list-tile-title class="ml-2" style="width: 70%">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <div class="link" v-on="on">{{link}}</div>
                        </template>
                        <span>{{link}}</span>
                      </v-tooltip>
                    </v-list-tile-title>
                    <v-list-tile-content>
                      <v-text-field
                        disabled
                        placeholder="备注"
                      ></v-text-field>
                    </v-list-tile-content>
                    <v-list-tile-action class="pr-3">
                      <v-btn small icon depressed color="white">
                        <v-icon size="15" color="gery">iconfont icon-copy</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider class="divider"></v-divider>
                </div>
              </v-list>
              <div v-else class="empty">
                请转换链接
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <!--操作区-->
    <v-flex md8 xl9 class="mt-4">
      <v-layout row wrap>
        <v-flex md12 class="text-md-right">
          <el-upload
            class="d-inline-block"
            action="#"
            :multiple="false">
            <v-btn depressed round color="#40A1FA" dark>
              <v-icon size="18">iconfont icon-wenjian</v-icon>
              <span class="font ml-2">批量导入</span>
            </v-btn>
          </el-upload>
          &nbsp;
          <v-btn depressed round color="#F5B041" dark>
            <v-icon size="18">iconfont icon-shuaxin</v-icon>
            <span class="font ml-2">一键转换</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <div class="grey--text ps">注：文件导入仅支持txt格式，在导入的时候请注意链接格式，不同链接请使用“,”隔开</div>
  </v-layout>
</template>

<script>
  let _ = require('lodash')
  export default {
    name: "index",
    data: function () {
      return {
        modifyMode: false,//是否编辑已添加的长链接
        url: "",//输入框的url链接
        //已添加的长链接
        links: [],
        //所有的短连接
        shortLinks: [],
        modifyIndex: 0,
        showDeleteLink: false,
        showCleanLink: false,
      }
    },
    methods: {
      modify() {
        if (this.url.length === 0) {
          //如果在修改模式下，清空了文本框，则询问是否删除该链接
          this.showDeleteLink = true
        } else {
          let url = `http://${this.url}`
          if (this.checkURL(url)) {
            this.links[this.modifyIndex].link = url
            this.url = ""
            this.$message.success("修改成功！")
            this.modifyMode = false
          } else {
            this.$message.warning("您输入的地址有误！")
          }
        }

      },
      checkURL(URL) {
        //判断url地址是否正确
        let str = URL;
        let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        let objExp = new RegExp(Expression);
        return objExp.test(str) === true;
      },
      changeLink(index) {
        //修改长链接
        this.modifyMode = true
        this.modifyIndex = index
        this.url = this.links[index].link.substring(7)
      },
      addLink() {
        //添加长链接
        let url = `http://${this.url}`
        if (this.checkURL(url)) {
          let newLink = {link: url, note: ""}
          this.links.push(newLink)
          this.url = ""
          this.$message.success("添加成功！")
        } else {
          this.$message.warning("您输入的地址有误！")
        }
      },
      deleteLink(index) {
        //删除长链接
        try {
          this.links.splice(index, 1)
          this.$message.success("删除成功！")
          this.showDeleteLink = false
        } catch (e) {
          this.$message.error("抱歉，出错啦！")
          this.showDeleteLink = false
        }
      },
      handleClean() {
        if (this.links.length > 0) {
          this.showCleanLink = true
        } else {
          this.$message.success("当前没有链接哦！")
        }
      },
      cleanLinks() {
        //清空链接
        try {
          this.links = []
          this.$message.success("删除成功！")
          this.showCleanLink = false
          this.modifyIndex = 0
          this.modifyMode = false
        } catch (e) {
          this.$message.error("抱歉，出错啦！")
          this.showCleanLink = false
        }
      }
    }
  }
</script>

<style scoped>

  .font {
    font-size: 16px;
    font-family: 微软雅黑, serif;
  }

  .top-title {
    width: 100%;
    height: 7vh;
    border-radius: 10px 10px 0 0 !important;
  }

  .top-title div {
    text-align: center;
    font-size: 3.1vh;
    font-family: 微软雅黑, serif;
    color: white;
    margin-left: auto;
    margin-right: auto;
    padding-top: 1.3vh;

  }

  .divider {
    margin-left: 5%;
    width: 90%;
    border-color: #EBF0F2 !important;
    margin-top: -2px;
  }

  .link {
    width: 100%;
    color: #3D3D60;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .link-theme {
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
  }

  .links-card {
    height: 47.8vh;
    border-radius: 0 !important;
    overflow: auto;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }

  .bottom {
    height: 30px;
    padding-right: 5px;
    background-color: white;
    width: 100%;
  }


  /* 滚动条滑块 */
  .links-card-green::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(46, 204, 113, 0.15);
  }

  .links-card-blue::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(64, 161, 250, 0.15);
  }

  .ps {
    position: absolute;
    bottom: 4vh;
    font-size: 2vh;
    font-family: 微软雅黑, serif;
    left: 20vh;
  }

  .empty {
    width: 100%;
    text-align: center;
    font-size: 30px;
    color: #D6DBDF;
    font-family: 微软雅黑, serif;
    height: 50px;
    margin-top: 30%;
  }
</style>
<style>
  #index .v-card {
    border-radius: 10px;
    border-color: #E7EEF6 !important;
    border-width: 1px !important;
    box-shadow: 0 0 2px 1px #E7EEF6;
    position: relative;
    height: 55vh;
  }


  #index .v-btn {
    margin: 0 !important;
  }

  .my-btn {
    height: 20px !important;
    width: 20px !important;
  }

  #index .v-list {
    padding: 0 !important;
  }

  #index .el-input-group__prepend {
    font-size: 18px;
    font-family: 微软雅黑, serif;
  }

  #index .el-input__inner {
    font-family: 微软雅黑, serif;
    font-size: 18px;
  }
</style>
