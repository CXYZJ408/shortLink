<template>
  <v-card flat class="my-card">
    <div class="toolbar">
      <div class="toolbar-title">最近跳转链接</div>
    </div>
    <div class="list">

      <div class="list-item px-3" v-for="item in list">
        <div class="list-item-up">
          <div class="d-inline-block icon">
            <v-icon color="#FF960C">iconfont icon-lianjieguanlian</v-icon>
          </div>
          <div class="short-link d-inline-block ml-2">{{item.shortLink}}</div>
          <div class="note d-inline-block">{{item.note.length>0?item.note:"无"}}</div>
        </div>
        <div class="list-item-down">
          <div class="long-link d-inline-block">{{item.longLink}}</div>
          <span class="time">{{item.time}}</span>
        </div>
        <v-divider class="divider-2"></v-divider>
      </div>

    </div>
    <div class="action text-md-right ">
      <v-btn color="white" small flat class="margin-0" @click="Refresh">
        <v-icon color="#C3CACE" size="13">iconfont icon-refresh</v-icon>
        <span class="btn-text ml-1">{{time}}秒更新</span></v-btn>
    </div>
  </v-card>
</template>

<script>
  import {LinkApi} from "../../api/LinkApi";
  import {transformTime2} from "../../utils";

  let $linkApi
  let _ = require("lodash")
  export default {
    name: 'LinkClickList',
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
            if (res.code === this.$code.SUCCESS) {
              this.list = []
              _.forEach(res.data, item => {
                let temp = _.clone(item)
                temp.time = transformTime2(temp.time)
                this.list.push(temp)
              })
            } else {
              if (this.$store.state.isLogin) {
                this.$message.error(res.msg )
              }
            }
            resolve(true)
          }).catch(e => {
            this.$message.error("网络异常，列表刷新出错！")
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
    data: function () {
      return {
        time: 15,
        timer: undefined,
        list: []
      }
    }
  }
</script>

<style scoped>
  .my-card {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    border: #E7EEF6 1px solid;
  }

  .action {
    height: 3.8vh;
    padding-right: 8px;
  }

  .list-item {
    height: 60px;
    padding-top: 5px;
    font-family: "微软雅黑", serif;
  }

  .list-item:hover {
    background-color: rgba(0, 0, 0, .02);
  }

  .list {
    overflow: auto;
    height: 56vh;
    width: 100%;
  }

  .list-item-up {
    width: 100%;
  }

  .list-item-down {
    color: #ADADBD;
    clear: both;
  }

  .icon {
    float: left;
    padding-top: 2px;
  }

  .short-link {
    margin-top: 2px;
    font-size: 16px;
    float: left;
    color: #41424E;
    width: 150px;
  }

  .note {
    font-size: 12px;
    color: #41424E;
    padding-top: 5px;
    float: right;
    white-space: nowrap;
    width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .long-link {
    font-size: 14px;
    white-space: nowrap;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .time {
    font-size: 12px;
    float: right;

  }

  .toolbar {
    width: 100%;
    font-size: 3vh;
    font-family: "黑体", serif;
    height: 7vh;
    background-color: #4EA1FF;
  }

  .toolbar-title {
    text-align: center;
    color: white;
    padding-top: 1.5vh;
  }


  .btn-text {
    color: #C3CACE;
    font-family: "黑体", serif;
    font-size: 13px;
  }
</style>
