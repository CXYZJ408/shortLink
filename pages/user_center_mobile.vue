<template>
  <v-card height="100vh" flat style="position: relative">
    <div>
      <nuxt-child></nuxt-child>
    </div>
    <div class="bottom-nav">
      <bottom-nav :now="nowPath"></bottom-nav>
    </div>
  </v-card>
</template>

<script>
  import bottomNav from '~/components/bottomNav.vue'

  export default {
    name: "user_center_mobile",
    components: {bottomNav},
    data: function () {
      return {
        nowPath: this.$route.path,
      }
    },
    watch: {
      '$route': function (from, to) {
        this.nowPath = this.$route.path
      }
    },
    mounted() {
      if (!this.$store.state.isMobile) {//如果不是手机端，跳转到PC界面
        this.$router.replace('/user_center')
      }

    },
  }
</script>

<style scoped>
  .bottom-nav {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 36px;
  }
</style>
