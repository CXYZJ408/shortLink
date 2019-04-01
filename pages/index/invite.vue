<template>
  <v-layout row wrap justify-center id="invite">
    <input type="text" v-model="url" id="urlPath">
    <v-flex md10 class="mt-2">
      <div class="my-title text-md-center color-dark">邀请好友</div>
    </v-flex>
    <v-flex md10 style="margin-top: 15vh">
      <v-layout justify-center>
        <v-flex md2>
          <div class="invite text-md-right">邀请链接：</div>
        </v-flex>
        <v-flex md7>
          <el-input readonly v-model="url">
            <template slot="prepend">Http://</template>
          </el-input>
        </v-flex>
        <v-flex md2 class="ml-3">
          <v-btn depressed color="green" flat round @click="copy">
            <v-icon>iconfont icon-share_link</v-icon>
            <span>一键复制</span></v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex md10 style="margin-top: 15vh">
      <div class="text-md-center">
        <span class="invite-text">您当前已邀请了</span>
        <span class="mx-2 invite-people">{{people}}</span>
        <span class="invite-text">位好友</span>
      </div>
    </v-flex>
  </v-layout>

</template>

<script>
  export default {
    name: "invite",
    computed:{
      url:function () {
        return `www.short_link/invert/${this.$store.state.user.userId}`
      }
    },
    data: function () {
      return {
        people: 8,
      }
    },
    methods:{
      copy() {
        let url = document.getElementById('urlPath')
        url.select()
        document.execCommand('Copy')
        this.$message.success("链接复制成功！")
      }
    }
  }
</script>

<style scoped>

  #urlPath {
    opacity: 0;
    position: absolute;
    top: -100px;
  }

  .invite {
    font-size: 30px;
    color: #3D3D60;
    font-family: 黑体, serif;
  }

  .invite-text {
    font-size: 35px;
    color: #9A9AA8;
    font-family: 黑体, serif;
  }

  .invite-people {
    font-size: 40px;
    color: #FF9800;
    font-weight: 600;
    font-family: 黑体, serif;
  }

</style>
<style>

  #invite .v-btn {
    margin: 0 !important;
  }
</style>
