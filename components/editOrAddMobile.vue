<template>
  <v-card flat>
    <v-dialog
      v-model="showDelete"
      max-width="400"
      width="350">
      <v-card class="pb-2">
        <div class="icon-title" style="width: 100%">
          <v-icon color="orange" size="70">iconfont icon-Warn</v-icon>
        </div>
        <v-card-text class="card-text">
          您是否想要删除该链接？
        </v-card-text>
        <v-card-actions class="d-block" style="text-align: center">
          <v-btn
            color="grey darken-1"
            flat
            @click="showDelete = false">
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
    <copy ref="copy"></copy>
    <div class="card-title">{{isEdit?"链接编辑":"添加链接"}}</div>
    <v-btn v-if="!isEdit" absolute dark fab class="my-absolute-btn" color="grey" flat @click="btnAction(0)">
      <v-icon size="30">iconfont icon-aui-icon-back</v-icon>
    </v-btn>
    <v-layout wrap justify-center row class="main-content" v-if="isEdit">
      <v-flex xs3>
        <div class="title-text">短链接：</div>
      </v-flex>
      <v-flex xs8>
        <el-input disabled v-model="link.shortLink">
          <v-icon slot="suffix" class="pt-2" color="#D7D7E3">block</v-icon>
        </el-input>
      </v-flex>
      <v-flex xs3 class="mt-4">
        <div class="title-text">长链接：</div>
      </v-flex>
      <v-flex xs8 class="mt-4">
        <el-input v-model="link.longLink" placeholder="请输入修改后的链接" :clearable="true"></el-input>
      </v-flex>
      <v-flex xs3 class="mt-4">
        <div class="title-text">备&nbsp;&nbsp;&nbsp;注：</div>
      </v-flex>
      <v-flex xs8 class="mt-4">
        <el-input resize="none" v-model="link.note" type="textarea" :rows="2"></el-input>
      </v-flex>
      <v-flex xs11 class="mt-5">
        <v-btn block depressed color="#58D68D" @click="btnAction(2)" style="height: 45px;border-radius: 15px">
          <span class="btn-title">复制短链</span>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout wrap justify-center row class="main-content" v-else>

      <v-flex xs3 class="mt-4">
        <div class="title-text">长链接：</div>
      </v-flex>
      <v-flex xs8 class="mt-4">
        <el-input placeholder="请输入要转换的长链接" v-model="link.longLink" :clearable="true"></el-input>
      </v-flex>
      <v-flex xs3 class="mt-4">
        <div class="title-text">备&nbsp;&nbsp;&nbsp;注：</div>
      </v-flex>
      <v-flex xs8 class="mt-4">
        <el-input resize="none" v-model="link.note" type="textarea" :rows="2"></el-input>
      </v-flex>
      <v-flex xs11 class="mt-5">
        <v-btn block depressed color="#58D68D" @click="btnAction(1)" style="height: 45px;border-radius: 15px">
          <span class="btn-title">一键转换</span>
        </v-btn>
      </v-flex>
    </v-layout>
    <div class="card-action" v-if="isEdit">
      <v-divider class="my-divider"></v-divider>
      <v-layout wrap row>
        <v-flex xs3>
          <v-btn style="height: 55px" block depressed flat color="orange" class="ma-0" @click="btnAction(3)">
            <v-icon size="28">iconfont icon-link</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn style="height: 55px" block depressed flat color="red" class="ma-0" @click="btnAction(4)">
            <v-icon size="28">iconfont icon-shanchu</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn style="height: 55px" block depressed flat color="blue" class="ma-0" @click="btnAction(5)">
            <v-icon size="22">iconfont icon-save</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn style="height: 55px" block depressed flat color="grey" class="ma-0" @click="btnAction(0)">
            <v-icon size="28">iconfont icon-aui-icon-back</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </div>

  </v-card>
</template>

<script>
  import copy from './copy'

  let _ = require("lodash")
  export default {
    components: {
      copy
    },
    props: {
      isEdit: {type: Boolean, default: false},
      editLink: {type: Object}
    },
    watch: {
      editLink: function () {
        this.link = _.clone(this.editLink)
      }
    },
    data: function () {
      return {
        link: {
          shortLink: "",
          longLink: "",
          note: ""
        },
        showDelete: false
      }
    },
    name: "editOrAddMobile",
    methods: {
      copy(isShort) {
        let link = ''
        if (isShort) {
          link = this.link.shortLink
        } else {
          link = this.link.longLink
        }
        this.$refs.copy.copy(link, isShort)
      },
      /**
       * @param index 操作指令
       * 0 取消
       * 1 转换链接
       * 2 复制短链接
       * 3 复制长链接
       * 4 删除该链接
       * 5 保存修改
       */
      btnAction(index) {
        switch (index) {
          case 0:
            this.$emit("cancel")
            break
          case 1:
            if (this.checkURL(this.link.longLink)) {
              let link = {
                url: this.link.longLink,
                note: this.link.note
              }
              this.$emit("transfer", link)
            } else {
              this.$message.warning("请检查要转换的链接！")
            }
            break
          case 2:
            this.copy(true)
            break
          case 3:
            this.copy(false)
            break
          case 4:
            this.showDelete = true
            break
          case 5:
            if (this.checkURL(this.link.longLink)) {
              this.$emit("saveLink", this.link)
            } else {
              this.$message.warning("请检查要转换的链接！")
            }
            break
        }
      },
      checkURL(URL) {
        //判断url地址是否正确
        let str = URL;
        let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        let objExp = new RegExp(Expression);
        return objExp.test(str) === true;
      },
      deleteLink() {
        this.$emit("deleteLink")
        this.showDelete = false
      }
    }
  }
</script>

<style scoped>
  .card-title {
    height: 8vh;
    font-size: 3vh;
    padding-top: 1.8vh;
    font-family: 微软雅黑, serif;
    background-color: #40A1FA;
    color: white;
    text-align: center;
  }

  .title-text {
    text-align: center;
    font-family: 微软雅黑, serif;
    font-size: 18px;
    padding-top: 8px;
  }

  .main-content {
    margin-top: 16%;
  }

  .edit-main {
    position: relative;
    height: 100%;
  }

  .btn-title {
    color: white;
    font-size: 20px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .card-action {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 55px;
  }

  .my-divider {
    margin-left: 5%;
    margin-top: -1px;
    position: absolute;
    width: 90%;
    border-color: #EBF0F2 !important;
  }

  .my-absolute-btn {
    bottom: 50px;
    right: 20px;
  }

  .icon-title {
    padding-top: 30px;
    text-align: center;
  }

  .card-text {
    font-size: 25px;
    font-family: 微软雅黑, serif;
    font-weight: 600;
    text-align: center;
  }
</style>
