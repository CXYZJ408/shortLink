<template>
  <v-dialog
    v-model="show"
    hide-overlay
    persistent
    width="550px"
  >
    <v-card class="edit-card" max-height="380px">
      <div class="card-title text-md-center my-title">编辑链接</div>
      <v-card-text>
        <v-layout row wrap justify-center>
          <v-flex md12>
            <v-layout justify-center>
              <v-flex md2>
                <div class="label">长链接:</div>
              </v-flex>
              <v-flex md9>
                <el-input placeholder="请输入修改后的链接" v-model="editLink.longLink" :clearable="true">
                </el-input>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md12 class="my-4">
            <v-layout justify-center>
              <v-flex md2>
                <div class="label">短链接:</div>
              </v-flex>
              <v-flex md9>
                <el-input v-model="editLink.shortLink" disabled></el-input>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md12>
            <v-layout justify-center>
              <v-flex md2>
                <div class="label">备&nbsp;&nbsp;注:</div>
              </v-flex>
              <v-flex md9>
                <el-input resize="none" type="textarea" :rows="2" v-model="editLink.note"></el-input>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-layout justify-end class="py-3">
        <v-flex md10 class="text-md-right pr-4">
          <v-btn color="#2ECC71" dark round depressed @click="modify">
            <span class="title">确定</span>
          </v-btn>
          &nbsp;&nbsp;&nbsp;
          <v-btn color="grey" flat round @click="cancel">
            <span class="title">取消</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
  import {LinkApi} from "../../api/LinkApi";

  let _ = require('lodash')
  let $linkApi
  export default {
    name: "linkEeditDialog",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      link: {
        type: Object
      }
    },
    watch: {
      show: function () {
        this.copy()
      }
    },
    created() {
      $linkApi = new LinkApi()
      this.copy()
    },
    data: function () {
      return {
        editLink: {}
      }
    },
    methods: {
      copy() {
        if (this.show) {
          this.editLink = _.clone(this.link)
        }
      },
      modify() {
        $linkApi.editLink(this.editLink.id, this.editLink.longLink, this.editLink.note).then(res => {
          if (res.code === this.$code.SUCCESS) {
            this.$message.success("修改成功！")
            this.$emit("editShortLink",res.data)
          }
        }).catch(e=>{
          console.log(e)
        })
      },
      cancel() {
        this.$emit("cancel")
      }
    }
  }
</script>

<style>

</style>
<style scoped>
  .edit-card {
    width: 550px;
    border-radius: 10px;
  }

  .label {
    color: #3D3D60;
    font-family: 黑体, serif;
    font-size: 20px;
    padding-top: 3px;
  }

  .card-title {
    padding-top: 10px;
  }
</style>
