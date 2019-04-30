<template>
  <div class="selection">
    <v-layout style="height: 100%">
      <v-flex md10 style="position:relative;">
        <div class="selected pl-3" ref="selected" @mouseenter="handleHover(true,false)">
          <v-chip close dark color="#9593CE" v-for="(item,index) in links" :key="index" v-model="item.checked"
                  @input="close">
            <span class="chip-text">{{item.title}}</span>
          </v-chip>
        </div>
        <transition name="fade">
          <v-card @mouseleave="handleHover(false,false)" @mouseenter="handleHover(true,false)" v-if="showAll"
                  class="pa-3 show-all-card">
            <div>
              <v-chip close dark color="#9593CE" v-for="(item,index) in links" :key="index" @input="close"
                      v-model="item.checked">
                <span class="chip-text">{{item.title}}</span>
              </v-chip>
            </div>
          </v-card>
        </transition>
      </v-flex>
      <v-flex md2 class="text-md-right pt-2 pr-2">
        <v-btn icon small color="grey" flat class="margin-0" @click="clean">
          <v-icon size="14">iconfont icon-close</v-icon>
        </v-btn>
        <v-btn icon small color="grey" flat class="margin-0" @mouseenter="handleHover(false,true)"
               @mouseleave="handleHover(false,false)">
          <v-icon size="10">iconfont icon-down</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <transition name="fade">
      <v-card class="my-card" @mouseenter="handleHover(false,true)"
              @mouseleave="handleHover(false,false)" v-if="showSelect">
        <v-list>
          <v-list-tile>
            <v-checkbox v-model="all" @click.stop="chooseAll" :indeterminate="indeterminate"
                        color="#4EA1FF"></v-checkbox>
            <v-list-tile-title>
              <span class="text" :class="{active:all}">选择所有</span>
            </v-list-tile-title>
            <v-list-tile-action @click="refresh">
              <v-btn icon small>
                <v-icon color="#A7AEB3" size="18">iconfont icon-refresh</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider class="divider"></v-divider>
          <v-list-tile @click.stop="select(index)" v-for="(item,index) in links" :key="index">
          <span>
            <v-checkbox @click.stop="select(index)" height="16" v-model="item.checked" color="#4EA1FF"></v-checkbox>
          </span>
            <v-list-tile-title>
              <span class="text" :class="{active:item.checked}">{{item.title}}</span>
            </v-list-tile-title>
            <v-list-tile-action>
              <span class="sub-text" :class="{active:item.checked}">{{item.note}}</span>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </transition>
  </div>
</template>

<script>
  let _ = require('lodash')
//todo 需要添加虚拟列表
  export default {
    name: "selections",
    watch: {
      checkedNums: function () {
        if (this.checkedNums === this.links.length) {//选中了全部
          this.indeterminate = false
          this.all = true
        } else if (this.checkedNums === 0) {//全没有选中
          this.all = false
          this.indeterminate = false
        } else {//选中了部分
          this.all = false
          this.indeterminate = true
        }
      }
    },
    props: {
      links: {
        type: Array,
        default: []
      }
    },
    data: function () {
      return {
        showSelect: false,//显示选择框
        showAll: false,//当溢出的时候显示所有
        forceShowAll: false,//强制显示所有
        forceShowSelect: false,//强制显示选择框
        more: false,//当溢出的时候显示
        all: false,
        checkedNums: 0,
        indeterminate: false
      }
    },
    methods: {
      refresh() {
        let temp = []
        //将已选中的链接id保存
        _.forEach(this.links, item => {
          if (item.checked) {
            temp.push(item.id)
          }
        })
        this.$emit("getUserLinks", temp)
        //todo 动画
      },

      clean() {
        this.checkedNums = 0
        _.forEach(this.links, item => {
          item.checked = false
        })
        this.showSelect = false
        this.showAll = false
        this.forceShowAll = false
        this.forceShowSelect = false
        this.more = false
      },
      close() {
        this.checkedNums--
        this.handleOverFlow()
      },
      handleHover(showAll, showSelect) {
        if (showAll && this.more) {//显示所有已选择的短链
          this.showAll = true
          this.forceShowAll = true
        } else {//隐藏
          this.forceShowAll = false
          if (this.showAll) {//如果没有隐藏
            setTimeout(() => {
              if (!this.forceShowAll) {
                this.showAll = false
              } else {
                this.forceShowAll = false
              }
            }, 100)//延迟半秒处理
          }
        }
        if (showSelect) {//显示所有已选择的短链
          this.showSelect = true
          this.forceShowSelect = true
        } else {//隐藏
          this.forceShowSelect = false
          if (this.showSelect) {//如果没有隐藏
            setTimeout(() => {
              if (!this.forceShowSelect) {
                this.showSelect = false
              } else {
                this.forceShowSelect = false
              }
            }, 100)//延迟半秒处理
          }
        }
      },
      chooseAll() {
        let all = !this.all
        this.all = all
        if (all) {//全选
          this.chooseAllOrNot(true)
          this.checkedNums = this.links.length
        } else {//全部取消选择
          this.chooseAllOrNot(false)
          this.checkedNums = 0
        }
        this.handleOverFlow()
      },
      chooseAllOrNot(choose) {
        _.forEach(this.links, item => {
          item.checked = choose
        })
      },
      select(index) {
        let checked = !this.links[index].checked
        if (checked) {//如果选中
          this.checkedNums++
          this.links[index].checked = true
        } else {//取消选中
          this.checkedNums--
          this.links[index].checked = false
        }
        this.handleOverFlow()
      },
      handleOverFlow() {
        setTimeout(() => {
          let selected = this.$refs.selected
          if (!_.isUndefined(selected)) {
            let height = selected.scrollHeight
            if (height > 53) {
              this.$refs.selected.scrollTop = selected.scrollHeight//如果DIV溢出，自动滚动到底部
              this.more = true

            } else {
              this.more = false
            }
          }
        }, 100)
      }
    }
  }
</script>

<style scoped>
  .selection {
    width: 100%;
    height: 50px;
    padding-top: 3px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.15) !important;
    border-radius: 10px;
    position: relative;
  }

  .my-card {
    position: absolute;
    top: 45px;
    right: 0;
    min-height: 30px;
    max-height: 400px;
    width: 300px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
    overflow: auto;
    z-index: 200;
  }

  .show-all-card {
    position: absolute;
    width: 100%;
    min-height: 50px;
    top: -80%;
    z-index: 999;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, .95);
    max-height: 500px;
  }

  .show-all-card div {
    max-height: 450px;
    width: 100%;
    min-height: 50px;
    overflow: auto;
  }

  .text {
    color: #A7AEB3;
    font-family: 微软雅黑, serif;
    font-size: 13px;
  }

  .sub-text {
    color: #A7AEB3;
    font-family: 微软雅黑, serif;
    font-size: 12px;
    white-space: nowrap;
    width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .selected {
    overflow: auto;
    height: 40px;
    width: 100%;
  }

  /* 设置滚动条的样式 */
  .selected::-webkit-scrollbar {
    width: 0;
  }

  .chip-text {
    font-family: 微软雅黑, serif;
  }

  .active {
    color: #4EA1FF;
  }
</style>
<style>
  .theme--light.v-icon {
    color: #A7AEB3
  }
</style>
