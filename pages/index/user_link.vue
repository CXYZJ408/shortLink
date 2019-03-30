<template>
  <v-layout row wrap justify-center>
    <v-flex md10 class="text-md-center mt-2">
      <div class="my-title">个人短链</div>
    </v-flex>
    <v-flex md10>
      <v-layout>
        <v-flex md5>
          <div class="msg-card">
            <div class="msg d-inline-block ml-2">全部链接</div>
            <div class="msg-blue d-inline-block">{{total}}</div>
            <div class="msg d-inline-block ml-2">已选择：</div>
            <div class="msg-blue d-inline-block">{{selected}}</div>
          </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex md3 class="text-md-right">
          <v-btn icon color="red" flat>
            <v-icon>iconfont icon-shanchu</v-icon>
          </v-btn>
          <v-btn icon color="grey" flat>
            <v-icon size="20">iconfont icon-refresh</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex md10>
      <v-card class="card">
        <el-table
          height="60vh"
          stripe
          cell-class-name="cell"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            fixed
            class-name="table-column"
            label="原始链接"
            width="220"
            show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            class-name="table-column"
            prop="name"
            label="短链接"
            width="220">
          </el-table-column>
          <el-table-column
            prop="address"
            class-name="table-column"
            label="备注"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            class-name="table-column"
            label="操作">
            <template slot-scope="scope">
              <!--编辑提示框-->
              <v-btn icon flat color="#8E44AD" @click="" >
                <v-icon size="15">iconfont icon-bianji</v-icon>
              </v-btn>
              <v-btn icon flat color="grey" >
                <v-icon size="15">iconfont icon-copy</v-icon>
              </v-btn>
              <v-btn icon flat color="red" >
                <v-icon size="18">iconfont icon-shanchu</v-icon>
              </v-btn>
            </template>
          </el-table-column>
        </el-table>

      </v-card>
    </v-flex>
    <v-flex md10 class="text-md-center mt-3 pt-1">
      <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="total, prev, pager, next,jumper"
        :total="100">
      </el-pagination>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "user_link",
    data: function () {
      return {
        page: 1,
        tableData: [{
          date: 'https://htmlcolorcodes.com/zh/',
          name: 'https://url/123/11',
          address: '知乎短链'
        }, {
          date: 'https://htmlcolorcodes.com/zh/',
          name: 'https://url/123/11',
          address: '知乎短链'
        }, {
          date: 'https://htmlcolorcodes.com/zh/',
          name: 'https://url/123/11',
          address: '知乎短链'
        }, {
          date: 'https://htmlcolorcodes.com/zh/',
          name: 'https://url/123/11',
          address: '知乎短链'
        }, {
          date: 'https://htmlcolorcodes.com/zh/',
          name: 'https://url/123/11',
          address: '知乎短链'
        }, {
          date: 'https://htmlcolorcodes.com/zh/',
          name: 'https://url/123/11',
          address: '知乎短链'
        }, {
          date: 'https://htmlcolorcodes.com/zh/',
          name: 'https://url/123/11',
          address: '知乎短链'
        }, {
          date: 'https://htmlcolorcodes.com/zh/',
          name: 'https://url/123/11',
          address: '知乎短链'
        }, {
          date: 'https://htmlcolorcodes.com/zh/',
          name: 'https://url/123/11',
          address: '知乎短链'
        }, {
          date: 'https://htmlcolorcodes.com/zh/',
          name: 'https://url/123/11',
          address: '知乎短链'
        },],
        multipleSelection: [],
        selected: 0,
        total: 10
      }
    },
    methods: {
      show() {
        console.log("show")
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.selected = val.length
      }
    }
  }

</script>

<style scoped>

  .msg-card {
    height: 40px;
    padding-top: 10px;
  }

  .msg {
    font-family: 黑体, serif;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.65);
  }

  .msg-blue {
    font-family: 黑体, serif;
    font-size: 16px;
    color: #388DED;
  }

  .card {
    border-color: #E7EEF6 !important;
    border-width: 1px !important;
    box-shadow: 0 0 2px 1px #E7EEF6;
    border-radius: 10px;
  }
</style>

<style>
  .cell {
    font-family: 微软雅黑, serif;
    text-align: center;
  }
</style>
