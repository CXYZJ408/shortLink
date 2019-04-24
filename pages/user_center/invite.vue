<template>
  <v-layout row wrap justify-center id="invite">
    <input type="text" v-model="url" id="urlPath">
    <v-flex md10 style="margin-top: 5vh">
      <v-layout justify-center>
        <v-flex md2>
          <div class="invite text-md-right">邀请链接：</div>
        </v-flex>
        <v-flex md7>
          <el-input readonly v-model="url">
          </el-input>
        </v-flex>
        <v-flex md2 class="ml-3">
          <v-btn depressed color="green" flat round @click="copy">
            <v-icon>iconfont icon-share_link</v-icon>
            <span>一键复制</span></v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex md10 class="mt-5">
      <v-card class="card">
        <el-table
          height="60vh"
          stripe
          :lazy="true"
          ref="multipleTable"
          :cell-class-name="pointer"
          :data="users"
          tooltip-effect="dark"
          style="width: 100%">
          <slot slot="empty"><span class="empty-text">您还没有邀请任何人哦！</span></slot>
          <el-table-column
            fixed
            header-align="center"
            label="受邀人"
            prop="username"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="register_datetime"
            show-overflow-tooltip
            header-align="center"
            label="注册时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="days"
            label="赠送天数"
            header-align="center"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
  import {UserApi} from "../../api/UserApi";

  let $UserApi
  export default {
    transition: {
      beforeEnter(el) {
        console.log("before-enter")
        el.style.opacity = 0
      },
      enter(el, done) {
        console.log("enter")
        this.$velocity(el, {opacity: 1}, {duration: 1000}, {complete: done})
      },
      leave(el, done) {
        console.log("leave")
        this.$velocity(el, {opacity: 0}, {duration: 1000}, {complete: done})
      }
    },
    head: {
      title: "JumpLinker - 用户邀请"
    },
    name: "invite",
    computed: {
      url: function () {
        return `http://47.103.45.133/register?inviteId=${this.$store.state.user.userId}`
      }
    },
    data: function () {
      return {
        people: 0,
        users: []
      }
    },
    mounted() {
      $UserApi = new UserApi()
      this.$store.commit("setTitle", "好友邀请")
      $UserApi.inviteList().then(res => {
        if (res.code === this.$code.SUCCESS) {
          this.people = res.data.length
          this.users = res.data
        } else {
          if (this.$store.state.isLogin) {
            this.$message.error(res.msg)
          }
        }
      }).catch((e) => {
        if (this.$store.state.isLogin) {
          this.$message.error("网络异常，获取数据失败")
        }
      })
    },
    methods: {
      pointer({columnIndex}) {//设置表格class
        if (columnIndex <= 2 && columnIndex >= 0) {
          return "pointer"
        }
      },
      copy() {
        let url = document.getElementById('urlPath')
        url.select()
        document.execCommand('Copy')
        this.$message.success("链接复制成功！")
      }
    }
  }
</script>

<style scoped>

  #urlPath {
    opacity: 0;
    position: absolute;
    top: -100px;
  }

  .invite {
    font-size: 30px;
    color: #3D3D60;
    font-family: 黑体, serif;
  }

  .invite-text {
    font-size: 35px;
    color: #9A9AA8;
    font-family: 黑体, serif;
  }

  .invite-people {
    font-size: 40px;
    color: #FF9800;
    font-weight: 600;
    font-family: 黑体, serif;
  }

  .card {
    border-color: #E7EEF6 !important;
    border-width: 1px !important;
    box-shadow: 0 0 2px 1px #E7EEF6;
    border-radius: 3px;
  }

  .empty-text {
    font-family: 黑体, serif;
    font-weight: 600;
    font-size: 40px;
    font-style: italic;
    color: rgba(0,0,0,.25);

  }
</style>
<style>

  #invite .v-btn {
    margin: 0 !important;
  }

  .pointer {
    cursor: default;
  }

  .cell {
    font-family: 微软雅黑, serif;
  }

  .header {
    font-family: 微软雅黑, serif;
  }
</style>
