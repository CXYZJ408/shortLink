<template>
  <v-card flat id="userMonth" class="pt-3 my-card" hover v-if="show">
    <div class="real-time-title">短链点击统计（每月）</div>
    <v-chart :autoresize=true :options="newUserMonth" style="width: 100%!important;height: 31vh"></v-chart>
  </v-card>
  <v-card class="pt-3 my-card" flat hover v-else>
    <div class="real-time-title">短链点击统计（每月）</div>
    <div class="none">暂无数据！</div>
  </v-card>
</template>

<script>
  import {LinkApi} from "../../api/LinkApi";
  import {transformTime2} from "../../utils";

  let $linkApi
  let _ = require("lodash")
  let moment = require("moment")
  export default {
    name: 'LinkForwardMonth',
    props: {
      links: {
        type: Array
      }
    },
    created() {
      $linkApi = new LinkApi()
    },
    destroyed(){
      this.clean()
    },
    computed: {
      show: function () {
        return this.links.length > 0
      }
    },
    methods: {
      handleResult(start, data) {//用于处理返回的数据集，将为0的数据项插入
        let res = []//返回数据
        let timeMap = new Map()
        _.forEach(data, item => {
          timeMap.set(item.time, item.click)
        })
        let insertZero = (timestamp) => {
          let time = new Date(timestamp * 1000)
          res.push({name: time, value: [transformTime2(timestamp), 0]})
        }
        console.log(timeMap)
        for (let i = 0; i < 30; i++) {//处理数据为0的情况
          start.add(1, "days")
          if (timeMap.has(start.unix())) {//存在该key
            res.push({name: start.toDate(), value: [transformTime2(start.unix()), timeMap.get(start.unix())]})
          } else {//否则插入0
            insertZero(start.unix())
          }
        }
        return res
      },
      clean() {
        if (!_.isUndefined(this.timer))
          clearTimeout(this.timer)
      },
      getMonthData() {
        let links = []
        _.forEach(this.links, link => {//添加要请求的链接
          links.push(link.id)
        })
        $linkApi.getLinkMonthData(links).then(res => {//获取数据
          if (res.code === this.$code.SUCCESS) {
            let today = moment()
            today.hour(0).minute(0).second(0)
            this.newUserMonth.series[0].data = this.handleResult(today.subtract(30, "days"), res.data, today)
            this.timer = setTimeout(() => {
              this.getMonthData()
            }, 30000)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.$message.error("网络异常，获取月份数据失败")
        })
      },
    },
    data: function () {
      return {
        calendar: false,
        calendar2: false,
        step: 1,
        start: null,
        end: null,
        timer: undefined,
        newUserMonth: {
          color: '#3398DB',
          legend: {
            left: 100
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              params = params[0]
              let date = new Date(params.name)
              return '时间：' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '<br/>点击次数 : ' + params.value[1]
            },
            axisPointer: {
              type: 'none',
              animation: false
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            axisTick: {lineStyle: {opacity: 0.3}},
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                opacity: 0.2
              },
            },
            type: 'time',
            splitNumber: 8,
            axisLabel: {
              interval: 7,
              showMinLabel: false,
              textStyle: {
                color: '#85929E',
                fontSize: 14,
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
                fontSize: 16,
                fontFamily: 'kaiti'
              }
            },
          },
          series: [
            {
              type: 'bar',
              barWidth: '60%',
              data: []
            }
          ]
        }
      }
    }
  }
</script>

<style scoped>
  .date-start {
    position: relative;
  }

  .my-card {
    border-radius: 10px;
    /*background-color: rgba(174, 214, 241, .1);*/
  }

  .date-choose {
    position: absolute;
    z-index: 999;
    right: 5%;
    width: 400px;
  }

  .label {
    padding-top: 12px;
    margin-top: 4px;
    font-family: KaiTi, serif;
    font-size: 22px;
    color: #757575;
  }

  .real-time-title {
    position: absolute;
    color: #566573;
    font-size: 20px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    left: 5%;
  }

  #userMonth {
    position: relative;
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

  .my-card {
    border-radius: 10px;
    position: relative;
    height: 32vh;
  }
</style>
