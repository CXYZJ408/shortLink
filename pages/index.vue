<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-card flat class="index-card">
    <v-toolbar color="white" fixed flat height="55" style="z-index: 999">
      <nuxt-link to="/" style="text-decoration: none">
        <v-icon size="30" color="#FF9800">iconfont icon-link</v-icon>
        <span class="toolbar-title">JumpLinker</span>
      </nuxt-link>

      <v-spacer></v-spacer>

      <v-btn flat round color="#AEB6BF" nuxt to="/transfer">
        <span class="toolbar-action">短链生成</span>
      </v-btn>

      <v-btn flat round color="#AEB6BF">
        <span class="toolbar-action">短链还原</span>
      </v-btn>

      <v-btn flat round color="#AEB6BF">
        <span class="toolbar-action">二维码生成</span>
      </v-btn>

      <v-btn flat round color="#AEB6BF">
        <span class="toolbar-action">域名防红</span>
      </v-btn>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon flat color="#566573" v-on="on" nuxt to="/login">
            <v-icon>iconfont icon-denglu</v-icon>
          </v-btn>
        </template>
        <span class="tooltip">登录、注册</span>
      </v-tooltip>
    </v-toolbar>
    <div style="margin-top: 55px;">
      <nuxt-child></nuxt-child>
    </div>
  </v-card>

</template>

<script>

  export default {
    name: "index",
    layout: "index"
  }
</script>

<style scoped>
  .toolbar-title {
    font-size: 25px;
    font-family: "黑体", serif;
    color: #30304D;
    margin-left: 8px;
  }

  .index-card {
    min-height: 100vh;
  }


  .toolbar-action {
    font-family: "黑体", serif;
    color: rgba(69, 81, 87, .8);
    font-size: 18px;
  }

</style>
