<template>
  <v-layout class="bottom-nav">
    <v-flex sm4>
      <v-btn style="height: 55px" class="ma-0" :color="color1" block flat @click="go(0)">
        <v-icon size="28">
          iconfont icon-lianjie-duankai
        </v-icon>
      </v-btn>
    </v-flex>
    <v-flex sm4>
      <v-btn style="height: 55px" class="ma-0" :color="color2" block flat @click="go(1)">
        <v-icon size="28">
          iconfont icon-shuju
        </v-icon>
      </v-btn>
    </v-flex>
    <v-flex sm4>
      <v-btn style="height: 55px" class="ma-0" :color="color3" block flat @click="go(2)">
        <v-icon size="28">
          iconfont icon-gerenzhongxin
        </v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "bottomNav",
    props: {
      now: {
        type: String
      }
    },
    computed: {
      color1: function () {
        if (this.now === '/user_center_mobile') {
          return "#FF9800"
        }
        return "grey"
      },
      color2: function () {
        if (this.now === '/user_center_mobile/data_display') {
          return "#40A1FA"
        }
        return "grey"
      },
      color3: function () {
        if (this.now === '/user_center_mobile/my_center') {
          return "#42426A"
        }
        return "grey"
      },
    },
    data: function () {
      return {}
    },
    methods: {
      go(index) {
        switch (index) {
          case 0:
            this.$router.push('/user_center_mobile')
            break
          case 1:
            this.$router.push('/user_center_mobile/data_display')
            break
          case 2:
            this.$router.push('/user_center_mobile/my_center')
            break
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-nav {
    z-index: 999;
    background-color: white;
    height: 55px;
    width: 100%;
  }
</style>
