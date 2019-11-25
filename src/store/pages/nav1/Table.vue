<template>
  <section>
    <!--工具条-->
    <el-row>
      <el-form :inline="true" :model="whole">
        <el-tag type="primary" style="margin:10px 10px 20px 0;">交易总金额（元）：{{whole.sumAmt}}元</el-tag>
        <el-tag type="primary" style="margin:10px 10px 20px 0;">交易总笔数（笔）：{{whole.countRow}}笔</el-tag>
        <el-tag type="primary" style="margin:10px 10px 20px 0;">会员卡交易总金额（元）：{{whole.memAmt}}元</el-tag>
        <el-tag type="primary" style="">会员卡交易总笔数（笔）：{{whole.memCount}}笔</el-tag>
      </el-form>
    </el-row>
    <el-form :inline="true" :model="filters" ref="filters" label-position="left" label-width="100px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="款台名称">
            <el-select v-model="filters.empName"  class="fixed_search_input" placeholder="款台名称" :multiple="false" filterable remote :remote-method="remoteEmp" :loading="empSearchLoading" clearable @visible-change="clickEmp">
              <el-option v-for="item in optionsEmp" :key="item.eid" :value="item.eid" :label="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="支付状态">
            <el-select v-model="filters.state" class="fixed_search_input" clearable placeholder="支付状态">
              <el-option v-for="item in optionsState" :label="item.label" :value="item.value" :key="item.valueState">
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
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="交易金额">
            <el-input v-model.trim="filters.goodsprice" class="fixed_search_input" placeholder="交易金额">
            </el-input>
          </el-form-item>
        </el-col>
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
            <el-date-picker v-model="filters.startTime" class="fixed_search_input_datetime" type="datetime" :editable="false" :clearable="false" :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            至
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="filters.endTime" class="fixed_search_input_datetime" type="datetime" :editable="false" :clearable="false" :picker-options="pickerOptions2">
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
      <el-table-column prop="status" label="交易状态" width="150" :formatter="formatPay2">
      </el-table-column>
      <el-table-column prop="username" label="收款员工" width="150">
      </el-table-column>
      <el-table-column prop="payWay" label="支付方式" width="100" :formatter="formatPay1">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">交易详情</el-button>
          <el-button type="danger" size="mini" @click="handleRefund(scope.$index, scope.row)">退款</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-row>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" background style="text-align:center;background:#fff;padding:15px;">
      </el-pagination>
    </el-row>

    <!--编辑界面-->
    <el-dialog title="交易详情" :visible.sync="editFormVisible" :close-on-click-modal="false" width="500px">
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
          <span>{{formatPay3(editForm.payWay)}}</span>
        </el-form-item>
        <el-form-item label="备注：">
          <span>{{editForm.goodsDesc}}</span>
        </el-form-item>
        <el-button type="primary" @click="Print" style="margin-left:45%;">补发打印</el-button>
      </el-form>
    </el-dialog>
    <!--退款界面-->
    <el-dialog title="退款" :visible.sync="refundFormVisible" :close-on-click-modal="false" width="520px" @close="dialogClose">
      <el-form :model="refundForm" :rules="refundFormRules" ref="refundForm" label-position="left" label-width="120px">
        <el-form-item label="订单号：">
          <span>{{refundForm.orderId}}</span>
        </el-form-item>
        <el-form-item label="第三方订单号：">
          <span>{{refundForm.transactionId}}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="refundForm.code" style="width:220px"></el-input>
          <el-button plain @click="getCode" :disabled="disabledCode">{{auth_time}}{{codeText}}</el-button>
        </el-form-item>
        <el-form-item label="退款金额" prop="amount">
          <el-input v-model="refundForm.amount" auto-complete="off" placeholder="请输入退款金额"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="refundForm.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="refundFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="refundSubmit" :loading="refundLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import util from '../../common/js/util'
  import {
    getUserListPage,
    lookupUser,
    storeRefund,
    supplyPrint,
    queryOrderDetail,
    StoreSendVerCode,
    selectEmpsBySid
  } from '../../api/api';

  export default {
    data() {
      var myDate = new Date();
      var amount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入退款金额'));
        } else if (!
          /^(([1-9][0-9]*)|([0]\.[1-9]{1})|([0]\.[1-9][0-9]{1})|([0]\.[0-9][1-9]{1})|([1-9][0-9]*\.\d{0,2}))$/.test(
            value)) {
          callback(new Error('请输入正确的退款金额'));
        } else {
          callback();
        }
      };
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
        optionsEmp: [],
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
        empSearchLoading: false,
        advancedOptions: true,
        //商户名
        filters: {
          startTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()),
          endTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), 23, 59, 59),
          play: '',
          state: 'SUCCESS',
          goodsprice: '',
          transaction_id: '',
          goodsprice: '',
          cardType: '',
          empName: ''
        },
        whole: {
          sumAmt: "",
          countRow: "",
          memAmt: "",
          memCount: ""
        },
        total: 0,
        page: 1,
        users: [],
        listLoading: false,

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
        refundFormVisible: false, //退款界面是否显示
        refundLoading: false,
        refundForm: {

        },
        refundFormRules: {
          code: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }],
          amount: [{
              required: true,
              validator: amount,
              trigger: 'blur'
            },
            {
              max: 10,
              message: '请输入正确的退款金额',
              trigger: 'blur'
            }
          ]
        },
        codeText: '获取验证码',
        auth_time: null,
        disabledCode: false
      }
    },
    methods: {
      formatPay2: function (row, column) {
        return util.formatPayStatus(row.status, row.orderType)
      },
      formatPay1: function (row, column) {
        return util.formatPayment(row.payWay)
      },
      formatPay3: function (row) {
        return util.formatPayment(row)
      },
      format_payTime(props) {
        return util.formatDate.format(new Date(props), 'yyyy-MM-dd hh:mm:ss')
      },
      dialogClose() {
        this.codeText = '获取验证码'
        this.auth_time = null
        this.disabledCode = false
      },
      //款台远程搜索
      clickEmp: function () {
        this.empSearchLoading = true;
        let para = {
          ename: '',
          mid: sessionStorage.getItem('mid'),
          storeId: sessionStorage.getItem('sid')
        }
        selectEmpsBySid(para).then((res) => {
          this.empSearchLoading = false;
          let {
            status,
            data
          } = res
          this.optionsEmp = data.emplyeeList
        })
      },
      remoteEmp(query) {
        if (query !== '') {
          this.empSearchLoading = true;
          setTimeout(() => {
            this.empSearchLoading = false;
            let para = {
              ename: query,
              mid: sessionStorage.getItem('mid'),
              storeId: sessionStorage.getItem('sid')
            }
            selectEmpsBySid(para).then((res) => {
              let {
                status,
                data
              } = res
              this.optionsEmp = data.emplyeeList
            })
          }, 200);
        } else {
          this.optionsEmp = [];
        }
      },
      getCode() {
        let para = {
          orderId: this.refundForm.orderId
        }
        StoreSendVerCode(para).then((res) => {
          if (res.status === 200) {
            this.disabledCode = true
            this.codeText = 's后重新获取'
            this.auth_time = 60
            let auth_timetimer = setInterval(() => {
              this.auth_time--
                if (this.auth_time <= 0) {
                  this.codeText = '获取验证码'
                  this.auth_time = null
                  this.disabledCode = false
                  clearInterval(auth_timetimer)
                }
            }, 1000)
          }
        })
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
              title: '成功',
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
          eid: String(this.filters.empName)
        };
        para.startTime = (!para.startTime || para.startTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
          para.startTime), 'yyyy/MM/dd hh:mm:ss'))); //开始时间
        para.endTime = (!para.endTime || para.endTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
          para.endTime), 'yyyy/MM/dd hh:mm:ss'))); //开始时间
        this.listLoading = true;
        lookupUser().then((res) => {
          var _this = this;
          let {
            status,
            message
          } = res;
          if (status == 200) {
            this.options = res.data.emplyeeList;
          }

        });
        getUserListPage(para).then((res) => {
          this.listLoading = false;
          let {
            data,
            message,
            status
          } = res;
          if (status == 200) {
            this.total = res.data.totalCount;
            this.whole.countRow = res.data.countRow;
            this.whole.sumAmt = res.data.sumAmt;
            this.whole.memAmt = res.data.memAmt;
            this.whole.memCount = res.data.memCount;
            this.users = res.data.summaryCopyList;
          }
        });
      },
      //显示退款
      handleRefund: function (index, row) {
        this.refundFormVisible = true
        queryOrderDetail({
          id: row.id
        }).then(res => {
          this.refundForm = res.data.order
        })
      },
      //确定退款
      refundSubmit() {
        this.$refs.refundForm.validate((valid) => {
          if (valid) {
            this.$confirm('是否确定退款？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let para = {
                authCode: this.refundForm.orderId,
                amount: this.refundForm.amount,
                desc: this.refundForm.desc,
                verCode: this.refundForm.code
              }
              storeRefund(para).then((res) => {
                let {
                  status,
                  message
                } = res;
                if (status == 200) {
                  this.getUsers();
                  this.$message({
                    type: 'success',
                    message: message
                  });
                }
              })
              this.refundFormVisible = false;
            }).catch(() => {
              this.refundFormVisible = false;
              this.$message({
                type: 'info',
                message: '已取消退款'
              });
            });
          }
        });
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