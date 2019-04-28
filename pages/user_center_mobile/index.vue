<template>
  <div>
    <v-dialog v-model="editDialog" fullscreen :hide-overlay="false" transition="dialog-bottom-transition">
      <editOrAdd @cancel="editDialog=false" :isEdit="editDialog" :editLink="editLink"></editOrAdd>
    </v-dialog>
    <v-toolbar flat color="blue">
      <span class="list-title">短链（10）</span>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon color="white" flat>
          <v-icon>iconfont icon-add</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex md12>
        <div class="list" :style="{'height':height+'px'}" ref="box">
          <div class="list-item px-3" v-for="(item,index) in linkList">
            <div @click="showEditDialog(index)" v-ripple>
              <div class="list-item-up">
                <div class="d-inline-block icon">
                  <v-icon color="#FF960C">iconfont icon-lianjieguanlian</v-icon>
                </div>
                <div class="short-link d-inline-block ml-2">{{item.shortLink}}</div>
                <div class="note d-inline-block">{{item.note.length>0?item.note:""}}</div>
              </div>
              <div class="list-item-down">
                <div class="long-link d-inline-block">{{item.longLink}}</div>
              </div>
            </div>
            <v-divider class="divider-2"></v-divider>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import {LinkApi} from "../../api/LinkApi";
  import editOrAdd from '../../components/editOrAddMobile'

  let $linkApi
  let _ = require('lodash')

  export default {
    name: "index",
    components: {
      editOrAdd
    },
    data: function () {
      return {
        linkList: [],
        height: 0,
        startTouchSize: 0,
        lastIndex: -1,
        editDialog: false,
        editLink: {}
      }
    },
    mounted() {
      this.setHeight()//设置页面高度
      this.setEvent()

      $linkApi = new LinkApi()
      this.getLinkList(1).then(res => {
        _.forEach(res, item => {
          this.linkList.push(item)

        })
      }).catch(e => {
        if (this.$store.state.isLogin) {
          this.$message.error(e)
        }
      })
    },
    methods: {
      btnAction(index) {
        this.editDialog = false
      },
      showEditDialog(index) {
        this.editDialog = true
        this.editLink = this.linkList[index]
      },
      setEvent() {
        window.onresize = () => {
          this.setHeight()
        }
      },
      setHeight() {
        this.height = window.innerHeight - 56 - 36
      },
      getLinkList(page) {//获取指定页面的数据
        return new Promise((resolve, reject) => {
          $linkApi.getLinkList(page).then(res => {
            // console.log(this.$code.SUCCESS)
            if (res.code === this.$code.SUCCESS) {
              //成功获取数据
              //进行数据的转换
              resolve(this.handleResult(res.data.page, res.data.links))
            } else {
              reject(res.msg)
            }
          })
        })
      },
      handleResult(page, links) {
        //处理列表数据结果
        this.page = page
        let data = []
        _.forEach(links, link => {
          data.push({
            id: link.id,
            longLink: link.longurl,
            shortLink: link.shorturl,
            note: link.note,
            width: 100,
            show: false
          })
        })
        return data
      },

    }

  }
</script>

<style scoped>
  .list-title {
    font-family: "微软雅黑", sans-serif;
    font-size: 20px;
    color: white;
  }

  .list {
    overflow: auto;
    width: 100%;
  }

  .list-item {
    height: 60px;
    padding-top: 5px;
    font-family: "微软雅黑", serif;
  }

  .list-item-up {
    width: 100%;
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

  .list-item-down {
    color: #ADADBD;
    clear: both;
  }

  .option {
    vertical-align: top;
    text-align: center;

  }

  .long-link {
    font-size: 14px;
    white-space: nowrap;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }


</style>
