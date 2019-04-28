<template>
  <v-card flat>
    <div class="card-title">{{isEdit?"链接编辑":"添加链接"}}</div>
    <v-btn
      v-if="!isEdit"
      absolute
      dark
      fab
      class="my-absolute-btn"
      color="grey"
      flat
    >
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
      <v-layout>
        <v-flex>
          <v-btn block depressed flat color="orange" class="ma-0" @click="btnAction(3)">
            <v-icon size="25">iconfont icon-link</v-icon>
          </v-btn>
        </v-flex>
        <v-flex>
          <v-btn block depressed flat color="red" class="ma-0" @click="btnAction(4)">
            <v-icon size="28">iconfont icon-shanchu</v-icon>
          </v-btn>
        </v-flex>
        <v-flex>
          <v-btn block depressed flat color="blue" class="ma-0" @click="btnAction(5)">
            <v-icon size="22">iconfont icon-save</v-icon>
          </v-btn>
        </v-flex>
        <v-flex>
          <v-btn block depressed flat color="grey" class="ma-0" @click="btnAction(0)">
            <v-icon size="28">iconfont icon-aui-icon-back</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </div>

  </v-card>
</template>

<script>
  export default {
    props: {
      isEdit: {type: Boolean, default: false},
      editLink: {type: Object}
    },
    watch: {
      isEdit: function () {
        if (this.isEdit) {
          this.link = this.editLink
        }
      }
    },
    data: function () {
      return {
        link: {
          shortLink: "",
          longLink: "",
          note: ""
        }
      }
    },
    mounted() {
      console.log("dialogCreate")
    },
    destroyed() {
      console.log("dialogDestroyed")
    },
    name: "editOrAddMobile",
    methods: {
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
            this.$emit("btnAction", index)
            break
          case 2:
            this.$emit("btnAction", index)
            break
          case 3:
            this.$emit("btnAction", index)
            break
          case 4:
            this.$emit("btnAction", index)
            break
          case 5:
            this.$emit("btnAction", index)
            break
        }
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
    background-color: #3FA3F9;
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
    height: 36px;
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
</style>
