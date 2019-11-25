<template>
	<section>
		<!--工具条-->
		<el-row>
			<el-form :inline="true" :model="whole">
				<el-tag type="primary" style="margin:10px 10px 20px 0;">交易总金额（元）：{{whole.sumAmt}}元</el-tag>
				<el-tag type="primary" style="">交易总笔数（笔）：{{whole.countRow}}笔</el-tag>
			</el-form>
			<el-form :inline="true" :model="filters">
				<el-form-item label="日期时间">
					<el-date-picker v-model="filters.startTime" class="fixed_search_input_datetime" type="datetime" placeholder="选择开始日期" :picker-options="pickerOptions1" :clearable="false"
					  :editable='false'>
					</el-date-picker>
				</el-form-item>
				<el-form-item>至</el-form-item>
				<el-form-item>
					<el-date-picker v-model="filters.endTime" class="fixed_search_input_datetime" type="datetime" placeholder="选择结束日期" :picker-options="pickerOptions2" :clearable="false"
					  :editable='false'>
					</el-date-picker>
				</el-form-item>
				<el-form-item style="float: right;">
					<el-button type="primary" @click="getUsers" round>查询</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		<el-row>
			<el-alert title="可查询最近7天的交易" type="warning" center close-text="知道了" show-icon>
			</el-alert>
		</el-row>
		<!--列表-->
		<el-table :data="users" border highlight-current-row v-loading="listLoading">
			<el-table-column prop="countRow" label="交易笔数" min-width="200">
			</el-table-column>
			<el-table-column prop="sumAmt" label="交易金额" min-width="200">
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
		queryEmplSummary
	} from '../../api/api';

	export default {
		data() {
			var myDate = new Date();
			return {
				//时间控制
				pickerOptions1: {
					disabledDate(time) {
						let date = new Date();
						return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 7;
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
				},
				whole: {
					sumAmt: "",
					countRow: ""
				},
				total: 0,
				page: 1,
				users: [],
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
					mid: this.mid,
					pageNum: this.page,
					startTime: this.filters.startTime,
					endTime: this.filters.endTime,
					eId: this.filters.parag
				};
				para.startTime = (!para.startTime || para.startTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(
					para.startTime), 'yyyy/MM/dd hh:mm:ss'))); //开始时间
				para.endTime = (!para.endTime || para.endTime == '') ? '' : String(Date.parse(util.formatDate.format(new Date(para.endTime),
					'yyyy/MM/dd hh:mm:ss'))); //开始时间
				this.listLoading = true;
				queryEmplSummary(para).then((res) => {
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
						this.users = res.data.summaryList;
					}
				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}
</script>

<style scoped>
</style>