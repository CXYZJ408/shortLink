<template>
  <div class="item-list" :class="{'item-active':isActive}" :style="{'height':height+'px'}">
    <div class="item" @click="changeActive">
      <v-icon size="18" style="transition: all 0.3s ease-in;line-height: 30px" :color="isActive?'white':'rgba(255,255,255,0.8)'"
              class="my-inline-div">iconfont
        {{drawerItem.icon}}
      </v-icon>
      <div class="item-title my-inline-div web-font-pingfang-thin" :style="titleStyle">
        {{drawerItem.title}}
      </div>
      <div class="my-inline-div ml-3 pt-1" v-if="drawerItem.list">
        <v-icon size="18" :color="isActive?'white':'rgba(255,255,255,0.8)'" style="transition: all 0.3s ease-in"
                :class="{'arrow-active':isActive}">iconfont
          icon-angle-up
        </v-icon>
      </div>
    </div>
    <div class="sub-item-list" v-if="drawerItem.list">
      <div class="sub-item web-font-pingfang-thin" :class="{'sub-item-active':activeIndex===index}"
           v-for="(item,index) in drawerItem.list" :key="index" @click="changeActiveItem(index)">{{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "drawerItem",
    props: {
      drawerItem: {
        type: Object
      },
      index: {
        type: Number
      },
      root: {
        type: String
      }
    },
    created() {
      if (this.drawerItem.list) {
        this.drawerItem.list.forEach(item => {
          let url = `${this.root}${item.href}`
          this.pathList.push(url)
          if (this.routerPath === url) {
            this.$store.commit('setTitle', item.title)
          }
        })
      } else {
        let url = `${this.root}${this.drawerItem.href}`
        this.pathList.push(url)
        if (this.routerPath === url) {
          this.$store.commit('setTitle', this.drawerItem.title)
        }
      }
      this.isActive = this.pathList.includes(this.routerPath);

    },
    computed: {
      routerPath: function () {//根据路由信息来确定导航栏是否被激活
        return this.$route.path
      },
      titleStyle: function () {
        if (this.isActive) {
          return "color: rgba(255, 255, 255, 1);"
        } else {
          return ""
        }
      },
      height: function () {
        if (this.isActive && this.drawerItem.list) {
          return this.drawerItem.list.length * 30 + 60
        } else {
          return 50
        }
      }
    },
    watch: {
      routerPath: function (newVal) {
        this.isActive = this.pathList.includes(newVal);
        this.activeIndex = this.pathList.indexOf(newVal)
        if (this.isActive) {
          if (!this.drawerItem.list) {
            console.log('routerPath' + this.drawerItem.title)
            this.$store.commit('setTitle', this.drawerItem.title)
          }
        }
      }
    },
    data: function () {
      return {
        activeIndex: -1,
        isActive: false,
        pathList: []
      }
    },
    methods: {
      changeActive() {
        console.log('change  ' + `${this.root}${this.drawerItem.href}`)
        if (!this.drawerItem.list) {
          this.$router.push(`${this.root}${this.drawerItem.href}`)
        } else {
          if (this.activeIndex === -1) {
            this.isActive = !this.isActive
          } else {
            this.isActive = true
          }
        }
      },
      changeActiveItem(index) {
        this.activeIndex = index
        console.log('change :' + index + "  " + this.drawerItem.list[index].title)
        this.$router.push(`${this.root}${this.drawerItem.list[index].href}`)
        this.$store.commit('setTitle', this.drawerItem.list[index].title)
      }
    }
  }
</script>

<style scoped>
  .item-list {
    width: 100%;
    -webkit-transition: all 0.5s ease-in;
    -moz-transition: all 0.5s ease-in;
    -ms-transition: all 0.5s ease-in;
    -o-transition: all 0.5s ease-in;
    transition: all 0.5s ease-in;
    cursor: default;
    overflow: hidden;
  }

  .item-list:hover {
    background: #4E5894;
  }

  .item {
    width: 100%;
    height: 50px;
    padding-top: 10px;
    padding-left: 30px;
    color: rgba(255, 255, 255, 0.8);
  }

  .item-active {
    background: #4E5894;
    border-left: #33CBFF 3px solid;
  }

  .arrow-active {
    transform: rotateZ(180deg);
  }

  .sub-item:hover {
    color: rgba(255, 255, 255, 1);
  }

  .sub-item-active {
    color: rgba(255, 255, 255, 1) !important
  }

  .sub-item {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding-left: 65px;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    color: rgba(255, 255, 255, 0.8);
  }

  .item-title {
    line-height: 30px;
    font-size: 14px;
    margin-left: 10px;
    transition: all 0.3s ease-in;
  }
</style>
