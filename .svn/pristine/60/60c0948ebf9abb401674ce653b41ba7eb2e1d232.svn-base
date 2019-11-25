<template>
  <section>
    <el-row>
      <el-form :inline="true" :model="whole">
        <el-tag type="primary" style="margin:10px 10px 20px 0;">交易总金额（元）：{{whole.sumAmt}}元</el-tag>
        <el-tag type="primary" style="">交易总笔数（笔）：{{whole.countRow}}笔</el-tag>
      </el-form>
    </el-row>
    <el-form :inline="true" :model="filters" ref="filters">
      <el-row>
        <el-form-item label="商户名称">
          <el-select v-model="filters.state1" class="fixed_search_input" placeholder="商户名称" :multiple="false" filterable remote :remote-method="remoteShop"
            :loading="loading" clearable @visible-change="clickShop">
            <el-option v-for="item in optionsMers" :key="item.mid" :value="item.mid" :label="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期时间">
          <el-date-picker v-model="filters.time1" class="fixed_search_input_date" placeholder="开始日期" :picker-options="pickerOptions1" :clearable="false" :editable='false'>
          </el-date-picker>
        </el-form-item>
        <el-form-item>至</el-form-item>
        <el-form-item>
          <el-date-picker v-model="filters.time2" class="fixed_search_input_date" placeholder="结束日期" :picker-options="pickerOptions2" :clearable="false" :editable='false'>
          </el-date-picker>
        </el-form-item>
        <el-tag type="gray">可查询最近三个月的信息</el-tag>
        <el-form-item style="float: right;">
          <el-button type="primary" v-on:click="getUsers" round>查询</el-button>
          <el-button @click="resetForm('filters')" round>重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!--列表-->
    <el-table :data="users" border highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="mname" label="商户名称" min-width="100">
      </el-table-column>
      <el-table-column prop="trans_amt" label="交易金额" min-width="100">
      </el-table-column>
      <el-table-column prop="amount" label="有效金额" min-width="100">
      </el-table-column>
      <el-table-column prop="sum_total" label="交易笔数">
      </el-table-column>
      <el-table-column prop="refund_amt" label="退款金额">
      </el-table-column>
      <el-table-column prop="factorage" label="手续费">
      </el-table-column>
      <el-table-column prop="avg_amt" label="平均每笔交易额" min-width="120">
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
    queryMerDaySum,
    selectSaleByName,
    selectMersByName
  } from '../../api/api';

  export default {
    data() {
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
        //商户名
        filters: {
          time1: Date(),
          time2: Date(),
          state1: ''
        },
        whole: {
          sumAmt: "",
          countRow: ""
        },
        total: 0,
        page: 1,
        users: [],
        optionsSale: [],
        //商户查询
        optionsMers: [],
        listLoading: false,
        loading: false
      }
    },
    methods: {
      //商户远程搜索
      clickShop: function () {
        selectMersByName().then((res) => {
          let {
            status,
            data
          } = res
          this.optionsMers = data.merchantList
        })
      },
      remoteShop(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            selectMersByName({
              mname: query
            }).then((res) => {
              let {
                status,
                data
              } = res
              this.optionsMers = data.merchantList
            })
          }, 200);
        } else {
          this.optionsMers = [];
        }
      },
      formatPay2: function (row, column) {
        return row.status == 1 ? '已支付' : row.status == 3 ? '已支付（有退款）' : '未知';
      },
      //获取用户列表
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      getUsers() {
        let para = {
          pageNum: String(this.page),
          startTime: this.filters.time1,
          endTime: this.filters.time2,
          mid: this.filters.state1.toString()
        };
        para.startTime = (!para.startTime || para.startTime == '') ? '' : String(util.formatDate.format(new Date(para.startTime),
          'yyyy/MM/dd')); //开始时间
        para.endTime = (!para.endTime || para.endTime == '') ? '' : String(util.formatDate.format(new Date(para.endTime),
          'yyyy/MM/dd')); //结束时间
        this.listLoading = true;
        queryMerDaySum(para).then((res) => {
          let {
            data,
            message,
            status
          } = res;
          if (status == 200) {
            this.total = res.data.totalCount;
            this.users = res.data.merDaySumList;
            this.whole.countRow = res.data.sumTotal;
            this.whole.sumAmt = res.data.sumAmt;
          }
          this.listLoading = false;
        });
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