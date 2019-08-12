<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="index" class="div-wrap">
    <linkEdit :show="showEditNew" :linkMode="linkMode" :editNewLink="editNewLink" @cancel="showEditNew=false"
              @editShortLink="editShortLink" @modifyNewLink="modify"
              @add="addLink"></linkEdit>
    <input type="text" v-model="path" id="urlPath" class="pass">
    <input type="file" multiple="multiple" id="file" class="pass" @change="uploadHandle">
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
            flat
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
    <div class="action-wrap">
      <div class="dial">
        <v-speed-dial
          v-model="fab"
          left
          direction="right"
          open-on-hover
          transition="slide-y-reverse-transition"
          lazy
        >
          <template v-slot:activator>
            <v-btn
              v-model="fab"
              color="blue darken-2"
              dark
              fab
            >
              <v-icon>iconfont icon-menu</v-icon>
              <v-icon size="30">close</v-icon>
            </v-btn>
          </template>

          <v-btn icon color="#16C2C2" dark @click="handleAddLink">
            <v-icon size="20" color="white">iconfont icon-add1</v-icon>
          </v-btn>

          <v-btn color="#F5B041" icon dark @click="transfer">
            <v-icon size="18">iconfont icon-shuaxin</v-icon>
          </v-btn>
          <v-btn icon color="#FF0000" dark @click="handleClean">
            <v-icon size="20" color="white">iconfont icon-el-icon-delete2</v-icon>
          </v-btn>
          <v-btn icon color="#40A1FA" dark @click="openFileSelect">
            <v-icon size="18">iconfont icon-wenjian</v-icon>
          </v-btn>
        </v-speed-dial>
      </div>
    </div>
    <div class="card-wrap">
      <div class="card-wrap-out">
        <v-card flat>
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
                        <div class="link" v-on="on">{{link.url}}</div>
                      </template>
                      <span>{{link.url}}</span>
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
      </div>
      <div class="my-inline-div switch-icon">
        <v-icon size="40" color="grey">iconfont icon-zhuanhuan</v-icon>
      </div>
      <div class="card-wrap-out">
        <v-card class="card">
          <div class="top-title" style="background-color: #40A1FA;">
            <div>转换后的链接</div>
          </div>
          <div class="links-card-blue links-card">
            <v-list v-if="shortLinks.length>0" class="link-theme">
              <div v-for="(link,index) in shortLinks">
                <v-list-tile @click="">
                  <span style="color: #3D3D60;font-size: 20px">{{index+1}}.</span>
                  <v-list-tile-title class="ml-2" style="width: 70%" @click="edit(index)">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <div class="link" v-on="on">{{link.shortLink}}</div>
                      </template>
                      <span>{{link.shortLink}}</span>
                    </v-tooltip>
                  </v-list-tile-title>
                  <v-list-tile-content @click="edit(index)">
                    <v-text-field
                      disabled
                      v-model="link.note"
                      placeholder="备注"
                    ></v-text-field>
                  </v-list-tile-content>
                  <v-list-tile-action class="pr-3">
                    <v-btn small icon depressed color="grey" flat @click="copy(index)">
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
      </div>
    </div>
    <div class="grey--text ps">注：文件导入仅支持txt格式，在导入的时候请注意链接格式，不同链接请使用“;”隔开</div>
  </div>
</template>

