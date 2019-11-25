<template>
<section>
  <!--工具条-->
  <el-row>
    <el-form :inline="true" :model="filters">
      <el-form-item label="日期时间">
        <el-date-picker v-model="filters.startTime" class="fixed_search_input_date" type="date" placeholder="选择开始日期" :picker-options="pickerOptions1" :clearable="false" :editable='false'>
        </el-date-picker>
      </el-form-item>
      <el-form-item>至</el-form-item>
      <el-form-item>
        <el-date-picker v-model="filters.endTime" class="fixed_search_input_date" type="date" placeholder="选择结束日期" :picker-options="pickerOptions2" :clearable="false" :editable='false'>
        </el-date-picker>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary" v-on:click="getUsers" round>查询</el-button>
        <el-button type="text" @click="downExcel()"><i class="el-icon-date"></i>导出Excel</el-button>
      </el-form-item>
    </el-form>
  </el-row>

  <!--列表-->
  <el-table :data="users" border highlight-current-row v-loading="listLoading">
    <el-table-column prop="sname" label="门店名称">
    </el-table-column>
    <el-table-column prop="pkg_name" label="套餐名称">
    </el-table-column>
    <el-table-column prop="total_amt" label="激活套餐金额" min-width="120">
    </el-table-column>
    <el-table-column prop="total_num" label="购买套餐累计个数">
    </el-table-column>
  </el-table>
  <!--工具条-->
    <el-row>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" background
        style="text-align:center;background:#fff;padding:15px;">
      </el-pagination>
    </el-row>
</section>
</template>

<script>
import util from '../../common/js/util'
import {
queryActivePurBySid,
downSumDetailExcelBySid
} from '../../api/api';
export default {
  data() {
    var myDate = new Date();
    return {
      //时间控制
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 90;
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 90;
        }
      },
      filters: {
          startTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()),
          endTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()),
      },
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //导出Excel
    downExcel(){
      let para={
        startTime:this.filters.startTime,
        endTime:this.filters.endTime
      }
      para.startTime = (!para.startTime || para.startTime == '') ? '' : String(util.formatDate.format(new Date(para.startTime), 'yyyy/MM/dd')); //开始时间
      para.endTime = (!para.endTime || para.endTime == '') ? '' : String(util.formatDate.format(new Date(para.endTime), 'yyyy/MM/dd')); //开始时间

      window.location.href= downSumDetailExcelBySid+"?"+"start_time="+para.startTime+"&"+"end_time="+para.endTime;
    },
    //获取用户列表
    getUsers() {
      let para = {
        pagNum: String(this.page),
        start_time: this.filters.startTime,
        end_time: this.filters.endTime,
        numPerPage:'20'
      };
      para.start_time = (!para.start_time || para.start_time == '') ? '' : String(util.formatDate.format(new Date(para.start_time), 'yyyy/MM/dd')); //开始时间
      para.end_time = (!para.end_time || para.end_time == '') ? '' : String(util.formatDate.format(new Date(para.end_time), 'yyyy/MM/dd')); //开始时间
      this.listLoading = true;
      queryActivePurBySid(para).then((res) => {
        this.total = res.data.totalCount;
        this.users = res.data.activeProductList;
        this.listLoading = false;
      });
    }
  },
  mounted() {
    this.getUsers();
  }
}
</script>
