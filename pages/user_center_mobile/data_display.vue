<template>
  <div class="data-display-div">
    <transition :css="false"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave">
      <div class="dialog" v-if="showDialog">
        <chooseLink @back="back"></chooseLink>
      </div>
    </transition>
    <v-toolbar flat color="#40A1FA">
      <span class="my-title">数据展示</span>
      <v-spacer></v-spacer>
      <v-btn icon dark depressed v-if="showData" @click="showDialog=true">
        <v-icon>iconfont icon-lianjie-duankai</v-icon>
      </v-btn>
    </v-toolbar>
    <div ref="data_display" class="main">
      <div class="data-display">
        <div v-if="showData" class="pt-3">
          <chooseTime @changeData="changeData"></chooseTime>
          <realTime ref="realTime" :links="links" :hourBefore="hourBefore"></realTime>
          <LinkForwardMonth ref="monthLink" :links="links"></LinkForwardMonth>
        </div>
        <div class="none-data" v-else>
          <div class="none-text display-2 ">图表暂无数据</div>
          <v-btn @click="showDialog=true" color="#18ADED" class="headline white--text" dark depressed block round>
            <span class="btn-title">选择短链接</span>
          </v-btn>
        </div>
      </div>
      <div class="list">
        <linkList></linkList>
      </div>
    </div>
  </div>

</template>

<script>
  import linkList from "../../components/Mobile/dataDisplay/linkList";
  import chooseLink from "../../components/Mobile/dataDisplay/chooseLink";
  import {LinkApi} from "../../api/LinkApi";
  import realTime from '../../components/Mobile/dataDisplay/realTime'
  import LinkForwardMonth from "../../components/Mobile/dataDisplay/LinkForwardMonth";
  import chooseTime from "../../components/Mobile/dataDisplay/chooseTime";

  let $linkApi
  let _ = require('lodash')
  export default {
    name: "data_display",
    created() {
      $linkApi = new LinkApi()
    },
    mounted() {
      let height = window.screen.availHeight - 55 - 56
      this.$refs.data_display.style.height = `${height}px`
    },
    components: {
      linkList, chooseLink, realTime, LinkForwardMonth, chooseTime
    },
    methods: {
      changeData(hourBefore) {
        this.hourBefore = hourBefore
      },
      back(links) {
        this.showDialog = false
        if (links.length > 0) {
          this.getData(links)
        }
      },
      beforeEnter(el) {
        el.style.marginLeft = "100vh"
      },
      enter(el, done) {
        this.$velocity(el, {marginLeft: 0}, [0.17, 0.67, 0.83, 0.67], {complete: done})
      },
      leave(el, done) {
        this.$velocity(el, {marginLeft: "100vh", display: "none"}, [0.17, 0.67, 0.83, 0.67], {complete: done})
      },
      getData(links) {
        this.links = links
        this.showData = true
        setTimeout(() => {
          if (!_.isUndefined(this.$refs.realTime)) {
            this.$refs.realTime.clean()//先清空计时器，防止之前的计时器还未失效
            this.$refs.realTime.getServerRealTimeData()
          }
          if (!_.isUndefined(this.$refs.monthLink)) {
            this.$refs.monthLink.clean()
            this.$refs.monthLink.getMonthData()
          }
        }, 10)
      }
    },
    data: function () {
      return {
        showData: false,
        showDialog: false,
        links: [],
        hourBefore: 1
      }
    }
  }
</script>

<style scoped>
  .empty {
    text-align: center;
    width: 100%;
    font-weight: bold;
    font-style: italic;
    font-family: "华文楷体", serif;
    font-size: 25px;
    color: rgba(40, 55, 71, .6);
  }

  .temp {
    margin-top: 40%;
  }

  .my-title {
    font-family: "微软雅黑", sans-serif;
    font-size: 20px;
    color: white;
  }

  .main {
    width: 100%;
    overflow: auto;
  }


  .data-display {
    width: 100%;
    min-height: 35vh;
    text-align: center;
  }

  .none-data {
    width: 80%;
    margin-right: auto;
    margin-left: auto;
  }

  .btn-title {
    font-family: "微软雅黑", sans-serif;
  }

  .dialog {
    position: absolute;
    z-index: 9999;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: white;
  }

  .none-text {
    font-family: "微软雅黑", sans-serif !important;
    color: #A5ADB4;
    height: 23vh;
    padding-top: 7vh;
  }
</style>
