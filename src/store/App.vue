<template>
<div id="app">
	<router-view></router-view>
</div>
</template>
<script>
	export default {
		name: 'app',
		components: {
		}
	}

</script>
<style lang="scss">
	#app{
		height: 100%;
		background-color: #F2F6FC;
	}
	body,html {
		margin: 0px;
		padding: 0px;
		height: 100%;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		font-size: 14px;
		-webkit-font-smoothing: antialiased;
	}
	.el-table__empty-block{
		line-height: 60px;
	}
	.fixed_search_input {
		max-width: 125px;
	}
	.fixed_search_input_datetime {
		max-width: 195px;
	}
	.fixed_search_input_date{
		max-width: 145px;
	}
	.el-input__inner:-ms-input-placeholder{
		color: #dcdfe6;
	}
	.el-submenu [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}

	.el-menu-item [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}
	.el-picker-panel__link-btn:nth-child(1){
		display: none;
	}
	.toolbar {
		background: #fff;
		padding: 10px;
		.el-form-item {
			margin-bottom: 10px;
		}
	}
</style>
