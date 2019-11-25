<template>
  <section>
    <!--工具条-->
    <el-row>
      <el-form :inline="true" :model="whole">
        <el-tag type="primary" style="margin:10px 10px 20px 0;">交易总金额（元）：{{whole.sumAmt}}元</el-tag>
        <el-tag type="primary" style="">交易总笔数（笔）：{{whole.countRow}}笔</el-tag>
      </el-form>

      <el-form :inline="true" :model="filters" ref="filters">
        <el-form-item label="请选择款台" prop="parag">
          <el-select v-model="filters.parag" class="fixed_search_input" placeholder="请选择款台" clearable>
            <el-option v-for="item in options" :value="item.eid" :label="item.value" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期时间" prop="startTime">
          <el-date-picker v-model="filters.startTime" class="fixed_search_input_datetime" placeholder="选择开始日期" type="datetime" :picker-options="pickerOptions1" :clearable="false" :editable='false'>
          </el-date-picker>
        </el-form-item>
        <el-form-item>至</el-form-item>
        <el-form-item prop="endTime">
          <el-date-picker v-model="filters.endTime" class="fixed_search_input_datetime" placeholder="选择结束日期" type="datetime" :picker-options="pickerOptions2" :clearable="false" :editable='false'>
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsers" round>查询</el-button>
          <el-button @click="resetForm('filters')" round>重置</el-button>
          <el-button type="text" @click="Settlement()">
            <i class="el-icon-date"></i>打印结算</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-alert title="可查询最近7天的交易" type="warning" center close-text="知道了" show-icon>
      </el-alert>
    </el-row>
    <!--列表-->
    <el-table :data="users" border highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="username" label="款台名称" min-width="200">
      </el-table-column>
      <el-table-column prop="countRow" label="交易笔数" min-width="200">
      </el-table-column>
      <el-table-column prop="sumAmt" label="交易金额" min-width="200">
      </el-table-column>
      <el-table-column prop="sumSur" label="总结余" min-width="120">
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-row>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" background style="text-align:center;background:#fff;padding:15px;">
      </el-pagination>
    </el-row>

  </section>
</template>

<script>
  import util from '../../common/js/util'
  import {
    getUserList,
    lookupUser,
    printSettle
  } from '../../api/api';

  export default {
    data() {
      var myDate = new Date();
      return {
        //时间控制
        pickerOptions1: {
          disabledDate(time) {
            let date = new Date();
            return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 7;
          }
        },
        pickerOptions2: {
          disabledDate: (time) => {
            let startTimeOne = Date.parse(new Date(util.formatDate.format(new Date(this.filters.startTime),
              'yyyy-MM-dd hh:mm:ss')));
            if (time.getTime() + 24 * 60 * 60 * 1000 - 1 < startTimeOne || time.getTime() > Date.now()) {
              return true;
            }
          }
        },
        //商户名
        filters: {
          parag: '',
          startTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()),
          endTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), 23, 59, 59),
        },
        whole: {
          sumAmt: "",
          countRow: ""
        },
        options: [],
        total: 0,
        page: 1,
        users: [],
        listLoading: false,

      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      //打印结算
      Settlement: function () {
        let para = {
          eid: this.filters.parag.toString(),
          startTime: this.filters.startTime,
          endTime: this.filters.endTime,
        }
        para.startTime = (!para.startTime || para.startTime == '') ? '' : String(Date.parse(util.formatDate.format(
          new Date(
            para.startTime), 'yyyy-MM-dd hh:mm:ss'))); //开始时间
        para.endTime = (!para.endTime || para.endTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
          para.endTime), 'yyyy-MM-dd hh:mm:ss'))); //开始时间
        printSettle(para).then((res) => {
          var _this = this;
          let {
            status,
            message
          } = res;
          if (status == 200) {
            this.$message({
              title: '成功',
              message: message,
              type: 'success'
            });
          }
        })
      },
      //获取用户列表
      getUsers() {
        var _this = this;
        let para = {
          mid: this.mid,
          pageNum: this.page,
          startTime: this.filters.startTime,
          endTime: this.filters.endTime,
          eId: this.filters.parag
        };
        para.startTime = (!para.startTime || para.startTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
          para.startTime), 'yyyy/MM/dd hh:mm:ss'))); //开始时间
        para.endTime = (!para.endTime || para.endTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
          para.endTime), 'yyyy/MM/dd hh:mm:ss'))); //开始时间
        lookupUser().then((res) => {
          let {
            status,
            message
          } = res;
          if (status == 200) {
            this.options = res.data.emplyeeList;
          }
        });
        this.listLoading = true;
        getUserList(para).then((res) => {
          _this.listLoading = false;
          let {
            data,
            message,
            status
          } = res;
          if (status == 200) {
            _this.total = res.data.totalCount;
            _this.whole.countRow = res.data.countRow;
            _this.whole.sumAmt = res.data.sumAmt;
            _this.users = res.data.summaryList;
          }
        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    mounted() {
      this.getUsers();
    }
  }
</script>