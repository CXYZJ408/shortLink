<template>
  <div class="draw-wrap">
    <div class="user-card">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on" class="user-name">{{$store.state.user.username}}</span>
        </template>
        <span>{{$store.state.user.username}}</span>
      </v-tooltip>
      <v-icon :color="vipColor" style="vertical-align: top" class="mt-3" size="28">iconfont icon-huiyuan</v-icon>
    </div>
    <drawerItemList v-for="(item,index) in drawerList" :drawer-item="item" :root="root" :index="index"
                    :key="index"></drawerItemList>
  </div>
</template>

<script>
  import drawerItemList from "./drawerItemList";

  export default {
    name: "drawer",
    components: {
      drawerItemList
    },
    created(){
      // this.$store.commit('setTitle','短链生成')
    },
    computed: {
      vipColor: function () {
        if (this.$store.state.user.isVip) {
          return "#FF9800"
        }
        return "grey"
      },
    }
    ,
    data: function () {
      return {
        root: "/user_center",
        drawerList: [
          {
            title: "短链生成",
            href: "",
            icon: "icon-lianjie-duankai"
          },
          {
            title: "个人短链",
            icon: "icon-share_link",
            list: [
              {
                title: "全部短链",
                href: "/links"
              },
              {
                title: "短链检索",
                href: "/link_query"
              },
              {
                title: "分组管理",
                href: "/classify-manager"
              },
            ]
          },
          {
            title: "用户中心",
            href: "/my_center",
            icon: "icon-gerenzhongxin"
          },
          {
            title: "好友邀请",
            href: "/invite",
            icon: "icon-add-friends_icon"
          },
          {
            title: "数据统计",
            href: "/data_display",
            icon: "icon-shuju"
          }
        ]
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .draw-wrap {
    height: 100%;
    width: 200px;
    background-color: #5E6AAC;
  }

  .item1 {
    background-color: chocolate;
    transition: 0.5s ease-in-out;
    width: 100%;
  }

  .item2 {
    background-color: cornsilk;
    width: 100%;
    transition: 0.5s ease-in-out;
  }
  .user-card {
    width: 100%;
    height: 85px;
    background-color: #4E5894 !important;
    padding-top: 15px;
  }
  .user-name {
    font-size: 35px;
    color: white !important;
    padding-left: 22px;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
</style>
