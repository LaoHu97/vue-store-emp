<template>
  <section>
    <!--工具条-->
    <el-row>
      <el-col>
        <el-form :inline="true" :model="whole">
          <el-tag type="primary" style="margin:10px 10px 20px 0;">交易总金额（元）：{{whole.sumAmt}}元</el-tag>
          <el-tag type="primary" style="margin:10px 10px 20px 0;">交易总笔数（笔）：{{whole.countRow}}笔</el-tag>
        </el-form>
      </el-col>
    </el-row>
    <el-form :inline="true" :model="filters" ref="filters" label-width="100px" label-position="left">
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
            <el-date-picker class="fixed_search_input_datetime" v-model="filters.startTime" @change="changTime" type="datetime" placeholder="选择开始日期" :picker-options="pickerOptions1" :clearable="false" :editable='false'>
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            至
          </el-form-item>
          <el-form-item>
            <el-date-picker class="fixed_search_input_datetime" v-model="filters.endTime" type="datetime" placeholder="选择结束日期" :picker-options="pickerOptions2" :clearable="false" :editable='false' default-time="23:59:59">
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
        <el-alert title="可查询30天之前的交易，每次查询区间最多为3个月" type="warning" center close-text="知道了" show-icon>
        </el-alert>
      </el-row>
    </el-form>
    <!--列表-->
    <div v-loading="listLoading">
      <el-table :data="users" border highlight-current-row>
        <el-table-column prop="payTime" label="付款时间" min-width="170">
        </el-table-column>
        <el-table-column prop="orderId" label="订单号" min-width="290">
        </el-table-column>
        <el-table-column prop="goodsPrice" label="交易金额" width="120">
        </el-table-column>
        <el-table-column prop="payWay" label="支付方式" width="120" :formatter="format_payWay">
        </el-table-column>
        <el-table-column prop="status" label="交易状态" width="150" :formatter="formatPay2">
        </el-table-column>
        <el-table-column prop="storeName" label="收款门店" width="140">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">交易详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--工具条-->
    <el-row>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" background style="text-align:center;background:#fff;padding:15px;">
      </el-pagination>
    </el-row>

    <!--详情界面-->
    <el-dialog title="交易详情" :visible.sync="editFormVisible" :close-on-click-modal="false" width="600px">
      <el-form :model="editForm" label-width="160px" ref="editForm" label-position="left">
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
        <el-form-item label="退款金额（元）：">
          <span>{{editForm.refundAmount}}</span>
        </el-form-item>
        <el-form-item label="收款门店：">
          <span>{{editForm.storeName}}</span>
        </el-form-item>
        <el-form-item label="款台：">
          <span>{{editForm.username}}</span>
        </el-form-item>
        <el-form-item label="支付方式：">
          <span>{{formatPay1(editForm.payWay)}}</span>
        </el-form-item>
        <el-form-item label="备注：">
          <span>{{editForm.goodsDesc}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  import util from '../../common/js/util'
  import {
    getUserListPage,
    storeRefund,
    supplyPrint,
    queryOrderDetail,
    storeOrderShop,
    downloadQueryOrderDetail,
    downloadQueryOrderShop
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
          disabledDate: (time) => {
            if (time.getTime() > Date.now()) {
              return true;
            }
          }
        },
        pickerOptions2: {
          disabledDate: (time) => {
            let startTimeOne = Date.parse(new Date(util.formatDate.format(new Date(this.filters.startTime),
              'yyyy-MM-dd')));
            if (time.getTime() > startTimeOne + 3600 * 1000 * 24 * 90 || time.getTime() < startTimeOne - 3600 * 1000 *
              24 * 1) {
              return true;
            }
          }
        },
        searchLoading: false,
        //商户名
        filters: {
          startTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate() - 1),
          endTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate() - 1, 23, 59, 59),
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
        }
      }
    },
    methods: {
      changTime(date) {
        let end_time = Date.parse(new Date(util.formatDate.format(new Date(this.filters.endTime), 'yyyy-MM-dd')))
        let date_time = Date.parse(new Date(util.formatDate.format(new Date(date), 'yyyy-MM-dd')))
        if (date_time < end_time - 3600 * 1000 * 24 * 90) {
          this.filters.endTime = new Date(this.filters.startTime.getFullYear(), this.filters.startTime.getMonth(), this.filters.startTime.getDate(), 23, 59, 59)
        }
      },
      formatPay2: function (row, column) {
        return util.formatPayStatus(row.status, row.orderType)
      },
      formatPay1: function (row) {
        return util.formatPayment(row)
      },
      format_payWay(row, column) {
        return util.formatPayment(row.payWay)
      },
      format_payTime(props) {
        return util.formatDate.format(new Date(props), 'yyyy-MM-dd hh:mm:ss')
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList()
      },
      //获取用户列表
      getList() {
        this.listLoading = true;
        let para = {
          mid: sessionStorage.getItem('mid'),
          sid: sessionStorage.getItem('sid'),
          eid: sessionStorage.getItem('eid'),
          pageNum: this.page,
          payWay: this.filters.play,
          status: this.filters.state,
          startTime: this.filters.startTime,
          endTime: this.filters.endTime,
          orderId: this.filters.orderId,
          transactionId: this.filters.transaction_id,
          goodsPrice: this.filters.goodsprice,
          cardType: this.filters.cardType
        };
        para.startTime = (!para.startTime || para.startTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
          para.startTime), 'yyyy/MM/dd hh:mm:ss'))); //开始时间
        para.endTime = (!para.endTime || para.endTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
          para.endTime), 'yyyy/MM/dd hh:mm:ss'))); //开始时间
        downloadQueryOrderShop(para).then((res) => {
          var _this = this;
          let {
            data,
            message,
            status
          } = res;
          if (status == 200) {
            this.total = res.data.totalCount;
            this.whole.countRow = res.data.countRow;
            this.whole.sumAmt = res.data.sumAmt;
            this.users = res.data.summaryCopyList;
          }
          this.listLoading = false;
        });
      },
      getUsers() {
        this.page = 1
        this.getList()
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        downloadQueryOrderDetail({
          id: row.id
        }).then(res => {
          if (res.status === 200) {
            this.editForm = res.data.order
          }
        })
      },
      //查询重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    mounted() {
      this.getUsers('filters');
    }
  }
</script>
<style scoped>
.fixed_search_input {
  max-width: 145px;
}

.fixed_search_input_datetime {
  max-width: 195px;
}
</style>