<script>
  import {LinkApi} from "../../api/LinkApi";
  import linkEdit from '../../components/PC/userCenter/linkEeditDialog.vue'
  //todo 等待API完善
  //todo 清空链接的dialog重写
  let _ = require('lodash')
  let $linkApi
  export default {

    name: "index",
    components: {
      linkEdit
    },
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
    data: function () {
      return {
        fab: false,
        path: "",
        //已添加的长链接
        links: [],
        //所有的短连接
        linkMode: 0,
        shortLinks: [],
        modifyIndex: 0,
        showDeleteLink: false,
        showCleanLink: false,
        showEditNew: false,
        editNewLink: {},
        editIndex: 0
      }
    },
    created() {
      $linkApi = new LinkApi()
    },
    head: {
      title: "JumpLinker - 短链生成"
    },
    methods: {
      handleAddLink() {
        this.editNewLink = {id: "", longLink: "", shortLink: "", note: "", groupId: 0}
        this.linkMode = 0 //将mode切换至创建模式
        this.showEditNew = true
      },
      openFileSelect() {
        let file = document.getElementById('file')
        file.click()
      },
      uploadHandle() {
        let file = document.getElementById('file').files[0]
        console.log(file)
        if (this.beforeUpload(file)) {
          this.handleUpload(file)
        }
      },
      modify(modifiedNewLink) {
        let url = this.addHttp(modifiedNewLink.longLink)
        if (this.checkURL(url)) {
          this.$set(this.links, this.modifyIndex,
            {
              url: url,
              note: modifiedNewLink.note,
              groupId: modifiedNewLink.groupId,
              longLink: url
            })
          this.$message.success("修改成功！")
          this.showEditNew = false
        } else {
          this.$message.warning("您输入的地址有误！")
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
        this.modifyIndex = index
        this.linkMode = 1
        let indexOf = 7
        if (this.links[index].url.indexOf("http://") === -1) {
          //不是以http://开头
          indexOf = 8
        }
        this.editNewLink = this.links[index]
        this.showEditNew = true
      },
      addHttp(url) {
        if (url.indexOf("http://") === -1 && url.indexOf("https://") === -1) {
          //没有http前缀则加上
          url = `http://${url}`
        }
        return url
      },
      addLink(link) {
        //添加长链接
        console.log(link)
        let url = this.addHttp(link.longLink)

        if (this.checkURL(url)) {
          let newLink = {url: url, note: link.note, group_id: link.groupId, longLink: url}
          this.links.push(newLink)
          this.$message.success("添加成功！")
          this.showEditNew = false

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
        //清空长链接前的准备工作
        if (this.links.length > 0) {
          this.showCleanLink = true
        } else {
          this.$message.success("当前没有链接哦！")
        }
      },
      initOption() {
        //将所有配置置为初始配置
        this.links = []
        this.modifyIndex = 0
      },
      cleanLinks() {
        //清空链接
        try {
          this.initOption()
          this.$message.success("删除成功！")
          this.showCleanLink = false
        } catch (e) {
          this.$message.error("抱歉，出错啦！")
          this.showCleanLink = false
        }
      },
      beforeUpload(file) {
        //判断文件类型是否符合要求
        let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        if (fileType !== 'txt') {
          this.$message.error(`只能上传TXT格式的文件！`)
          return false
        } else {
          return true
        }
      },
      handleUpload(file) {
        //处理上传的文件
        let fileRead = new FileReader()
        fileRead.readAsText(file)//将数据作为text类型读取
        let failure = 0//失败数
        let total = 0//总的链接数
        fileRead.onload = () => {//加载数据
          let links = fileRead.result.split(";")
          _.forEach(links, url => {
            if (url.length > 0) {
              total++
              if (this.checkURL(url)) {
                //是url链接
                let newLink = {url: url, note: ""}
                this.links.push(newLink)
              } else {
                failure++
              }
            }
          })
          this.handleUploadResult(total, failure)
        }
      },
      handleUploadResult(total, failure) {
        //处理上传结果
        if (failure === 0) {
          this.$message.success(`成功导入${total}个链接！`)
        } else if (failure < total) {
          this.$message.warning(`成功导入${total - failure}个链接，有${failure}个链接导入失败！`)
        } else {
          this.$message.error(`导入失败，请检查链接格式！`)
        }
      },
      transfer() {
        //链接转换操作
        //todo 添加动画效果
        if (this.links.length > 0) {
          $linkApi.transfer(this.links).then(res => {
            let links = []
            console.log(res)
            if (res.code === this.$code.SUCCESS) {
              _.forEach(res.data, (item => {
                links.push({
                  id: item.id,
                  groupId: 0,
                  longLink: item.longurl,
                  shortLink: item.shorturl,
                  note: item.note
                })
              }))
              this.shortLinks = _.clone(links)
              this.initOption()
              // this.$message.success("转换成功！")

            } else {
              if (this.$store.state.isLogin) {
                this.$message.error(res.msg)
              }
            }
          })
        } else {
          this.$message.warning("请添加要转换的链接")
        }
      },
      copy(index) {
        this.path = this.shortLinks[index].shortLink
        setTimeout(() => {
          let url = document.getElementById('urlPath')
          url.select()
          document.execCommand('Copy')
          this.$message.success("链接复制成功！")
        }, 100)
      },
      edit(index) {
        this.editNewLink = this.shortLinks[index]
        this.editIndex = index
        this.showEditNew = true
        this.linkMode = 2
      },
      editShortLink(newLink) {
        this.$set(this.shortLinks, this.editIndex, {
          id: newLink.id,
          longLink: newLink.longurl,
          shortLink: newLink.shorturl,
          note: newLink.note,
          groupId: 0,
        })
        this.showEditNew = false
      }
    }
    //todo 修改groupId为返回数据的id
  }
</script>

<style scoped>
  .dial {
    position: absolute;
    left: 0;
  }

  .pass {
    opacity: 0;
    position: absolute;
    top: -100px;
  }

  .font {
    font-size: 16px;
    font-family: 微软雅黑, serif;
  }

  .action-wrap {
    width: 100%;
    height: 50px;
    /*padding-right: 20px;*/
    margin-top: 5px;
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

  .switch-icon {
    height: 100%;
    line-height: 55vh;
    margin-right: 5vh;
    margin-left: 5vh;
  }

  .link {
    width: 100%;
    max-width: 30vh;
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

  .card-wrap {
    width: 100%;
    height: 55vh;
    margin-top: 30px;
    text-align: center;
  }

  .card-wrap-out {
    width: 45%;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    max-width: 450px;
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

  .v-dialog {
    border-radius: 10px;
  }

  .v-dialog__content {
    padding-left: 200px !important;
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
