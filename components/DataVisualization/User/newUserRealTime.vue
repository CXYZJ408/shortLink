<template>
    <v-card class="pt-3" id="realTime" flat hover style="border-radius: 10px;position: relative;">
        <v-slider v-model="hourBefore" max="10" min="1" color="#4EA1FF" @change="changed" class="choose-time"
                  :label=labelMsg></v-slider>
        <v-chart :autoresize=true :options="getUserRealTimeData"
                 style="width: 100%!important;height: 318px"></v-chart>
    </v-card>
</template>

<script>
  export default {
    name: 'newUserRealTime',
    computed: {
      getUserRealTimeData: function () {
        this.userRegisterRealTime.series[0].data = this.realTimeData
        return this.userRegisterRealTime
      },
      labelMsg: function () {
        return `往前（${this.hourBefore}小时）`
      }
    },
    created () {
      this.handleRealTimeData()
    },
    destroyed () {
      clearInterval(this.timer)
    },
    data: function () {
      return {
        // timeBefore: 3,
        nowTime: null,//当前时间
        start: null,//实时数据起始时间点
        hourBefore: 1,//往前回溯几小时的数据
        stepTime: 60 * 1000,//间隔时间：1分钟
        userRegisterRealTime: {
          grid: {
            left: '7%',
            width: '87%',
          },
          title: {
            text: '短链点击统计（每分钟）',
            left: '5%',
            textStyle: {
              color: '#566573',
              fontSize: 28,
              fontFamily: 'kaiti'
            }
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
            axisTick: { lineStyle: { opacity: 0.3 } },
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
                fontSize: 16,
                fontFamily: 'kaiti'
              }
            },
          },
          yAxis: {
            axisTick: { lineStyle: { opacity: 0.3 } },
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
      changed () {
        this.handleRealTimeData()
      },
      handleRealTimeData () {
        //处理实时用户注册量数据
        //初始化相关数据
        this.nowTime = new Date()//当前时间
        this.start = new Date(this.nowTime - 1000 * 60 * 60 * this.hourBefore)//获取起始时间点
        this.realTimeData = this.setDate(this.getDataTillNow())//获取从5小时前到现在的数据集
        let time = new Date(this.nowTime.getFullYear(), this.nowTime.getMonth(),
          this.nowTime.getDate(), this.nowTime.getHours(), this.nowTime.getMinutes() + 1) - this.nowTime//同步时间
        let handle = () => {
          this.realTimeData.shift()
          this.realTimeData.push(this.setDate(this.getRealTimeData(), this.start)[0])
        }
        setTimeout(() => {
          handle()
          this.timer = setInterval(() => {//添加每分钟的数据
            handle()
          }, 60 * 1000)
        }, time)

      },
      getRealTimeData () {//向后台请求1分钟内的实时数据
        return [Math.floor(Math.random() * 100)]
      },
      getDataTillNow () {//向后台请求从5小时前到现在的数据集
        let times = Math.floor((this.nowTime - this.start) / this.stepTime)
        let resultData = []
        for (let i = 0; i < times; i++) {
          resultData.push(Math.floor(Math.random() * 100))
        }
        return resultData
      },
      getTime () {//获取时间信息
        this.start = new Date(+this.start + this.stepTime)//日期
        let nowDate = `${this.start.getFullYear()}/${(this.start.getMonth() + 1)}/${this.start.getDate()} ${this.start.getHours() >= 10 ? this.start.getHours() : '0' + this.start.getHours()}:${this.start.getMinutes() >= 10 ? this.start.getMinutes() : '0' + this.start.getMinutes()}:${this.start.getSeconds() >= 10 ? this.start.getSeconds() : '0' + this.start.getSeconds()}`
        return [this.start, nowDate]
      },
      setDate (realTimeDataSet) {//设置数据集的时间，以5分钟为一个单位，并将数据格式化后返回
        let resultData = [] //返回的数据
        for (let i = 0; i < realTimeDataSet.length; i++) {//取出每一个数据，并将数据的日期添加上
          let time = this.getTime()
          resultData.push({
            name: time[0].toString(),
            value: [
              time[1],
              realTimeDataSet[i]
            ]
          })
        }
        return resultData
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
    .choose-time {
        position: absolute;
        right: 6%;
        z-index: 999;
        top: 3px;
        width: 30%;
    }

</style>
