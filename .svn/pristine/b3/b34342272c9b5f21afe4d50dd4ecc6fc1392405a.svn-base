<template>
	<div class="er_code">
		<el-row>
			<img :src="this.ewm" class="image">
		</el-row>
		<el-row>
			<el-button type="success" class="bottom" @click="clickDown">下载二维码<i class="el-icon-download"></i></el-button>
		</el-row>
	</div>
</template>
<script>
	import {
		getTwoCode,
		getVariableCode
	} from '../../api/api';
	export default {
		data() {
			return {
				ewm: ''
			};
		},
		methods: {
			clickDown() {
				window.location.href = this.ewm
			}
		},
		mounted() {
			let type = JSON.parse(sessionStorage.getItem('type'));
			if (type == 3 || type == 5) {
				this.ewm = getTwoCode
			} else if (type == 1 || type == 2) {
				this.ewm = getVariableCode
			}
		}
	}
</script>
<style scoped>
	.er_code{
		width: 100%;
		height: 100%;
		text-align: center
	}
	.image {
		width: 250px;
	}
	.bottom{
		margin-top: 10px;
	}
</style>