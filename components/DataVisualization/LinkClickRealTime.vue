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
  const ONE_MINUTE_SECOND = 60//一分钟，秒数
  const ONE_MINUTE_MILLISECOND = 60000//一分钟，毫秒数
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
      this.clean()
    },
    props: {
      links: {
        type: Array
      }
    },
    data: function () {
      return {
        hourBefore: 1,//往前回溯几小时的数据
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
            minInterval: 1,
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
        timer: undefined,
      }
    },
    methods: {
      changed() {
        this.clean()
        this.getServerRealTimeData()
      },
      getServerRealTimeData() {//向后端服务器发起请求
        let nowDate = new Date()
        nowDate.setSeconds(0)//设置秒数为0
        let nowTime = Math.floor(nowDate / 1000)//获取当前时间到分钟
        let start = Math.floor(new Date(nowDate - 1000 * 3600 * this.hourBefore).getTime() / 1000)//获取起始时间点
        let linkIds = []//要请求的链接id
        _.forEach(this.links, link => {
          linkIds.push(link.id)
        })
        $linkApi.getRealTimeData(linkIds, start).then(res => {
          if (res.code === this.$code.SUCCESS) {
            this.realTimeData = this.handleResult(start, res.data, nowTime)
            //设置定时器用于定时请求
            let time = new Date()
            let nextTimeOut = new Date(time.getFullYear(), time.getMonth(),
              time.getDate(), time.getHours(), time.getMinutes(), time.getSeconds() + 30) - time//同步时间
            this.timer = setTimeout(() => {
              this.getServerRealTimeData()
            }, nextTimeOut)
          } else {
            if (this.$store.state.isLogin) {
              this.$message.error(res.msg)
            }
          }
        }).catch(e => {
          this.$message.error("网络异常，数据获取出错！")
        })
      },
      clean() {
        if (!_.isUndefined(this.timer))
          clearTimeout(this.timer)
      },
      handleResult(start, data, end) {//用于处理返回的数据集，将为0的数据项插入
        let res = []//返回数据
        let timeMap = new Map()
        _.forEach(data, item => {
          timeMap.set(item.time, item.click)
        })
        let insertZero = (timestamp) => {
          let time = new Date(timestamp * 1000)
          res.push({name: time, value: [transformTime2(timestamp), 0]})
        }
        let nowTime = start
        let times = ((Math.abs(nowTime - end)) / ONE_MINUTE_SECOND) + 1
        for (let i = 0; i < times; i++) {//处理数据为0的情况
          if (timeMap.has(nowTime)) {//存在该key
            res.push({name: new Date(nowTime * 1000), value: [transformTime2(nowTime), timeMap.get(nowTime)]})
          } else {//否则插入0
            insertZero(nowTime)
          }
          nowTime += ONE_MINUTE_SECOND
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
    color: rgba(86, 101, 115, .6);
    font-size: 40px;
    margin-top: 70px;
    margin-left: auto;
    margin-right: auto;
    width: 300px;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
