<template>
  <div style="height: 100vh">
    <div>
      <v-dialog max-width="480" v-model="notice" hide-overlay persistent>
        <v-card flat class="px-4 py-2">
          <div class="my-dialog-title mt-2">
            <v-icon size="38" class="mt-1" color="rgba(93,109,126,.81)">iconfont icon-info</v-icon>
            <span>
              用户通知
            </span>
          </div>
          <div class="dialog-content mt-2">
            <p v-html="msg">
            </p>
          </div>
          <div class="dialog-action mt-2 mb-3">
            <v-btn flat color="#2ECC71" depressed large block @click="notice=false">
              <v-icon size="40">done</v-icon>
              <span class="done">知道了</span>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <v-layout style="height: 100vh">
      <v-flex>
        <sidebar :now="nowPath"></sidebar>
      </v-flex>
      <v-flex md11>
        <toolbar></toolbar>
        <v-layout wrap>
          <v-card class="card" flat elevation="1">
            <transition :css="false" mode="out-in">
              <nuxt-child></nuxt-child>
            </transition>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
  import sidebar from '~/components/Sidebar.vue'
  import toolbar from '~/components/Toolbar.vue'
  import bottomNav from '~/components/bottomNav.vue'
  import {OtherApi} from "../api/Other";

  export default {

    watch: {
      '$route': function (from, to) {
        this.nowPath = this.$route.path
      }
    },
    data: function () {
      return {
        nowPath: this.$route.path,
        notice: false,
        msg: ""
      }
    },
    created() {
      if (this.$store.state.needNotice) {
        //需要显示公告
        let $otherApi = new OtherApi()
        $otherApi.getNotice().then(res => {
          if (res.code === this.$code.SUCCESS) {
            this.msg = res.data
            this.notice = true
          }
        })
        this.$store.commit("changeNotice", false)//关闭公告显示
      }
    },
    mounted() {
      setTimeout(() => {
        if (this.$store.state.isMobile) {//如果是手机端，跳转到手机界面
          this.$router.replace('/user_center_mobile')
        }
      }, 0)
    },
    methods: {},
    components: {sidebar, toolbar, bottomNav}
  }
</script>
<style scoped>
  .card {
    margin-left: auto;
    margin-right: auto;
    margin-top: 1.5vh;
    height: 85vh;
    width: 90%;
    border-radius: 10px;
  }

  .my-dialog-title {
    width: 100%;
    text-align: center;
  }

  .my-dialog-title span {
    margin-left: 10px;
    font-size: 28px;
    font-family: 微软雅黑, serif;
    color: #596F86;
    font-weight: 600;
    vertical-align: top;
  }

  .dialog-content {
    margin-left: auto;
    margin-right: auto;
    background-color: #F8F9F9;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    max-height: 300px;
    overflow: auto;
  }

  .dialog-content p {
    font-family: 微软雅黑, serif;
    line-height: 34px;
    font-size: 18px;
    color: #6D8195;
    white-space: pre-line;
    text-align: center;
  }

  .dialog-action {
    width: 100%;
    height: 40px;
  }

  .done {
    font-family: 微软雅黑, serif;
    font-size: 25px;
    margin-left: 8px;
  }
</style>
<style>
  .v-dialog {
    box-shadow: 0 0 10px 1px rgba(93, 109, 126, 0.5) !important;
    border-radius: 10px;
  }
</style>
