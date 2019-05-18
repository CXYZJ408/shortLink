<template>
  <div class="link-list">

    <div class="toolBar">
      <div class="left-title ">
        最新跳转：
      </div>
      <div class="right-title ">
        <v-btn color="#C3CACE" round small flat class="margin-0" @click="Refresh">
          <v-icon color="#C3CACE" size="13">iconfont icon-refresh</v-icon>
          <span class="btn-text ml-1">{{time}}秒更新</span>
        </v-btn>
      </div>
    </div>
    <v-expansion-panel class="list">
      <v-expansion-panel-content
        v-for="(item,index) in list"
        :key="index"
        ripple
      >
        <template v-slot:header class="pa-2">
          <div class="my-inline-div ">
            <v-icon color="#295A95" class="icon">iconfont icon-lianjieguanlian</v-icon>
          </div>
          <div class="short-link my-inline-div">{{item.shortLink}}</div>
        </template>
        <v-card class="pl-2">
          <div class="left-card my-inline-div">
            <div class="card-item-title">
              短&nbsp;&nbsp;链&nbsp;&nbsp;接:
            </div>
            <div class="card-item-title">
              原&nbsp;&nbsp;链&nbsp;&nbsp;接:
            </div>
            <div class="card-item-title">
              备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:
            </div>
            <div class="card-item-title">
              点击时间:
            </div>
          </div>
          <div class="right-card my-inline-div">
            <div class="card-item-title">{{item.shortLink}}</div>
            <div class="card-item-title long-link">{{item.longLink}}</div>
            <div class="card-item-title note">{{item.note}}</div>
            <div class="card-item-title">{{item.time}}</div>
          </div>

        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
  import {LinkApi} from "../../../api/LinkApi";
  import {transformTime2} from "../../../utils";

  let _ = require('lodash')
  let $linkApi
  export default {
    name: "linkList",
    mounted() {
      this.handleTime()
    },
    created() {
      $linkApi = new LinkApi()
      this.getList()
    },
    destroyed() {
      this.clean()
    },
    data: function () {
      return {
        time: 15,
        timer: undefined,
        list: []
      }
    },
    methods: {
      handleTime() {
        this.time = 15
        this.timer = setInterval(() => {
          if (this.time > 0) {
            this.time--
          } else {
            this.Refresh()
          }
        }, 1000)
      },
      getList() {
        //获取列表信息
        return new Promise((resolve) => {
          $linkApi.getJumpLink().then(res => {
            console.log(res)
            if (res.code === this.$code.SUCCESS) {
              this.list = []
              _.forEach(res.data, item => {
                let temp = _.clone(item)
                temp.time = transformTime2(temp.time)
                this.list.push(temp)
              })
            } else {
              if (this.$store.state.isLogin) {
                this.$message.error(res.msg)
              }
            }
            resolve(true)
          }).catch(e => {
            if (this.$store.state.isLogin) {
              this.$message.error("网络异常，列表刷新出错！")
            }
            this.clean()
            this.time = 0
          })
        })
      },
      clean() {
        if (!_.isUndefined(this.timer)) {
          clearInterval(this.timer)//清除计时器
        }
      },
      Refresh() {
        this.clean()
        this.getList().then(() => {
          this.handleTime()
        })
      }
    },

  }
</script>

<style scoped>
  .link-list {
    width: 100%;
    padding-left: 3vh;
    padding-right: 3vh;
    height: 50vh;
    position: relative;
  }

  .my-inline-div {
    display: inline-block;
    vertical-align: top;
  }

  .left-title {
    font-family: "微软雅黑", sans-serif;
    font-size: 2.8vh;
    color: #032D60;
    float: left;
  }

  .right-title {
    float: right;
  }

  .toolBar {
    width: 100%;
    height: 5vh;
  }

  .list {
    height: 45vh;
    overflow: auto;
    width: 100%;
  }

  .icon {
  }

  .short-link {
    font-size: 18px;
    font-family: "微软雅黑", sans-serif;
    color: #032D60;
  }

  .note {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-family: "微软雅黑", sans-serif;
  }

  .list::-webkit-scrollbar {
    width: 0;
  }

  .left-card {
    width: 25%;
    color: #808B96;

  }

  .card-item-title {
    font-size: 2vh;
    font-family: "微软雅黑", sans-serif;
    width: 100%;
    height: 3.8vh;
  }

  .long-link {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .right-card {
    width: 70%;
    color: #AEB6BF;
  }


</style>
<style>
  .v-expansion-panel__header {
    padding: 10px !important;
  }

  .theme--light.v-expansion-panel .v-expansion-panel__container {
    border: 0;
  }

  .v-expansion-panel {
    box-shadow: none;
  }
</style>
