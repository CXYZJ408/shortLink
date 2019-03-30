<template>
    <v-card class="pt-3"   flat hover style="border-radius: 10px;">
        <v-chart :options="userDataPie" :autoresize=true style="width: 100%!important;height: 318px"></v-chart>
    </v-card>
</template>

<script>
  export default {
    name: 'newUserPie',
    data: function () {
      return {
        userDataPie: {
          title: {
            top: '4',
            text: '点击时段分布',
            left:'center',
            textStyle: {
              color: '#566573',
              fontSize: 28,
              fontFamily: 'kaiti'
            }

          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            bottom: '4%',
            data: ['上午', '中午', '下午', '晚上']
          },
          series: [
            {
              name: '点击时段',
              type: 'pie',
              radius: ['45%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },

              data: [
                { value: 310, name: '上午', itemStyle: { color: '#4DA2FF' } },
                { value: 234, name: '中午', itemStyle: { color: '#82D585' } },
                { value: 135, name: '下午', itemStyle: { color: '#FFCB27' } },
                { value: 148, name: '晚上', itemStyle: { color: '#FF7A8B' } }
              ]
            }
          ]
        },//用户新增时段图
      }
    }
  }
</script>

<style scoped>

</style>
