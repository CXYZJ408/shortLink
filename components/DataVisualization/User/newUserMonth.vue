<template>
    <v-card flat id="userMonth" class="pt-3" hover style="border-radius: 10px">
        <v-chart :autoresize=true :options="newUserMonth" style="width: 100%!important;height: 318px"></v-chart>
    </v-card>
</template>

<script>
  export default {
    name: 'newUserMonth',
    created () {
      let today = new Date()
      this.start = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
      this.end = today
      this.handleData()
    },
    computed: {},
    methods: {
      handleData () {
        this.newUserMonth.series[0].data = this.getData(this.start, this.end)
      },
      getData (startDate, endDate) {//到后台获取数据信息
        // todo 替换成后端数据
        const oneDay = 1000 * 3600 * 24
        endDate = endDate.getTime()//转化为时间戳
        //生成假数据
        let result = []
        for (; startDate.getTime() <= endDate; startDate = new Date(+startDate + oneDay)) {
          let time = `${startDate.getFullYear()}/${(startDate.getMonth() + 1)}/${startDate.getDate()} ${startDate.getHours() >= 10 ? startDate.getHours() : '0' + startDate.getHours()}:${startDate.getMinutes() >= 10 ? startDate.getMinutes() : '0' + startDate.getMinutes()}:${startDate.getSeconds() >= 10 ? startDate.getSeconds() : '0' + startDate.getSeconds()}`
          let data = Math.floor(Math.random() * 100)
          result.push({
            name: startDate.toDateString(),
            value: [time, data]
          })
        }
        return result//数据返回
      }
    },
    data: function () {
      return {
        calendar: false,
        calendar2: false,
        step: 1,
        start: null,
        end: null,
        newUserMonth: {
          color: '#3398DB',
          legend: {
            left: 100
          },
          title: {
            text: '短链点击统计',
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
              return '时间：' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '<br/>注册人数 : ' + params.value[1]
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
            axisTick: { lineStyle: { opacity: 0.3 } },
            splitLine: {
              show:false
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

    #userMonth {
        position: relative;
    }
</style>
