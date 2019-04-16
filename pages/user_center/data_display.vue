<template>
  <v-layout row wrap justify-center mt-4 class="px-4">
    <v-flex md3 class="text-md-right"><span class="text">要统计的短链接：</span></v-flex>
    <v-flex md6>
      <selection :links="links" @getUserLinks="getUserLinks"></selection>
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
                <linkClickRealTime ref="linkClickRealTime" :links="realTimeLinks"></linkClickRealTime>
              </no-ssr>
            </v-flex>
            <v-flex md12 class=" mt-2">
              <no-ssr>
                <linkForwardMonth></linkForwardMonth>
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
    name: "data_display",
    components: {selection, linkClickRealTime, linkClickList, linkForwardMonth},
    data: function () {
      return {
        linkList: undefined,
        links: [],
        realTimeLinks: []
      }
    },
    created() {
      $linkApi = new LinkApi()
      this.getUserLinks()
    },
    methods: {
      handleLinks() {
        //处理要获取相关数据的链接
        this.realTimeLinks = []
        _.forEach(this.links, link => {
          if (link.checked) {
            this.realTimeLinks.push(link)
          }
        })
        this.$refs.linkClickRealTime.getServerRealTimeData()
      },
      getUserLinks() {
        console.log("getUserLinks")
        $linkApi.getUserAllLinks().then(res => {
          console.log(res.data)
          if (res.code === this.$code.SUCCESS) {
            _.forEach(res.data.links, link => {
              this.links.push({
                checked: false,
                title: link.shorturl,
                note: link.note,
                id: link.id
              })
            })
          } else {
            this.$message.error(res.msg)
          }
        }).catch(e => {
          this.$message.error(e)
        })
      },
      getRealTime(links, isUpdate) {

      },
      getMonth() {

      }
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
