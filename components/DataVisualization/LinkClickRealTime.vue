<template>
  <div>
    <v-card class="pt-3 my-card" id="realTime" flat hover v-if="show">
      <v-slider v-model="hourBefore" max="24" min="1" color="#4EA1FF" @change="changed" class="choose-time"
                :label=labelMsg></v-slider>
      <div class="real-time-title">短链点击统计（每分钟）</div>
      <v-chart :autoresize=true :options="getUserRealTimeData"
               style="width: 100%!important;height: 31vh"></v-chart>
    </v-card>
    <v-card class="pt-3 my-card" flat hover v-else>
      <div class="real-time-title">短链点击统计（每分钟）</div>
      <div class="none">暂无数据！</div>
    </v-card>
  </div>
</template>

<script>
  import {LinkApi} from "../../api/LinkApi";
  import {transformTime2} from "../../utils";

  let $linkApi
  let _ = require("lodash")
  const ONE_MINUTE = 60//一分钟
  export default {
    name: 'LinkClickRealTime',//短链接点击统计（每分钟）
    computed: {
      getUserRealTimeData: function () {
        this.userRegisterRealTime.series[0].data = this.realTimeData
        return this.userRegisterRealTime
      },
      labelMsg: function () {
        return `往前（${this.hourBefore}小时）`
      },
      show: function () {
        return this.links.length > 0
      }
    },
    created() {
      $linkApi = new LinkApi()
    },
    destroyed() {
      clearInterval(this.timer)
    },
    props: {
      links: {
        type: Array
      }
    },
    data: function () {
      return {
        nowTime: null,//当前时间
        start: null,//实时数据起始时间点
        hourBefore: 6,//往前回溯几小时的数据
        stepTime: 60 * 1000,//间隔时间：1分钟
        userRegisterRealTime: {
          grid: {
            left: '7%',
            width: '87%',
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              params = params[0]
              let date = new Date(params.name)
              return '时间：' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) + '<br/>点击次数 : ' + params.value[1]
            },
            axisPointer: {
              type: 'none',
              animation: false
            }
          },
          xAxis: {
            axisTick: {lineStyle: {opacity: 0.3}},
            splitLine: {
              lineStyle: {
                type: 'dotted',
                opacity: 0.7
              },
            },
            axisLine: {
              lineStyle: {
                opacity: 0.2
              },
            },
            type: 'time',
            splitNumber: 8,
            axisLabel: {
              textStyle: {
                color: '#85929E',
                fontSize: 12,
                fontFamily: 'kaiti'
              }
            },
          },
          yAxis: {
            axisTick: {lineStyle: {opacity: 0.3}},
            type: 'value',
            axisLine: {
              lineStyle: {
                opacity: 0.2
              },
            },
            splitLine: {
              lineStyle: {
                type: 'dotted',
                opacity: 0.7
              },
            },
            boundaryGap: [0, '100%'],
            axisLabel: {
              textStyle: {
                color: '#85929E',
                fontSize: 12,
                fontFamily: 'kaiti'
              }
            },
          },
          series: [{
            name: '模拟数据',
            type: 'line',
            itemStyle: {
              color: '#B0BDFC'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1, color: '#D4DAFD'
                  },
                  {
                    offset: 0, color: '#9DADF8'
                  }
                ]
              }
            },
            smooth: true,
            showSymbol: false,
            hoverAnimation: true,
            data: null
          }]
        },//新用户注册实时更新图配置项
        realTimeData: [],//新用户注册实时更新图数据集
        timer: null
      }
    },
    methods: {
      changed() {
        this.getServerRealTimeData()
      },
      getServerRealTimeData() {//像后端服务器发起请求
        let tempDate = new Date()
        tempDate.setSeconds(0)
        this.nowTime = Math.floor(tempDate / 1000)//当前时间
        this.start = Math.floor(new Date(this.nowTime * 1000 - 1000 * 60 * 60 * this.hourBefore).getTime() / 1000)//获取起始时间点
        let linkIds = []
        _.forEach(this.links, link => {
          linkIds.push(link.id)
        })
        $linkApi.getRealTimeData(linkIds, this.start).then(res => {
          if (res.code === this.$code.SUCCESS) {
            this.realTimeData = this.handleResult(res.data)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(e => {
          this.$message.error(e)
        })
      },
      handleResult(data) {
        let res = []//返回数据
        let queue = []//后端服务器数据队列
        let insertZero = (timestamp) => {
          let time = new Date(timestamp * 1000)
          res.push({name: time, value: [transformTime2(timestamp), 0]})
        }
        _.forEach(data, item => {//遍历
          queue.push(item)
        })
        let nowTime = this.start
        let times = (Math.abs(nowTime - this.nowTime)) / ONE_MINUTE
        for (let i = 0; i < times; i++) {
          if (queue.length > 0) {
            let item = _.clone(queue[0])
            if (item.time === nowTime) {
              let time = new Date(nowTime * 1000)
              res.push({name: time, value: [transformTime2(nowTime), item.click]})
              queue.splice(0, 1)
            } else {
              insertZero(nowTime)
            }
          } else {
            insertZero(nowTime)
          }
          nowTime += ONE_MINUTE
        }
        return res
      },

    }
  }
</script>

<style>
  #realTime .v-label {
    font-family: 黑体, serif;
    color: #85929E;
  }
</style>
<style scoped>
  .my-card {
    border-radius: 10px;
    position: relative;
    height: 32vh;
  }

  .choose-time {
    position: absolute;
    right: 6%;
    z-index: 99;
    top: 3px;
    width: 30%;
  }

  .real-time-title {
    position: absolute;
    color: #566573;
    font-size: 20px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    left: 5%;
  }

  .none {
    color: rgba(86,101,115,.6);
    font-size: 40px;
    margin-top: 70px;
    margin-left: auto;
    margin-right: auto;
    width: 300px;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
