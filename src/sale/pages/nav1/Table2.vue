<template>
  <section>
    <!--工具条-->
    <el-row>
      <el-form :inline="true" :model="filters">
        <el-form-item label="日期时间">
          <el-date-picker v-model="filters.time1" class="fixed_search_input_date" placeholder="选择开始日期" :picker-options="pickerOptions1" :clearable="false" :editable='false'>
          </el-date-picker>
        </el-form-item>
        <el-form-item>至</el-form-item>
        <el-form-item>
          <el-date-picker v-model="filters.time2" class="fixed_search_input_date" placeholder="选择结束日期" :picker-options="pickerOptions2" :clearable="false" :editable='false'>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="商户名称">
          <el-select v-model="filters.state1" class="fixed_search_input" placeholder="商户名称" :multiple="false" filterable remote :remote-method="remoteShop"
            :loading="loading" clearable @visible-change="clickShop">
            <el-option v-for="item in optionsMers" :key="item.mid" :value="item.mid" :label="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付场景">
          <el-select v-model="filters.play" class="fixed_search_input" clearable placeholder="支付场景">
            <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsers" round>查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!--列表-->
    <el-table :data="users" border highlight-current-row v-loading="listLoading">
      <el-table-column prop="orderId" label="订单ID" min-width="280">
      </el-table-column>
      <el-table-column prop="mname" label="商户名称" min-width="150">
      </el-table-column>
      <el-table-column prop="payTime" label="付款时间" min-width="170" :formatter="payTime_formatter">
      </el-table-column>
      <el-table-column prop="goodsPrice" label="付款金额" min-width="150">
      </el-table-column>
      <el-table-column prop="status" label="支付状态" min-width="150" :formatter="formatPay2">
      </el-table-column>
      <el-table-column prop="payWay" label="支付场景" min-width="100" :formatter="formatPay1">
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
    queryOrdersBySalesman,
    selectMersByName
  } from '../../api/api';

  export default {
    data() {
      return {
        mid: '',
        restaurants: [],
        state4: '',
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
        //时间控制
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 7;
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 7;
          }
        },
        //商户名
        filters: {
          time1: Date(),
          time2: Date(),
          play: '',
          state1: '',
        },
        loading: false,
        optionsMers: [],
        total: 0,
        page: 1,
        users: [],
        listLoading: false,
      }
    },
    methods: {
      payTime_formatter(row) {
        return row.payTime = util.formatDate.format(new Date(row.payTime), 'yyyy-MM-dd hh:mm:ss')
      },
      formatPay1: function (row) {
        return row.payWay == 'WX' ? '微信' : row.payWay == 'ALI' ? '支付宝' : row.payWay == 'DEBIT' ? '借记卡' : row.payWay ==
          'CREDIT' ? '贷记卡' : row.payWay == 'BEST' ? '翼支付' : '未知';
      },
      formatPay2: function (row) {
        return row.status == 1 ? '已支付' : row.status == 3 ? '已支付（有退款）' : '未知';
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
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      //获取用户列表
      getUsers() {
        let para = {
          mid: String(this.filters.state1),
          pageNum: this.page,
          startTime: this.filters.time1,
          endTime: this.filters.time2,
          payWay: this.filters.play,
        };
        para.startTime = (!para.startTime || para.startTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(para.startTime),
          'yyyy/MM/dd'))); //开始时间
        para.endTime = (!para.endTime || para.endTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(para.endTime),
          'yyyy/MM/dd'))); //结束时间
        this.listLoading = true;
        queryOrdersBySalesman(para).then((res) => {
          this.listLoading = false;
          let {
            data,
            message,
            status
          } = res;
          if (status == 200) {
            this.total = res.data.totalCount;
            this.users = res.data.orderList;
          }
        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      }
    },
    mounted() {
      this.getUsers();
    }
  }
</script>