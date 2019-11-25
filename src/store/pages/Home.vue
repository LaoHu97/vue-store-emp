<template>
  <div style="height:100%">
    <el-container class="container">
      <el-header style="background: #fff;height:auto">
        <el-row class="header">
          <el-col :span="8" class="logo">
            <img src="../assets/logo4.png" />
            <span>万 鼎 科 技</span>
          </el-col>
          <el-col :span="16" class="userinfo">
            <span class="userinfo-inner">{{sysUserName}} 您好！欢迎登录门店平台</span>
            <el-button type="warning" size="small" @click="handleEdit"> 修改密码</el-button>
            <el-button type="danger" size="small" @click="logout">退出登录</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="ie9_elcontainer">
        <div class="container_elMenu">
          <el-menu :default-active="$route.path" class="el_menu_vertical" @open="handleopen" @close="handleclose" @select="handleselect"
            unique-opened router background-color="#414F61" text-color="#fff" active-text-color="#409EFF">
            <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
              <el-submenu :index="index+''" v-if="!item.leaf" :key="index">
                <template slot="title">
                  <i :class="item.iconCls"></i>{{item.name}}</template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="index">
                <i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
            </template>
          </el-menu>
        </div>
        <el-main class="ie9_elmain">
          <template>
            <router-view></router-view>
          </template>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="editFormVisible" :close-on-click-modal="false" width="400px">
      <span style="font-size:10px;color:#20a0ff;float:left;line-height: 1;width: 100%;">提示：密码修改成功后需重新登录</span>
      <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2">
        <el-form-item label="旧密码" prop="usedPass">
          <el-input type="password" v-model="ruleForm2.usedPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import util from '../common/js/util'
  import {
    modifyPassword,
    batchRemoveUser
  } from '../api/api';
  import Md5 from 'md5'
  export default {
    data() {
      //  修改密码
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error('旧密码不能为空'));
        } else {
          callback()
        }
      };
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!/^[a-zA-Z0-9]{6,18}$/.test(value)) {
          callback(new Error('请输入不含汉字和空格的6到18位密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        sysUserName: '',
        sysUserAvatar: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        editFormVisible: false, //修改密码弹窗是否显示
        editLoading: false,
        //修改密码弹窗数据
        ruleForm2: {
          pass: '',
          checkPass: '',
          usedPass: ''
        },
        rules: {
          usedPass: [{
              required: true,
              validator: validatePass,
              trigger: 'blur'
            },
            {
              min: 6,
              max: 18,
              message: '密码为6到18位数字或字母',
              trigger: 'blur'
            }
          ],
          pass: [{
              required: true,
              validator: validatePass1,
              trigger: 'blur'
            },
            {
              min: 6,
              max: 18,
              message: '密码为6到18位数字或字母',
              trigger: 'blur'
            }
          ],
          checkPass: [{
              required: true,
              validator: validatePass2,
              trigger: 'blur'
            },
            {
              min: 6,
              max: 18,
              message: '密码为6到18位数字或字母',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      //修改密码弹框是否弹出
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      //修改密码提交按钮
      submitForm() {
        var name = sessionStorage.getItem('name');
        if (name) {
          name = JSON.parse(name);
          this.maccount = name || '';
        }
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = false;
            var oldPwd = Md5(this.ruleForm2.usedPass + this.maccount);
            var mpwd = Md5(this.ruleForm2.pass + this.maccount);
            var mpwd2 = Md5(this.ruleForm2.checkPass + this.maccount);
            var modifypass = {
              oldPwd,
              mpwd,
              mpwd2
            };
            modifyPassword(modifypass).then(res => {
              let {
                status,
                message
              } = res;
              if (status == 200) {
                this.$message({
                  message: message,
                  type: 'success'
                });
                sessionStorage.clear();
                this.$router.push('/login');
              }
            })
          } else {
            return false;
          }
        });
      },
      onSubmit() {
        //console.log('submit!');
      },
      handleopen() {
        //console.log('handleopen');
      },
      handleclose() {
        //console.log('handleclose');
      },
      handleselect: function (a, b) {
        if (this.$route.path == a) {
          this.$router.go(a);
        } else {
          return
        }
      },
      //退出登录
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {}).then(() => {
          batchRemoveUser().then((res) => {
            let {
              status
            } = res;
            if (status == 200) {
              sessionStorage.clear();
              _this.$router.push('/login');
            } else {
              return false
            }
          });
        }).catch(() => {
          console.log("退出失败！")
        });
      }
    },
    mounted() {
      //用户名
      var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user || '';
      }

    }
  }
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background: #fff;
      color: #0066cc;
      .userinfo {
        text-align: right;
        .userinfo-inner {
          font-weight: bolder;
          color: #5e7382;
        }
      }
      .logo {
        font-size: 24px;
        img {
          width: 85px;
          height: 39px;
          float: left;
          margin: 10px 0;
          height: auto\9\0;
        }
        .txt {
          color: #20a0ff;
        }
      }
    }
  }
  .ie9_elmain{
    display: block\9;
  }
  // .ie9_elcontainer{
  //   height: 100%\9;
  // }
  .container_elMenu {
    background-color: rgb(65, 79, 97);
    float: left\9;
    height: 100%\9;
  }

  .el_menu_vertical {
    border: none;
  }

  .el_menu_vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>