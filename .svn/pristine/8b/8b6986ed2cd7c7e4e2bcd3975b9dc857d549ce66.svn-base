<template>
  <section>
    <!--工具条-->
    <el-row>
      <el-tag type="primary" style="margin:10px 10px 20px 0;">交易总金额（元）：{{whole.sumAmt}}元</el-tag>
      <el-tag type="primary" style="">交易总笔数（笔）：{{whole.countRow}}笔</el-tag>
    </el-row>

    <el-form :inline="true" :model="filters" ref="filters" label-position="left" label-width="100px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="支付状态">
            <el-select v-model="filters.state" class="fixed_search_input" clearable placeholder="支付状态">
              <el-option v-for="item in optionsState" :label="item.label" :value="item.value" :key="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="支付方式">
            <el-select v-model="filters.play" class="fixed_search_input" clearable placeholder="支付方式">
              <el-option v-for="item in optionsScene" :label="item.labelScene" :value="item.valueScene" :key="item.valueScene">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="银行卡类型">
            <el-select v-model="filters.cardType" class="fixed_search_input" clearable placeholder="银行卡类型">
              <el-option v-for="item in optionsBank" :label="item.label" :value="item.value" :key="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="交易金额">
            <el-input v-model.trim="filters.goodsprice" class="fixed_search_input" placeholder="交易金额">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单号">
            <el-input v-model.trim="filters.orderId" class="fixed_search_input" placeholder="订单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="第三方订单号">
            <el-input v-model.trim="filters.transaction_id" class="fixed_search_input" placeholder="第三方订单号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="日期时间">
            <el-date-picker class="fixed_search_input_datetime" v-model="filters.startTime" type="datetime" placeholder="选择开始日期" :picker-options="pickerOptions1" :clearable="false" :editable='false'>
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            至
          </el-form-item>
          <el-form-item>
            <el-date-picker class="fixed_search_input_datetime" v-model="filters.endTime" type="datetime" placeholder="选择结束日期" :picker-options="pickerOptions2" :clearable="false" :editable='false'>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="getUsers('filters')" round>查询</el-button>
            <el-button @click="resetForm('filters')" round>重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-alert title="可查询最近30天之内的交易" type="warning" center close-text="知道了" show-icon>
        </el-alert>
      </el-row>
    </el-form>
    <!--列表-->
    <el-table :data="users" border highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="payTime" label="付款时间" min-width="180">
      </el-table-column>
      <el-table-column prop="orderId" label="订单号" min-width="170">
      </el-table-column>
      <el-table-column prop="goodsPrice" label="交易金额" width="110">
      </el-table-column>
      <el-table-column prop="status" label="交易状态" width="120" :formatter="formatPay2">
      </el-table-column>
      <el-table-column prop="storeName" label="收款门店" width="150">
      </el-table-column>
      <el-table-column prop="payWay" label="支付方式" width="120" :formatter="formatPay1">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">交易详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-row>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" background style="text-align:center;background:#fff;padding:15px;">
      </el-pagination>
    </el-row>

    <!--编辑界面-->
    <el-dialog title="交易详情" :visible.sync="editFormVisible" :close-on-click-modal="false" width="600px">
      <el-form :model="editForm" label-width="" ref="editForm">
        <el-form-item label="订单号：">
          <span>{{editForm.orderId}}</span>
        </el-form-item>
        <el-form-item label="第三方订单号：">
          <span>{{editForm.transactionId}}</span>
        </el-form-item>
        <el-form-item label="交易金额（元）：">
          <span>{{editForm.goodsPrice}}</span>
        </el-form-item>
        <el-form-item label="付款时间：">
          <span>{{format_payTime(editForm.payTime)}}</span>
        </el-form-item>
        <el-form-item label="交易状态：">
          <span>{{formatPay2(editForm)}}</span>
        </el-form-item>
        <el-form-item label="退款金额：">
          <span>{{editForm.refundAmount}}</span>
        </el-form-item>
        <el-form-item label="收款门店：">
          <span>{{editForm.storeName}}</span>
        </el-form-item>
        <el-form-item label="款台：">
          <span>{{editForm.username}}</span>
        </el-form-item>
        <el-form-item label="支付方式：">
          <span>{{format_payWay(editForm.payWay)}}</span>
        </el-form-item>
        <el-form-item label="备注：">
          <span>{{editForm.goodsDesc}}</span>
        </el-form-item>
        <el-button type="primary" @click="Print" style="margin-left:45%;">补发打印</el-button>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  import util from '../../common/js/util'
  import {
    queryOrderShop,
    supplyPrint,
    queryOrderDetail
  } from '../../api/api';

  export default {
    data() {
      var myDate = new Date();
      return {
        //支付方式
        optionsScene: [{
          valueScene: 'WX',
          labelScene: '微信'
        }, {
          valueScene: 'ALI',
          labelScene: '支付宝'
        }, {
          valueScene: 'BANK',
          labelScene: '银行卡'
        }, {
          valueScene: 'BEST',
          labelScene: '翼支付'
        }, {
          valueScene: 'UNIONPAY',
          labelScene: '银联二维码'
        }],
        //支付状态
        optionsState: [{
          value: 'SUCCESS',
          label: '支付成功'
        }, {
          value: 'REFUND',
          label: '退款成功'
        }, {
          value: 'FAIL',
          label: '支付失败'
        }, {
          value: 'UNKNOWN',
          label: '未知'
        }],
        //银行卡类型
        optionsBank: [{
          value: 'DEBIT',
          label: '借记卡'
        }, {
          value: 'CREDIT',
          label: '贷记卡'
        }],
        //时间控制
        pickerOptions1: {
          disabledDate(time) {
            let date = new Date();
            return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 35;
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
          startTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()),
          endTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), 23, 59, 59),
          play: '',
          state: 'SUCCESS',
          goodsprice: '',
          transaction_id: '',
          goodsprice: '',
          cardType: ''
        },
        whole: {
          sumAmt: "",
          countRow: ""
        },
        total: 0,
        page: 1,
        users: [],
        listLoading: false,
        advancedOptions: true,
        empSearchLoading: false,

        editFormVisible: false, //编辑界面是否显示
        editLoading: false,
        //编辑界面数据
        editForm: {
          orderId: '',
          transactionId: '',
          goodsPrice: '',
          payTime: '',
          status: '',
          storeName: '',
          refundAmount: '',
          payWay: ''
        },

        addFormVisible: false, //新增界面是否显示
        addLoading: false
      }
    },
    methods: {
      formatPay2: function (row, column) {
        return util.formatPayStatus(row.status, row.orderType)
      },
      formatPay1: function (row, column) {
        return util.formatPayment(row.payWay)
      },
      format_payWay(row) {
        return util.formatPayment(row)
      },
      format_payTime(props) {
        return util.formatDate.format(new Date(props), 'yyyy-MM-dd hh:mm:ss')
      },
      //补发打印
      Print: function () {
        let para = {
          orderId: this.editForm.orderId
        }
        supplyPrint(para).then((res) => {
          let {
            status,
            message
          } = res;
          if (status == 200) {
            this.$message({
              message: message,
              type: 'success'
            });
          }
        })
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      //获取用户列表
      getUsers() {
        let para = {
          pageNum: this.page,
          payWay: this.filters.play,
          status: this.filters.state,
          startTime: this.filters.startTime,
          endTime: this.filters.endTime,
          orderId: this.filters.orderId,
          transactionId: this.filters.transaction_id,
          goodsPrice: this.filters.goodsprice,
          cardType: this.filters.cardType,
        };
        para.startTime = (!para.startTime || para.startTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
          para.startTime), 'yyyy/MM/dd hh:mm:ss'))); //开始时间
        para.endTime = (!para.endTime || para.endTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
          para.endTime), 'yyyy/MM/dd hh:mm:ss'))); //开始时间
        this.listLoading = true;
        queryOrderShop(para).then((res) => {
          if (res.status == 200) {
            this.total = res.data.totalCount;
            this.filters.time1 = res.data.returnST;
            this.whole.countRow = res.data.countRow;
            this.whole.sumAmt = res.data.sumAmt;
            this.users = res.data.summaryCopyList;
          }
          this.listLoading = false;
        });
      },
      //查询重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        queryOrderDetail({
          id: row.id

        }).then(res => {
          if (res.status === 200) {
            this.editForm = res.data.order
          }
        })
      }
    },
    mounted() {
      this.getUsers();
    }
  }
</script>