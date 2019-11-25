<template lang="html">
  <div class="">
    <div class="bill1-top">
      <h3>交易账单</h3>
    </div>
    <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-form-item label="账单类型">
          <el-radio-group v-model="ruleForm.excel_type">
            <el-radio v-for="recson in optionsExcel" :label="recson.value" :key="recson.value">{{recson.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="交易类型">
          <el-radio-group v-model="ruleForm.accountType" :disabled="ruleForm.excel_type!=='od'">
            <el-radio :label="0">支付成功</el-radio>
            <el-radio :label="1">退款成功</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="支付方式">
          <el-radio-group v-model="ruleForm.recsonId">
            <el-radio v-for="recson in optionsScene" :label="recson.value" :key="recson.value">{{recson.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row v-show="ruleForm.excel_type=='od'">
        <el-form-item label="所在款台">
          <el-select v-model="ruleForm.emp" placeholder="请选择款台" clearable>
            <el-option v-for="item in empOptions" :value="item.eid" :label="item.value" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="选择时间" prop="resource">
          <el-date-picker v-model="ruleForm.startTime" :editable="false" :clearable="false" type="datetime" @change="changTime" :picker-options="pickerOptions1"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          至
        </el-form-item>
        <el-form-item label="" prop="endTime" label-width="0px">
          <el-date-picker v-model="ruleForm.endTime" :editable="false" :clearable="false" type="datetime" :picker-options="pickerOptions2"
            placeholder="选择日期" default-time="23:59:59">
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="注：">
          <span style="color:#999;">如果下载出现乱码，请选择office2003打开</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button style="margin-left: 100px;" type="primary" @click="submitForm('ruleForm')">立即下载</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import util from '../../common/js/util'
  import {
    lookupUser,
    downOrderExcelNew
  } from '../../api/api';
  export default {
    data() {
      var myDate = new Date();
      return {
        //时间控制
        pickerOptions1: {
          disabledDate: (time) => {
            // let startTimeOne = Date.parse(new Date(util.formatDate.format(new Date(this.ruleForm.endTime), 'yyyy-MM-dd')));
            if (time.getTime() > Date.now()) {
              return true;
            }
          }
        },
        pickerOptions2: {
          disabledDate: (time) => {
            let startTimeOne = Date.parse(new Date(util.formatDate.format(new Date(this.ruleForm.startTime),
              'yyyy-MM-dd')));
            if (time.getTime() > startTimeOne + 3600 * 1000 * 24 * 90 || time.getTime() < startTimeOne - 3600 * 1000 *
              24 * 1) {
              return true;
            }
          }
        },
        empOptions: [],
        ruleForm: {
          excel_type: 'od',
          accountType: 0,
          recsonId: '',
          startTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate() - 1),
          endTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate() - 1, 23, 59, 59),
          emp: ''
        },
        //账单类型
        optionsExcel: [{
          value: 'od',
          label: '交易明细'
        }, {
          value: 'sd',
          label: '门店日汇总'
        }, {
          value: 'ss',
          label: '门店汇总'
        }],
        //支付方式
        optionsScene: [{
          value: '',
          label: '所有'
        },{
          value: 'WX',
          label: '微信'
        }, {
          value: 'ALI',
          label: '支付宝'
        }, {
          value: 'BANK',
          label: '银行卡'
        }, {
          value: 'BEST',
          label: '翼支付'
        }, {
          value: 'UNIONPAY',
          label: '银联二维码'
        }]
      };
    },
    computed: {
      excel_type() {　　
        return this.ruleForm.excel_type　
      }
    },
    watch: {
      excel_type(curVal, oldVal) {
        // return curVal !== 'od' ? this.ruleForm.accountType = 0 : this.ruleForm.accountType
        if (curVal !== 'od') {
          this.ruleForm.accountType = 0
          this.ruleForm.emp = ''
        }
      }
    },
    methods: {
      changTime(date) {
        let end_time = Date.parse(new Date(util.formatDate.format(new Date(this.ruleForm.endTime), 'yyyy-MM-dd')))
        let date_time = Date.parse(new Date(util.formatDate.format(new Date(date), 'yyyy-MM-dd')))
        if (date_time < end_time - 3600 * 1000 * 24 * 90) {
          this.ruleForm.endTime = new Date(this.ruleForm.startTime.getFullYear(), this.ruleForm.startTime.getMonth(), this.ruleForm.startTime.getDate(), 23, 59, 59)
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = {
              mid: sessionStorage.getItem('mid'),
              sid: sessionStorage.getItem('sid'),
              order_type: String(this.ruleForm.accountType),
              payWay: this.ruleForm.recsonId,
              startTime: this.ruleForm.startTime,
              endTime: this.ruleForm.endTime,
              excel_type: this.ruleForm.excel_type,
              eId: this.ruleForm.emp
            }
            para.startTime = (!para.startTime || para.startTime == '') ? '' : String(Date.parse(util.formatDate.format(
              new Date(para.startTime), 'yyyy/MM/dd hh:mm:ss')));
            para.endTime = (!para.endTime || para.endTime == '') ? '' : String(Date.parse(util.formatDate.format(
              new Date(para.endTime), 'yyyy/MM/dd hh:mm:ss')));
            downOrderExcelNew(para).then(res => {
              if (res.data.status === 200) {
                this.$message({
                  message: res.data.message,
                  type: 'success'
                });
              }
            })
            // let url =
            //   `${downOrderExcelNew}?eId=${para.eId}&order_type=${para.order_type}&excel_type=${para.excel_type}&sid=${para.sid}&endTime=${para.endTime}&startTime=${para.startTime}&payWay=${para.payWay}&mid=${para.mid}`;
            // window.location.href = url
          }
        });
      },
    },
    mounted() {
      lookupUser().then(res => {
        if (res.status === 200) {
          this.empOptions = res.data.emplyeeList
        }
      })
    }
  }
</script>
<style media="screen">
  .bill1-top {
    padding: 0 25px;
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;
  }

  .demo-ruleForm {
    padding: 0 25px;
    width: 850px;
    margin: auto;
  }
</style>