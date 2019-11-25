<template>
<section>
  <!--工具条-->
  <el-row>
    <el-form :inline="true" :model="filters">
      <el-form-item label="商户名称">
        <el-input v-model="filters.mname" class="fixed_search_input" placeholder="商户名称"></el-input>
      </el-form-item>
      <el-form-item label="商户帐号">
        <el-input v-model="filters.accounts" class="fixed_search_input" placeholder="商户帐号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUsers" round>查询</el-button>
      </el-form-item>
    </el-form>
  </el-row>
  <!--列表-->
  <el-table :data="users" border highlight-current-row v-loading="listLoading">
    <el-table-column prop="mid" label="商户编号" min-width="120">
    </el-table-column>
    <el-table-column prop="mname" label="商户名称" min-width="120">
    </el-table-column>
    <el-table-column prop="memail" label="商户邮箱" min-width="120">
    </el-table-column>
    <el-table-column prop="rate" label="商户费率(‰)" min-width="120">
    </el-table-column>
  </el-table>

  <!--工具条-->
  <el-row>
    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" background style="text-align:center;background:#fff;padding:15px;">
    </el-pagination>
  </el-row>
</section>
</template>

<script>
import util from '../../common/js/util'
import {
  getUserListPage
} from '../../api/api';

export default {
  data() {
    return {
      //商户名
      filters: {
        mname: '',
        accounts: ''
      },
      users: [],
      page: 1,
      total: 0,
      listLoading: false
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = {
        pageNum: this.page,
        mname: this.filters.mname,
        maccount: this.filters.accounts,
      };
      this.listLoading = true;
      getUserListPage(para).then((res) => {
        let {
          status,
          message
        } = res;
        if (status == 200) {
          this.total = res.data.totalCount;
          this.users = res.data.merchantsList;
          this.listLoading = false;
        }
      });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
  },
  mounted() {
    this.getUsers();
  }
}
</script>
