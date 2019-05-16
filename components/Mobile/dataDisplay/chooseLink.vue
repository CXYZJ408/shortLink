<template>
  <div class="choose-link-dialog" ref="dialog">
    <v-btn v-if="show" absolute v-ripple="{ class: 'blue--text'}" fab class="my-absolute-btn"
           color="rgba(240,240,244,0.3)"
           depressed @click="back">
      <v-icon size="30" color="#42426A">iconfont icon-back</v-icon>
    </v-btn>
    <div class="toolbar">
      选择短链接
      <v-btn class="my-btn" icon dark @click="selectAll">
        <v-icon :color="all" size="18">iconfont icon-quanxuan</v-icon>
      </v-btn>
    </div>
    <div class="list" v-if="show">
      <no-ssr>
        <RecycleScroller
          :key="true"
          :items="linkList"
          :buffer="200"
          :page-mode="true"
          :poolSize="100"
          key-field="id"
          :item-size="60"
          style="z-index:10"
        >
          <template slot-scope="{item,index}">
            <div @click.stop="select(index)" class="item px-3" id="item" v-ripple="{ class: 'blue--text'}"
                 :class="{'default-color':!checked[index],'active-color':checked[index]}">
              <div class="left">
                <v-icon :color="checked[index]?'#03A9F4':'#032D60'" size="18" style="line-height: 55px">iconfont
                  icon-lianjieguanlian
                </v-icon>
              </div>
              <div class="left short-link ml-3">{{item.shortLink}}</div>
              <div class="right" style="padding-top: 13px">
                <v-checkbox
                  @click.stop="select(index)"
                  class="ma-0 "
                  color="#03A9F4"
                  style="z-index: 9999"
                  v-model="checked[index]"
                ></v-checkbox>
              </div>
              <div class="mr-3 right web-font note">{{item.note}}</div>
            </div>
          </template>
        </RecycleScroller>
      </no-ssr>
    </div>
    <div class="loading" v-else>
      <vue-loaders-line-spin-fade-loader scale="2" color="#03A9F4"></vue-loaders-line-spin-fade-loader>
    </div>
  </div>
</template>

<script>
  import {LinkApi} from "../../../api/LinkApi";

  let $linkApi
  export default {
    mounted() {
      let width = window.screen.availWidth
      this.$refs.dialog.style.width = `${width}px`
      $linkApi = new LinkApi()
      setTimeout(() => {
        $linkApi.getUserAllLinks().then(res => {
          if (res.code === this.$code.SUCCESS) {
            this.handleLink(res.data.links)

            this.show = true

          } else {
            this.$message.error(res.msg)
          }
        })
      }, 1000)
    },
    name: "chooseLink",

    data: function () {
      return {
        linkList: [],
        show: false,
        checked: [],
        checkedNums: 0
      }
    },
    computed: {
      all: function () {
        if (this.checkedNums === this.checked.length) {
          return 'white'
        } else {
          return '#032D60'
        }
      }
    },
    methods: {
      back() {
        let links = []
        this.checked.forEach((item, index) => {
          if (item) {//如果选中
            links.push(this.linkList[index])
          }
        })
        this.$emit('back', links)

      },
      select(index) {
        let res = !this.checked[index]
        this.$set(this.checked, index, res)
        if (res) {
          this.checkedNums++
        } else {
          this.checkedNums--
        }
      },
      selectAll() {
        //选择全部或取消全选
        let selectAll = false
        if (this.checkedNums === this.checked.length) {
          //取消全选
          this.checkedNums = 0
        } else {
          //全选
          selectAll = true
          this.checkedNums = this.checked.length
        }
        for (let i = 0; i < this.checked.length; i++) {
          this.$set(this.checked, i, selectAll)
        }
      },
      handleLink(links) {
        links.forEach(link => {
          this.linkList.push({
            id: link.id,
            shortLink: link.shorturl,
            note: link.note,
          })
          this.checked.push(false)
        })

      }
    }
  }
</script>

<style scoped>
  .choose-link-dialog {
    height: 100%;
  }

  .toolbar {
    background-color: #03A9F4;
    width: 100%;
    text-align: center;
    height: 50px;
    font-family: "微软雅黑", sans-serif;
    color: white;
    font-size: 22px;
    padding-top: 6px;
    position: relative;
  }

  .list {
    width: 100%;
    height: 70vh;
    overflow: auto;
  }

  .active-color {
    background-color: rgba(44, 181, 242, 0.1);
    color: #03A9F4;
  }

  .default-color {
    color: #032D60;
  }

  .item {
    line-height: 55px;
    font-family: Roboto, sans-serif;
    font-size: 16px;
    width: 100%;
    height: 55px;
    animation: all 3s linear;
  }

  .my-absolute-btn {
    bottom: 5vh;
    right: 20px;
  }

  .my-btn {
    position: absolute;
    right: 16px;
    top: 0;
  }

  .loading {
    position: absolute;
    top: 40vh;
    left: 45%;
  }
  .note{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 10vh;
    font-size: 13px;
    text-align: center;
  }
</style>
