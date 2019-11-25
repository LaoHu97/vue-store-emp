<template>
  <section>
    <!--工具条-->
    <el-row>
      <el-form :inline="true" :model="filters">
        <el-form-item label="日期时间">
          <el-date-picker v-model="filters.startTime" class="fixed_search_input_date" :editable="false" :clearable="false" type="date" placeholder="开始时间" :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
        <el-form-item>至</el-form-item>
        <el-form-item>
          <el-date-picker v-model="filters.endTime" class="fixed_search_input_date" :editable="false" :clearable="false" type="date" placeholder="结束时间" :picker-options="pickerOptions2">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="商户名称">
          <el-select v-model="filters.state1" class="fixed_search_input" placeholder="商户名称" :multiple="false" filterable remote :remote-method="remoteShop"
            :loading="loading" clearable @visible-change="clickShop">
            <el-option v-for="item in optionsMers" :key="item.mid" :value="item.mid" :label="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-select v-model="filters.payType" class="fixed_search_input" clearable placeholder="支付方式">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="getUsers" round>查询</el-button>
          <el-button type="text" @click="submitForm('ruleForm')">账单下载</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!--列表-->
    <el-table :data="users" border highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="settled_Time" label="统计日期" min-width="120">
      </el-table-column>
      <el-table-column prop="maccount" label="商户编号" min-width="120">
      </el-table-column>
      <el-table-column prop="mname" label="商户名称" min-width="120">
      </el-table-column>
      <el-table-column prop="pay_type" label="付款方式" min-width="120" :formatter="format_pay_type">
      </el-table-column>
      <el-table-column prop="amount" label="交易金额" min-width="120">
      </el-table-column>
      <el-table-column prop="refund_amt" label="退款金额" min-width="120">
      </el-table-column>
      <el-table-column prop="rate" label="费率‰" min-width="120">
      </el-table-column>
      <el-table-column prop="factorage" label="交易手续费" min-width="120">
      </el-table-column>
      <el-table-column prop="surplus" label="划账金额" min-width="120">
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
    queryMerStatement,
    downOrderSumExcel,
    selectMersByName
  } from '../../api/api';

  export default {
    data() {
      return {
        //时间控制
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        pickerOptions2: {
          disabledDate: (time) => {
            let startTimeOne = Date.parse(new Date(util.formatDate.format(new Date(this.filters.startTime),
              'yyyy-MM-dd')));
            if (time.getTime() > startTimeOne + 3600 * 1000 * 24 * 30 || time.getTime() < startTimeOne) {
              return true;
            }
          }
        },
        //商户查询
        optionsMers: [],
        options: [{
          value: 'WX',
          label: '微信'
        }, {
          value: 'ALI',
          label: '支付宝'
        }, {
          value: 'DEBIT',
          label: '借记卡'
        }, {
          value: 'CREDIT',
          label: '贷记卡'
        }, {
          value: 'BEST',
          label: '翼支付'
        }, {
          value: 'UNIONPAY',
          label: '银联二维码'
        }],
        //商户名
        filters: {
          state1: '',
          payType: '',
          startTime: new Date() - 24 * 60 * 60 * 1000,
          endTime: new Date() - 24 * 60 * 60 * 1000
        },
        loading: false,
        users: [],
        page: 1,
        total: 0,
        listLoading: false
      }
    },
    methods: {
      format_pay_type(row, column) {
        return row.pay_type === 'WX' ? '微信' : row.pay_type === 'ALI' ? '支付宝' : row.pay_type === 'DEBIT' ? '借记卡' : row.pay_type ===
          'CREDIT' ? '贷记卡' : row.pay_type === 'BEST' ? '翼支付' : row.pay_type === 'UNIONPAY' ? '银联二维码' : '其它';
      },
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
      submitForm(formName) {
        let para = {
          mid: this.filters.state1,
          payType: this.filters.payType,
          startTime: this.filters.startTime,
          endTime: this.filters.endTime
        }
        para.startTime = (!para.startTime || para.startTime == '') ? '' : util.formatDate.format(new Date(para.startTime),
          'yyyy/MM/dd');
        para.endTime = (!para.endTime || para.endTime == '') ? '' : util.formatDate.format(new Date(para.endTime),
          'yyyy/MM/dd');
        window.location.href = COURSES + "/admin/wp/salesman/downOrderSumExcel" + "?" + "startTime=" + para.startTime +
          "&" + "endTime=" + para.endTime + "&" + "mid=" + para.mid + "&" + "payType=" + para.payType;
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      //获取用户列表
      getUsers() {

        let para = {
          pageNum: this.page,
          mid: this.filters.state1,
          payType: this.filters.payType,
          startTime: this.filters.startTime,
          endTime: this.filters.endTime,
        };
        para.startTime = (!para.startTime || para.startTime == '') ? '' : util.formatDate.format(new Date(para.startTime),
          'yyyy-MM-dd');
        para.endTime = (!para.endTime || para.endTime == '') ? '' : util.formatDate.format(new Date(para.endTime),
          'yyyy-MM-dd');
        this.listLoading = true;
        queryMerStatement(para).then((res) => {
          let {
            status,
            message
          } = res;
          if (status == 200) {
            this.total = res.data.totalCount;
            this.users = res.data.merStatementList;
            this.listLoading = false;
          }
        })
      },
    },
    mounted() {
      this.getUsers();
    }
  }
</script>