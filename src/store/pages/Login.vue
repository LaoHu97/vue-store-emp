<template>
  <div style="background-color: #fff">
    <el-row>
      <el-col :span="24">
        <div style="height: 60px;background-color: #fff;">
          <img src="../assets/webwxgetmsgimg.png" alt="logo" width="227px" height="35px;" style="margin-top: 12px;margin-left: 20px;">
          <div class="topList">
            <a href="http://weixin.weupay.com/pay/web/shop.html#/login">商户登录</a>
            <a href="http://weixin.weupay.com/pay/web/store.html#/login">门店登录</a>
            <a href="http://weixin.weupay.com/pay/web/emp.html#/login">款台登录</a>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="center" @keyup.enter="show()" :style="{backgroundImage: 'url(' +bImg + ')'}">
      <el-form :model="user" ref="user" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">门店登录</h3>
        <el-form-item prop="account">
          <el-input type="text" v-model.trim="user.account" auto-complete="off" placeholder="请输入用户名">
            <template slot="prepend">
              <img src="../../assets/img/accont.png" style="width:20px;height:20px;" alt="">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model.trim="user.checkPass" auto-complete="off" placeholder="请输入密码">
            <template slot="prepend">
              <img src="../../assets/img/pass.png" style="width:20px;height:20px;" alt="">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="passCode">
          <el-input type="text" v-model="user.passCode" auto-complete="off" placeholder="请输入验证码" style="width:50%;float:left;display:block"></el-input>
          <el-tooltip content="看不清？请点击" placement="top" effect="light">
            <img :src="user.code" @click="code" alt="验证码" style="float:right;width:75px;height:36px;">
          </el-tooltip>
        </el-form-item>
        <el-button type="primary" style="width:100%;background-color:#0066cc;border-color:#0066cc" @click.native.prevent="handleSubmit2"
          :loading="logining">登 录</el-button>
        <span style="color:#ff4949;text-align:center;display: inherit;font-size:12px;">{{user.Verification}}</span>
        <span class="title" style="display: block;">忘记密码 请联系客服
          <br>0 2 9-8 8 4 4 5 5 3 4</span>
      </el-form>
    </div>
    <div class="news">
      <div class="notice">
        最新公告
      </div>
      <a href="http://www.wandingkeji.cn/newsitem/277761358" target="_blank">1、帮助商家便捷接入微信、支付宝</a>
      <a href="http://www.wandingkeji.cn/newsitem/277185235" target="_blank">2、帮助商家进行微信公众平台开发运营</a>
      <a href="#">3、《商户平台使用手册》即将上线</a>
      <a class="gengduo" href="http://www.wandingkeji.cn">
        查看更多>>
      </a>
    </div>
    <div class="service">
      <h2>商户入驻流程</h2>
      <el-steps space="45%" :active="1" :align-center='true'>
        <el-step title="提交资料" description=""></el-step>
        <el-step title="审核认证" description=""></el-step>
        <el-step title="开始使用" description=""></el-step>
      </el-steps>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">版权所有：西安万鼎网络科技有限公司 | ICP备 陕17002918号</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {
    requestLogin,
    getCode
  } from '../api/api';
  import Md5 from 'md5'
  export default {
    data() {
      return {
        bImg: require('../../assets/img/57be6c6cb3d28_1024.jpg'),
        logining: false,
        user: {
          account: '',
          checkPass: '',
          code: '',
          passCode: '',
          Verification: '',
        },
      };

    },
    //首次加载验证码
    mounted() {
      this.code()
    },
    methods: {
      //回车登录
      show: function () {
        this.handleSubmit2()
      },
      //获取验证码
      code: function () {
        let para = {
          timestamp: (new Date()).valueOf()
        }
        this.user.code = getCode + "?" + "timestamp=" + para.timestamp
      },
      handleSubmit2: function () {
        sessionStorage.clear();
        var _this = this;
        this.$refs.user.validate((valid) => {
          if (valid) {
            _this.$router.replace('/table');
            this.logining = true;
            var mpwd = Md5(this.user.checkPass + this.user.account);
            var loginParams = {
              maccount: this.user.account,
              mpwd,
              inCode: this.user.passCode,
              type: "2"
            };
            requestLogin(loginParams).then(datas => {
              var user = datas.data.userName;
              var name = this.user.account;
              this.logining = false;
              let {
                data,
                message,
                status
              } = datas;
              //console.log(this.users);
              if (status == 200) {
                var mid = data.userLogin.mid;
                var sid = data.userLogin.storeId;
                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('name', JSON.stringify(name));
                sessionStorage.setItem('mid', JSON.stringify(mid));
                sessionStorage.setItem('sid', JSON.stringify(sid));
                this.$router.push({
                  path: '/table'
                });
              } else {
                this.user.Verification = message;
                this.user.checkPass = '';
                this.user.passCode = '';
                let para = {
                  timestamp: (new Date()).valueOf()
                }
                this.user.code = getCode + "?" + "timestamp=" + para.timestamp
              }
            });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 3px;
    border-radius: 3px;
    -moz-border-radius: 3px;
    background-clip: padding-box;
    background-color: rgba(255, 255, 255, 0.4);
    float: right;
    padding: 25px 35px 0;
    width: 240px;
    margin: 20px 45px 20px 0;
    .title {
      font-weight: normal;
      margin: 0 auto 15px;
      text-align: center;
      color: #fff;
    }
    .remember {
      margin: 0 0 20px;
    }
  }

  .grid-content {
    border-top: 1px solid #bfcbd9;
    width: 100%;
    min-height: 60px;
    background-color: #fff;
    text-align: center;
    line-height: 60px;
    color: #333;
    margin-top: 120px;
  }

  .grid-content img {
    text-align: left;
  }

  .center {
    overflow: hidden;
    background: center;
  }

  .news {
    overflow: hidden;
    margin-top: 20px;
    padding: 0 6%;
  }

  .news .notice {
    background-color: #F7BA2A;
    padding: 5px 10px;
    border-radius: 3px;
    color: #fff;
    margin-right: 20px;
    float: left;
  }

  .news a {
    line-height: 30px;
    color: #333;
    width: 25%;
    display: block;
    float: left;
    text-decoration: none;
  }

  .news a:hover {
    color: #1D8CE0;
  }

  .gengduo {
    line-height: 30px;
    color: #333;
    float: left;
    display: block;
    width: 80px !important;
  }

  .gengduo:hover {
    color: #1D8CE0;
  }

  .service h2 {
    color: #333;
    padding: 50px 6%;
  }

  .service .ruzhu {
    width: 200px;
    position: absolute;
    left: 50%;
    margin-left: -100px;
    overflow: hidden;
    margin-top: 25px;
  }

  .topList {
    float: right;
    line-height: 60px;
    margin-right: 100px;
  }

  .topList a {
    text-decoration: none;
    margin: 0 25px;
    color: #333;
  }

  .topList a:hover {
    color: #1D8CE0;
  }
</style>