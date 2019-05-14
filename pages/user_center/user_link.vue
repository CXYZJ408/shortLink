<template>

  <v-layout row wrap justify-center>
    <linkEdit :show="showEdit" :link="editLink" @cancel="showEdit=false" @editShortLink="editShortLink"></linkEdit>
    <input type="text" v-model="path" id="urlPath">
    <v-dialog
      v-model="showDeleteLink"
      max-width="400">
      <v-card class="pb-2">
        <div class="text-md-center icon-title" style="width: 100%">
          <v-icon color="orange" size="70">iconfont icon-Warn</v-icon>
        </div>
        <v-card-text class="card-text">
          您是否想要删除该链接？
        </v-card-text>
        <v-card-actions class="text-md-center d-block">
          <v-btn
            color="grey darken-1"
            flat
            @click="showDeleteLink = false">
            取消
          </v-btn>
          <v-btn
            color="red darken-1"
            depressed
            dark
            @click="deleteLink">
            <span class="tooltip">
              确定删除！
            </span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      hide-overlay
      v-model="QRcode"
      width="40vh">
      <v-card class="pb-3 pt-2">
        <div class="card-text">
          二维码
        </div>
        <v-card-text class="qrcode pa-0">
          <canvas id="qrcode"></canvas>
        </v-card-text>
        <v-card-actions class="text-md-center d-block py-0 px-5">
          <v-btn
            block
            color="orange"
            depressed
            dark
            @click="QRcode=false">
            <span class="done">
            确定
            </span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-flex md10 mt-4 pt-3>
      <v-layout>
        <v-flex md5>
          <div class="msg-card">
            <div class="msg d-inline-block ml-2">全部链接</div>
            <div class="msg-blue d-inline-block">{{total}}</div>
            <div class="msg d-inline-block ml-2">已选择：</div>
            <div class="msg-blue d-inline-block">{{selected}}</div>
          </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex md3 class="text-md-right">
          <v-btn icon color="red" flat @click="handleDeleteLinks">
            <v-icon>iconfont icon-shanchu</v-icon>
          </v-btn>
          <v-btn icon color="grey" flat @click="refresh">
            <v-icon size="20">iconfont icon-refresh</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex md10>
      <v-card class="card">
        <no-ssr>
          <el-table
            height="60vh"
            stripe
            :lazy="true"
            ref="multipleTable"
            :cell-class-name="pointer"
            :data="tableData"
            tooltip-effect="dark"
            @cell-click="handleCopy"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="70">
            </el-table-column>
            <el-table-column
              label="原始链接"
              prop="longLink"
              width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="shortLink"
              show-overflow-tooltip
              label="短链接"
              width="150">
            </el-table-column>
            <el-table-column
              prop="imitateLink"
              show-overflow-tooltip
              label="仿长链接"
              width="200">
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注"
              header-align="center"
              align="center"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="count"
              label="总点击数"
              align="center"
              show-overflow-tooltip
              width="90"
            >
            </el-table-column>
            <el-table-column
              type="index"
              header-align="center"
              align="center"
              width="200"
              label="操作">
              <template slot-scope="scope">
                <v-btn icon flat color="#8E44AD" @click="edit(scope.$index)">
                  <v-icon size="15">iconfont icon-bianji</v-icon>
                </v-btn>
                <v-btn icon flat color="red" @click="handleDeleteSingle(scope.$index)">
                  <v-icon size="22">iconfont icon-shanchu</v-icon>
                </v-btn>
                <v-btn icon flat color="#ACAAAA" @click="showQRcode(scope.$index)">
                  <v-icon size="16">iconfont icon-QR-code</v-icon>
                </v-btn>
              </template>
            </el-table-column>
          </el-table>
        </no-ssr>
      </v-card>
    </v-flex>
    <v-flex md10 class="text-md-center page">
      <v-pagination
        v-model="page.page"
        :length="page.total"
        @input="changePage"
        :total-visible="7"
      ></v-pagination>
    </v-flex>
    <div class="grey--text ps">注：请单击链接进行复制</div>
  </v-layout>

</template>

