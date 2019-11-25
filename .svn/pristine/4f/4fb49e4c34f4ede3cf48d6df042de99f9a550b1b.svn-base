<template>
	<section>
		<!--工具条-->
		<el-row>
			<el-form :inline="true" :model="whole">
				<el-tag type="primary" style="margin:10px 10px 20px 0;">交易总金额（元）：{{whole.sumAmt}}元</el-tag>
				<el-tag type="primary" style="margin:10px 10px 20px 0;">交易总笔数（笔）：{{whole.countRow}}笔</el-tag>
			</el-form>
		</el-row>
		<el-row>
			<el-form :inline="true" :model="filters">
				<el-form-item label="请选择款台">
					<el-select v-model="filters.parag" class="fixed_search_input" placeholder="请选择款台" clearable>
						<el-option v-for="item in options" :value="item.eid" :label="item.value" :key="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="日期时间">
					<el-date-picker v-model="filters.startTime" class="fixed_search_input_datetime" type="datetime" :editable="false" :clearable="false" placeholder="选择开始日期时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item>至</el-form-item>
				<el-form-item>
					<el-date-picker v-model="filters.endTime" class="fixed_search_input_datetime" type="datetime" :editable="false" :clearable="false" placeholder="选择结束日期时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item style="float:right">
					<el-button type="primary" v-on:click="getUsers" round>查询</el-button>
				</el-form-item>
			</el-form>
		</el-row>

		<!--列表-->
		<el-table border :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="account_name" label="付款人">
			</el-table-column>
			<el-table-column prop="creat_stamp" label="付款时间" :formatter="creat_stamp">
			</el-table-column>
			<el-table-column prop="status" label="交易状态" :formatter="status">
			</el-table-column>
			<el-table-column prop="amount" label="交易金额（元）">
			</el-table-column>
			<el-table-column prop="pay_channel" label="付款方式" :formatter="pay_channel">
			</el-table-column>
			<el-table-column prop="store_name" label="所属门店">
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
		queryMemTrans,
		lookupUser
	} from '../../api/api';
	export default {
		data() {
			var myDate = new Date();
			return {
				filters: {
					startTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()),
					endTime: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), 23, 59, 59),
					parag: ''
				},
				whole: {
					sumAmt: "",
					countRow: "",
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				//选择款台
				options: []
			}
		},
		methods: {
			//时间显示转换
			creat_stamp: function (row, column) {
				return row.creat_stamp = util.formatDate.format(new Date(row.creat_stamp), 'yyyy-MM-dd hh:mm:ss');
			},
			//状态显示转换
			status: function (row, column) {
				return row.status == 1 ? '成功' : row.status == 0 ? '创建' : '未知';
			},
			//付款方式转换
			pay_channel: function (row, column) {
				return row.pay_channel == 'vip' ? '会员卡支付' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
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
				let para = {
					pagNum: String(this.page),
					startTime: this.filters.startTime,
					endTime: this.filters.endTime,
					eid: String(this.filters.parag)
				};
				para.startTime = (!para.startTime || para.startTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
					para.startTime), 'yyyy/MM/dd hh:mm:ss'))); //开始时间
				para.endTime = (!para.endTime || para.endTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(para.endTime),
					'yyyy/MM/dd hh:mm:ss'))); //开始时间
				this.listLoading = true;
				queryMemTrans(para).then((res) => {
					if (res.status === 200) {
						this.total = res.data.total;
						this.users = res.data.accTransList;
						this.whole.countRow = res.data.total;
						this.whole.sumAmt = res.data.sumAmt;
					}
					this.listLoading = false;
				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}
</script>