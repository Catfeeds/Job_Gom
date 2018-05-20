<template>
	<div class="wrap-box clearfix">
		<div class="wrap-left">
			<div class="menu">
				<a href="javascript:void(0)" v-link="{name: 'listPlatforms'}">平台管理</a>
				<a href="javascript:void(0)" v-link="{name: 'listSchedule'}">计划管理</a>
				<a href="javascript:void(0)" v-link="{name: 'listUsers'}">用户管理</a>
				<a href="javascript:void(0)">菜单管理</a>
				<a href="javascript:void(0)">日志管理</a>
			</div>
		</div>
		<div class="wrap-right">
			<router-view></router-view>
		</div>
	</div>
</template>
<style scoped>
.wrap-box {
  margin: 0 -30px;
}
.none {
  display: none; }

.block {
  display: block; }

.wrap-left {
  float: left;
  width: 160px; 
}
.wrap-left .menu {
	width: 160px;
    background-color: #23282d;
    margin-top: 20px;
}
.wrap-left .menu a{
	display: block;
	line-height: 60px;
	text-decoration: none;
	outline: none;
	color: #333;
	background: #f9f9f9;
	text-align: center;
}
.wrap-left .menu .active {
	background: #e4e4e4;
}
.wrap-right {
  float: right;
  width: calc(100% - 200px);
}

</style>
<script type="text/babel">
import store from 'store';
import actions from 'actions';
export default {
	name: 'nav',
	vuex: {
		getters: {
			user_info() {
				return store.state.user_info;
			}
		},
		actions
	},
	ready() {
		const _self = this;
	}
};
</script>
