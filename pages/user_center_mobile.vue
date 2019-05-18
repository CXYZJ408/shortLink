<template>
  <v-card height="100vh" class="hidden-md-and-up" flat style="position: relative">
    <div>
      <v-dialog max-width="50vh" v-model="notice" hide-overlay persistent>
        <v-card flat class="px-3 py-2">
          <div class="my-dialog-title mt-2">
            <v-icon size="4vh" class="mt-1" color="rgba(93,109,126,.81)">iconfont icon-info</v-icon>
            <span>
              用户通知
            </span>
          </div>
          <div class="dialog-content mt-2">
            <p v-html="msg">
            </p>
          </div>
          <div class="dialog-action mt-2 mb-3">
            <v-btn flat color="#2ECC71" depressed block @click="notice=false">
              <v-icon size="4vh">done</v-icon>
              <span class="done">知道了</span>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <div>
      <nuxt-child></nuxt-child>
    </div>
    <div class="bottom-nav">
      <bottom-nav :now="nowPath"></bottom-nav>
    </div>
  </v-card>
</template>

<script>
  import bottomNav from '../components/Mobile/layout/bottomNav.vue'
  import {OtherApi} from "../api/Other";

  export default {
    name: "user_center_mobile",
    components: {bottomNav},
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
    watch: {
      '$route': function (from, to) {
        this.nowPath = this.$route.path
      }
    },
    mounted() {
      if (!this.$store.state.isMobile) {//如果不是手机端，跳转到PC界面
        this.$router.replace('/user_center')
      }

    },
  }
</script>

<style scoped>
  .bottom-nav {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 55px;
  }

  .my-dialog-title {
    width: 100%;
    text-align: center;
  }

  .my-dialog-title span {
    margin-left: 5px;
    font-size: 3vh;
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
    max-height: 30vh;
    overflow: auto;
  }

  .dialog-content p {
    font-family: 微软雅黑, serif;
    line-height: 3vh;
    font-size: 1.8vh;
    color: #6D8195;
    white-space: pre-line;
    text-align: center;
  }

  .dialog-action {
    width: 100%;
    height: 5vh;
  }

  .done {
    font-family: 微软雅黑, serif;
    font-size: 3vh;
    margin-left: 5px;
  }
</style>
<style>
  .v-dialog {
    box-shadow: 0 0 10px 1px rgba(93, 109, 126, 0.5);
    border-radius: 10px;
    margin: 10px;
  }
</style>
