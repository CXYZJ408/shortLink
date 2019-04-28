<template>
  <v-layout>
    <v-flex>
      <sidebar :now="nowPath"></sidebar>
    </v-flex>
    <v-flex md11>
      <toolbar></toolbar>
      <v-layout wrap>
        <v-card class="card" flat elevation="1">
          <transition :css="false" mode="out-in">
            <nuxt-child></nuxt-child>
          </transition>
        </v-card>
      </v-layout>
    </v-flex>
  </v-layout>

</template>

<script>
  import sidebar from '~/components/Sidebar.vue'
  import toolbar from '~/components/Toolbar.vue'
  import bottomNav from '~/components/bottomNav.vue'

  export default {

    watch: {
      '$route': function (from, to) {
        this.nowPath = this.$route.path
      }
    },
    data: function () {
      return {
        nowPath: this.$route.path,
      }
    },
    mounted() {
      setTimeout(() => {
        if (this.$store.state.isMobile) {//如果是手机端，跳转到手机界面
          this.$router.replace('/user_center_mobile')
        }
      }, 0)
    },
    methods: {},
    components: {sidebar, toolbar, bottomNav}
  }
</script>
<style scoped>
  .card {
    margin-left: auto;
    margin-right: auto;
    margin-top: 1.5vh;
    height: 85vh;
    width: 90%;
    border-radius: 10px;
  }


</style>
