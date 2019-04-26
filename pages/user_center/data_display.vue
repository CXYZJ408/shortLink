<template>
  <v-layout row wrap justify-center mt-4 class="px-4">
    <v-flex md3 class="text-md-right"><span class="text">要统计的短链接：</span></v-flex>
    <v-flex md6>
      <selection :links="links" @getUserLinks="getUserLinks" ref="selection"></selection>
    </v-flex>
    <v-flex md2 class="pl-2">
      <v-btn color="#2ECC71" round dark depressed @click="handleLinks">
        <v-icon>done</v-icon>
        <span class="done px-2">确定</span></v-btn>
    </v-flex>
    <v-flex md11 class="mt-4">
      <v-layout px-2 justify-center class="px-3">
        <v-flex md8>
          <v-layout row wrap>
            <v-flex md12>
              <no-ssr>
                <linkClickRealTime ref="linkClickRealTime" :links="timeLinks"></linkClickRealTime>
              </no-ssr>
            </v-flex>
            <v-flex md12 class=" mt-2">
              <no-ssr>
                <linkForwardMonth :links="timeLinks" ref="monthLink"></linkForwardMonth>
              </no-ssr>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md4 class=" pl-3">
          <linkClickList></linkClickList>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import selection from '../../components/Selections'
  import linkClickRealTime from '../../components/DataVisualization/LinkClickRealTime'
  import linkClickList from '../../components/DataVisualization/LinkClickList'
  import linkForwardMonth from "../../components/DataVisualization/LinkForwardMonth.vue"
  import {LinkApi} from "../../api/LinkApi";

  let $linkApi
  let _ = require("lodash")
  export default {
    transition: {
      beforeEnter(el) {
        console.log("before-enter")
        el.style.opacity = 0
      },
      enter(el, done) {
        console.log("enter")
        this.$velocity(el, {opacity: 1}, {duration: 1000}, {complete: done})
      },
      leave(el, done) {
        console.log("leave")
        this.$velocity(el, {opacity: 0}, {duration: 1000}, {complete: done})
      }
    },
    head: {
      title: "JumpLinker - 数据统计"
    },
    name: "data_display",
    components: {selection, linkClickRealTime, linkClickList, linkForwardMonth},
    data: function () {
      return {
        linkList: undefined,
        links: [],
        timeLinks: []
      }
    },
    created() {
      $linkApi = new LinkApi()
      this.getUserLinks()
      this.$store.commit("setTitle", "数据统计")
    },
    methods: {
      handleLinks() {
        //处理要获取相关数据的链接
        this.timeLinks = []
        _.forEach(this.links, link => {
          if (link.checked) {
            this.timeLinks.push(link)
          }
        })
        if (this.timeLinks.length > 0) {
          setTimeout(() => {
            if (!_.isUndefined(this.$refs.linkClickRealTime)) {
              this.$refs.linkClickRealTime.clean()//先清空计时器，防止之前的计时器还未失效
              this.$refs.linkClickRealTime.getServerRealTimeData()
            }
            if (!_.isUndefined(this.$refs.monthLink)) {
              this.$refs.monthLink.clean()
              this.$refs.monthLink.getMonthData()
            }
          }, 10)
        } else {
          this.$message.warning("请选择要统计的链接")
        }
      },
      getUserLinks(tempLink) {
        this.links = []
        let flag = false//标志位，用于标记templink是否存在
        if (_.isArray(tempLink)) {
          flag = true
        }
        $linkApi.getUserAllLinks().then(res => {
          if (res.code === this.$code.SUCCESS) {
            let num = 0
            _.forEach(res.data.links, link => {
              let checked = flag && tempLink.indexOf(link.id) !== -1//判断是否之前选择过
              if (checked) {
                num++
              }
              this.links.push({
                checked: checked,
                title: link.shorturl,
                note: link.note,
                id: link.id
              })
            })
            if (!_.isUndefined(this.$refs.selection)) {
              this.$refs.selection.checkedNums = num
            }
          } else {
            if (this.$store.state.isLogin) {
              this.$message.error(res.msg)
            }
          }
        }).catch(e => {
          this.$message.error("网络异常，用户短链获取出错！")
        })
      },
    }
  }
</script>

<style scoped>
  .text {
    font-size: 25px;
    color: #41424E;
    font-family: 微软雅黑, serif;
  }

  .done {
    font-size: 18px;
    font-family: 微软雅黑, serif;
  }
</style>
