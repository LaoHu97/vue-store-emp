<template>
<div @keyup.enter="show()">
  <el-col :span="12" style="padding: 0 0 10px 10px">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="收款类型">
        <el-radio-group v-model="form.resource" :disabled='test()'>
          <el-radio v-model="form.radio" label='010'>微信</el-radio>
          <el-radio v-model="form.radio" label="020" :disabled='testpay()'>支付宝</el-radio>
          <el-radio v-model="form.radio" label="060" :disabled='testpay()'>QQ钱包</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="支付金额" prop="input1">
        <el-input v-model="form.input1" placeholder="请输入支付金额" :disabled='test()' :autofocus="true"></el-input>
      </el-form-item>
      <el-form-item label="刷卡授权码" prop="input2">
        <el-input v-model="form.input2" placeholder="请输入刷卡授权码" :disabled='test()'></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.desc" :disabled='test()'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')" :disabled='test()' v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在支付中">扫描支付</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</div>
</template>

<script>
import util from '../../common/js/util'
import NProgress from 'nprogress'
import {
  scanpayNew,
  bigBarcodepayNew,
  micropayNew
} from '../../api/api';
export default {
  data() {
    var input1 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入支付金额'));
          } else if (!/^(([1-9][0-9]*)|([0]\.[1-9]{1})|([0]\.[1-9][0-9]{1})|([0]\.[0-9][1-9]{1})|([1-9][0-9]*\.\d{0,2}))$/.test(value)) {
            callback(new Error('请输入正确的支付金额'));
          }else {
            callback();
          }
        };
        var input2 = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入刷卡授权码'));
              } else if (!/^[0-9]*$/.test(value)) {
                callback(new Error('请输入正确的刷卡授权码'));
              }else {
                callback();
              }
            };
    return {
      fullscreenLoading:false,
      form: {
        resource: '010',
        input1: '',
        input2: '',
        desc: '',
        radio: ''
      },
      timeout: null,
      rules: {
        input1: [{
            required: true,
            message: '请输入支付金额',
            trigger: 'blur'
          },
          { validator: input1, trigger: 'blur' }
        ],
        input2: [{
          required: true,
          message: '请输入刷卡授权码',
        },
        { validator: input2, trigger: 'blur' }
        ]
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
    show: function() {
      this.onSubmit()
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.fullscreenLoading=true;
          let para = {
            type: this.form.resource,
            amount: this.form.input1,
            authCode: this.form.input2,
            desc: this.form.desc
          }
          let type = JSON.parse(sessionStorage.getItem('type'));
          NProgress.start();
          if (type == 3) {
            scanpayNew(para).then((res) => {
              this.fullscreenLoading=false;
              var _this = this;
              let {
                status,
                message
              } = res;
              if (status == 200) {
                this.$message({
                  title: '成功',
                  message:message,
                  type: 'success'
                });
                this.form.input2 = '';
              }
            })
          } else if (type == 5) {
            bigBarcodepayNew(para).then((res) => {
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
                this.form.input2 = '';
              }
            })
          } else if (type == 1) {
            micropayNew(para).then((res) => {
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
                this.form.input2 = '';
              }
            })
          }
          NProgress.done();
        } else {
          return false
        }
      }, );
    }
  }
}
</script>