<script>
  import linkEdit from '../../components/shortLinkMobileIndex/linkEeditDialog.vue'
  import {LinkApi} from "../../api/LinkApi";

  let QRCode = require("qrcode")

  let $linkApi
  let _ = require('lodash')
  export default {
    name: "user_link",
    created() {
      $linkApi = new LinkApi()
      this.$store.commit("setTitle", "个人短链")
    },
    mounted() {
      this.getLinkList(1).catch(e => {
        if (this.$store.state.isLogin) {
          this.$message.error(e)
        }
      })
    },
    head: {
      title: "JumpLinker - 个人短链"
    },
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
        QRcode: false,//显示二维码用
        path: "",//复制的地址信息
        page: {},//页面信息
        showEdit: false,//是否显示编辑窗口
        editLink: {},//要编辑的link
        editIndex: 0,//编辑中的index
        tableData: [],//表格数据
        multipleSelection: [],//选择框
        selected: 0,//已选择数
        showDeleteLink: false,
        deleteLinkIds: []//待删除链接的id列表
      }
    },
    computed: {
      total: function () {
        return this.tableData.length
      }
    },
    methods: {
      showQRcode(index) {
        let link = this.tableData[index].shortLink
        let canvas = document.getElementById('qrcode')
        QRCode.toCanvas(canvas, link).then(() => {
          this.QRcode = true
        })
      },
      pointer({columnIndex}) {//设置表格class
        if (columnIndex <= 2 && columnIndex >= 1) {
          return "pointer"
        }
      },
      handleCopy(row, column) {//复制链接
        let rowColumn = column.property
        if (rowColumn === 'longLink' || rowColumn === 'shortLink' || rowColumn === 'imitateLink') {
          this.path = row[rowColumn]
          setTimeout(() => {
            let url = document.getElementById('urlPath')
            url.select()
            document.execCommand('Copy')
            this.$message.success("链接复制成功！")
          }, 100)
        }
      },
      changePage() {//页面切换
        this.getLinkList(this.page.page).catch(e => {
          if (this.$store.state.isLogin) {
            this.$message.error(e)
          }
        })
      },
      getLinkList(page) {//获取指定页面的数据
        return new Promise((resolve, reject) => {
          $linkApi.getLinkList(page).then(res => {
            if (res.code === this.$code.SUCCESS) {
              //成功获取数据
              //进行数据的转换
              this.handleResult(res.data.page, res.data.links)
              resolve(true)
            } else {
              reject(res.msg)
            }
          })
        })
      },
      handleResult(page, links) {
        //处理列表数据结果
        this.page = page
        let data = []
        _.forEach(links, link => {
          data.push({
            id: link.id,
            longLink: link.longurl,
            shortLink: link.shorturl,
            imitateLink: link.imitateurl,
            note: link.note,
            count: link.count,
          })
        })
        this.tableData = _.clone(data)
      },
      editShortLink(newLink) {
        //更新编辑后的数据
        this.$set(this.tableData, this.editIndex, {
          id: newLink.id,
          longLink: newLink.longurl,
          shortLink: newLink.shorturl,
          note: newLink.note
        })

        this.showEdit = false
      },
      edit(index) {
        //显示编辑窗口
        this.editLink = this.tableData[index]
        this.editIndex = index
        this.showEdit = true
      },
      handleDeleteSingle(index) {
        //处理单个链接删除
        this.showDeleteLink = true
        this.deleteLinkIds = [this.tableData[index].id]
      },
      handleDeleteLinks() {
        //处理多个链接删除
        this.showDeleteLink = true
        this.deleteLinkIds = []
        _.forEach(this.multipleSelection, selection => {
          this.deleteLinkIds.push(parseInt(selection.id))
        })
      },
      deleteLink() {
        //删除链接操作
        $linkApi.deleteLink(this.deleteLinkIds).then(res => {
          if (res.code === this.$code.SUCCESS) {
            //删除链接后重新获取列表数据
            this.getLinkList(this.page.page).then(() => {
              this.$message.success("删除链接成功！")
              this.deleteLinkIds = []
              this.showDeleteLink = false
            }).catch(e => {
              if (this.$store.state.isLogin) {
                this.$message.error(e)
              }
            })
          } else {
            if (this.$store.state.isLogin) {
              this.$message.error(res.msg)
            }
          }
        })
      },
      handleSelectionChange(val) {
        //选择框
        this.multipleSelection = val;
        this.selected = val.length
      },
      refresh() {
        //刷新操作
        this.getLinkList(this.page.page)
      }
    }
  }

</script>

<style scoped>

  .msg-card {
    height: 40px;
    padding-top: 10px;
  }

  .msg {
    font-family: 黑体, serif;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.65);
  }

  .msg-blue {
    font-family: 黑体, serif;
    font-size: 16px;
    color: #388DED;
  }

  .card {
    border-color: #E7EEF6 !important;
    border-width: 1px !important;
    box-shadow: 0 0 2px 1px #E7EEF6;
    border-radius: 3px;
  }

  .page {
    position: absolute;
    bottom: 4vh;

  }

  .ps {
    position: absolute;
    bottom: 4vh;
    font-size: 2vh;
    font-family: 微软雅黑, serif;
    left: 13.8vh;
  }

  #urlPath {
    opacity: 0;
    position: absolute;
    top: -100px;
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
    width: 100%;
  }

  .qrcode {
    text-align: center;
  }

  .done {
    font-family: 微软雅黑, serif;
    font-size: 25px;

  }
</style>

<style>
  .pointer {
    cursor: pointer;
  }

  .cell {
    font-family: 微软雅黑, serif;
  }

  .header {
    font-family: 微软雅黑, serif;
  }
</style>
