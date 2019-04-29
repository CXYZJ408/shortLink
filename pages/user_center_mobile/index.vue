<template>
  <div>
    <v-dialog v-model="editOrAddDialog" fullscreen :hide-overlay="false" transition="dialog-bottom-transition">
      <editOrAdd @deleteLink="deleteLink" @cancel="cancel" :isEdit="editModel" @transfer="transfer"
                 @saveLink="saveLink" :editLink="editLink"></editOrAdd>
    </v-dialog>
    <v-toolbar flat color="blue">
      <span class="list-title">短链接</span>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon color="white" flat @click="addLink">
          <v-icon>iconfont icon-add</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout row wrap pt-1 class="list" :style="{'height':height+'px'}">
      <v-flex xs12>
        <div ref="box">
          <div class="list-item" v-for="(item,index) in linkList">
            <div @click="showEditDialog(index)" class="px-2" v-ripple="{ class: 'grey--text'}">
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
            <v-divider style="color: #EBF0F2"></v-divider>
          </div>
        </div>
      </v-flex>
      <v-flex xs12 v-if="linkList.length>0">
        <div class="empty" v-if="showLoading">正在加载中。。。</div>
        <div id="observe" v-else style="width: 1px;height: 1px;"></div>
        <div class="empty" v-if="noneData">没有数据啦！</div>
      </v-flex>
      <v-flex xs12 v-else>
        <div class="empty">您还没有添加任何短链接哦！</div>
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
    head: {
      title: "JumpLinker - 短链接"
    },
    components: {
      editOrAdd
    },
    data: function () {
      return {
        page: {},
        linkList: [],
        height: 0,
        startTouchSize: 0,
        lastIndex: -1,
        editOrAddDialog: false,
        editLink: {
          shortLink: "",
          longLink: "",
          note: ""
        },
        lastLength: 0,
        showLoading: false,
        noneData: false,
        editModel: true,
        editIndex: -1
      }
    },
    //todo 加载动画
    mounted() {
      this.setHeight()//设置页面高度
      this.setEvent()
      $linkApi = new LinkApi()
      this.init()
    },
    methods: {
      init() {
        this.showLoading = true
        this.linkList = []
        return new Promise(resolve => {
          this.getLinkList(1).then(res => {
            this.loadLinkToPage(res)
            resolve(true)
          }).catch(e => {
            if (this.$store.state.isLogin) {
              this.$message.error(e)
            }
          })
        })
      },
      loadLinkToPage(res) {
        _.forEach(res, item => {
          this.linkList.push(item)//将链接添加到页面上
        })
        this.setObserve()//设置观察者
      },
      setObserve() {
        this.showLoading = false
        if (this.page.page < this.page.total) {
          //如果还有数据没有加载出来，则启用观察者
          setTimeout(() => {//延迟加载
            this.startObserve()
          }, 0)
        } else {
          this.noneData = true
        }
      },
      startObserve() {//开始观察对象是否被用户看到
        let observe = new IntersectionObserver((el) => {
          if (el[0].intersectionRatio <= 0) return;
          observe.unobserve(el[0].target)//关闭观察者，防止重复观察
          this.loadNextPage()//加载下一页数据
        })
        observe.observe(document.getElementById("observe"))//开始观察
      },
      showEditDialog(index) {
        this.editModel = true
        this.editOrAddDialog = true
        this.editIndex = index
        this.editLink = this.linkList[index]
      },
      cancel() {
        this.editOrAddDialog = false
        this.editIndex = -1
      },
      setEvent() {
        window.onresize = () => {
          this.setHeight()
        }
      },
      setHeight() {
        this.height = window.innerHeight - 56 - 36
      },
      loadNextPage() {//加载下一页内容
        this.showLoading = true//显示加载字样
        this.getLinkList(this.page.page + 1).then(data => {//获取数据
          this.loadLinkToPage(data)//添加到页面上
        }).catch(e => {
          if (this.$store.state.isLogin) {
            this.$message.error(e)
          }
        })
      },
      getLinkList(page) {//获取指定页面的数据
        return new Promise((resolve, reject) => {
          $linkApi.getLinkList(page, 13).then(res => {
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
          })
        })
        this.lastLength = data.length
        return data
      },
      deleteLink() {
        $linkApi.deleteLink([this.editLink.id]).then(res => {
          if (res.code === this.$code.SUCCESS) {
            //删除成功后，向后端重新请求数据
            this.editOrAddDialog = false
            this.$message.success("删除成功！")
            this.init()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(e => {
          this.$message.error(e)
        })
      },
      addLink() {
        this.editLink = {
          longLink: "",
          note: ""
        }
        this.editOrAddDialog = true
        this.editModel = false
      },
      transfer(link) {
        //转换完成后将模式切换为编辑模式
        //todo 添加动画效果
        $linkApi.transfer([link]).then(res => {
          if (res.code === this.$code.SUCCESS) {
            let link = res.data[0]
            this.editLink = {
              id: link.id,
              longLink: link.longurl,
              shortLink: link.shorturl,
              note: link.note,
            }
            this.editModel = true
            this.$message.success("转换成功！")
            //转换完成后，重新加载页面数据
            this.init().then(() => {
              for (let i = 0; i < this.linkList.length; i++) {
                if (this.linkList[i].id === link.id) {
                  this.editIndex = i
                  break
                }
              }
            })
          } else {
            if (this.$store.state.isLogin) {
              this.$message.error(res.msg)
            }
          }
        })
      },
      saveLink(editLink) {
        console.log("editLink:", editLink)
        $linkApi.editLink(editLink.id, editLink.longLink, editLink.note).then(res => {
          if (res.code === this.$code.SUCCESS) {
            let newLink = res.data
            if (this.editIndex !== -1) {
              this.$set(this.linkList, this.editIndex, {
                id: newLink.id,
                longLink: newLink.longurl,
                shortLink: newLink.shorturl,
                note: newLink.note
              })
            }
            this.editOrAddDialog = false
            this.editIndex = -1
            this.$message.success("修改成功！")
          } else {
            this.$message.error(res.msg)
          }
        }).catch(e => {
          this.$message.error(e)
        })
      }
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
    height: 55px;
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

  .long-link {
    font-size: 14px;
    white-space: nowrap;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .empty {
    text-align: center;
    width: 100%;
    font-weight: bold;
    font-style: italic;
    font-family: "华文楷体",serif;
    font-size: 25px;
    color: rgba(40, 55, 71,.6);
  }


</style>
