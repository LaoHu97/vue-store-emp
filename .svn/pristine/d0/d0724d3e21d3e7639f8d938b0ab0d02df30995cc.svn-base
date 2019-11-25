<template>
<el-col :span="12" style="padding: 0 0 10px 10px">
  <el-form ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="退款渠道">
      <el-radio-group v-model="form.resource" :disabled='test()'>
        <el-radio v-model="form.radio" label='010'>微信</el-radio>
        <el-radio v-model="form.radio" label="020" :disabled='testpay()'>支付宝</el-radio>
        <el-radio v-model="form.radio" label="060" :disabled='testpay()'>QQ钱包</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="退款方式">
      <el-radio-group v-model="form.resourceType" :disabled='test()'>
        <el-radio v-model="form.radio" label='1'>部分退款</el-radio>
        <el-radio v-model="form.radio" label="0">全额退款</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="退款金额" prop="input1">
      <el-input v-model="form.input1" placeholder="请输入退款金额" :disabled='test()'></el-input>
    </el-form-item>
    <el-form-item label="退款订单号" prop="input2">
      <el-input v-model.trim="form.input2" placeholder="请输入退款订单号" :disabled='test()'></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')" :disabled='test()' v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在退款中">确认退款</el-button>
    </el-form-item>
  </el-form>
</el-col>
</template>

<script>
import util from '../../common/js/util'
import NProgress from 'nprogress'
import {
  payRefundNew,
  refundNew,
  micropayRefundNew
} from '../../api/api';
export default {
  data() {
    var input1 = (rule, value, callback) => {
          if (value === '') {
            callback();
          } else if (!/^(([1-9][0-9]*)|([0]\.[1-9]{1})|([0]\.[1-9][0-9]{1})|([0]\.[0-9][1-9]{1})|([1-9][0-9]*\.\d{0,2}))$/.test(value)) {
            callback(new Error('请输入正确的支付金额'));
          }else {
            callback();
          }
        };
        var input2 = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入退款订单号'));
              } else {
                callback();
              }
            };
    return {
      fullscreenLoading:false,
      form: {
        resource: '010',
        resourceType: '0',
        input1: '',
        input2: '',
        desc: '',
        radio: ''
      },
      rules: {
        input2: [{
          required: true,
          message: '请输入退款订单号'
        },
        { validator: input2, trigger: 'blur' }
        ],
        input1: [{ validator: input1, trigger: 'blur' }]
      }
    }
  },
  methods: {
    testpay: function() {
      let type = JSON.parse(sessionStorage.getItem('type'));
      if (type == 1) {
        return true
      }
    },
    test: function() {
      let type = JSON.parse(sessionStorage.getItem('type'));
      if (type == 2) {
        return true
      }
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.fullscreenLoading=true;
          let para = {
            type: this.form.resource,
            refundtype: this.form.resourceType,
            amount: this.form.input1,
            authCode: this.form.input2,
          }
          let type = JSON.parse(sessionStorage.getItem('type'));
          if (type == 5) {
            refundNew(para).then((res) => {
              this.fullscreenLoading=false;
              var _this = this;
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
          } else if (type == 3) {
            payRefundNew(para).then((res) => {
              this.fullscreenLoading=false;
              var _this = this;
              let {
                status,
                message
              } = res;
              if (status == 200) {
                this.$message({
                  message:message,
                  type: 'success'
                });
              }
            })
          } else if (type == 1) {
            micropayRefundNew(para).then((res) => {
              this.fullscreenLoading=false;
              var _this = this;
              let {
                status,
                message
              } = res;
              if (status == 200) {
                this.$message({
                  message:message,
                  type: 'success'
                });
              }
            })
          }
        } else {
          return false
        }
      }, );
    }
  }
}
</script>
