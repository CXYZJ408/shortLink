<template>
  <v-dialog
    v-model="show"
    persistent
    width="550px"
    lazy
  >
    <v-card class="edit-card" max-height="500px">
      <div class="card-title text-md-center my-title">{{title}}</div>
      <v-card-text>
        <v-layout row wrap justify-center>
          <v-flex md12>
            <v-layout justify-center>
              <v-flex md2>
                <div class="label">长链接:</div>
              </v-flex>
              <v-flex md9>
                <el-input :placeholder="linkMode===2?'请输入修改后的链接':'请输入待转换的链接'" v-model="link.longLink" :clearable="true">
                </el-input>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md12 class="mt-4" v-if="linkMode===2">
            <v-layout justify-center>
              <v-flex md2>
                <div class="label">短链接:</div>
              </v-flex>
              <v-flex md9>
                <el-input v-model="link.shortLink" disabled></el-input>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md12 class="mt-4">
            <v-layout justify-center>
              <v-flex md2>
                <div class="label">组&nbsp;&nbsp;别:</div>
              </v-flex>
              <v-flex md9>
                <el-select v-model="link.groupId" @visible-change="getGroups" placeholder="请选择组别">
                  <el-option
                    v-for="(item,index) in groups"
                    :key="index"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md12 class="mt-4">
            <v-layout justify-center>
              <v-flex md2>
                <div class="label">备&nbsp;&nbsp;注:</div>
              </v-flex>
              <v-flex md9>
                <el-input placeholder="短链接备注" resize="none" type="textarea" :rows="2" v-model="link.note"></el-input>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-layout justify-end class="py-3">
        <v-flex md10 class="text-md-right pr-4">
          <v-btn color="#2ECC71" dark round depressed @click="submit">
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
  import {LinkApi} from "../../../api/LinkApi";

  let _ = require('lodash')
  let $linkApi
  export default {
    name: "linkEeditDialog",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      editNewLink: {
        type: Object
      },
      linkMode: {
        type: Number,
        default: 0
      }
    },
    computed:{
      title:function () {
        switch (this.linkMode) {
          case 0:
            return "新建链接"
          case 1:
            return "修改新建链接"
          case 2:
            return "编辑链接"
        }
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
        link: {},
        groups: [
        ]
      }
    },
    methods: {
      getGroups(visible){
        console.log(visible)
        if (visible) {
          $linkApi.getGroups().then(res=>{
            console.log(res)
          })
        }
        // return {id: 5, value: '组别6'}
      },
      copy() {
        if (this.show) {
          this.link = _.clone(this.editNewLink)
        }
      },
      submit() {
        if (_.isEmpty(this.link.longLink)) {
          this.$message.warning("长链接不能为空！")
          return
        }
        if (this.linkMode===2) {
          $linkApi.editLink(this.link.id, this.link.longLink, this.link.note).then(res => {
            if (res.code === this.$code.SUCCESS) {
              this.$message.success("修改成功！")
              this.$emit("editShortLink", res.data)
            }
          }).catch(e => {
            console.log(e)
          })
        } else if (this.linkMode===0) {
          this.$emit("add", _.clone(this.link))
        }else{
          this.$emit("modifyNewLink", _.clone(this.link))
        }
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
