<template>
	<div>
		<m-breadcrumb :config="breadcrumbConfig"></m-breadcrumb>
		<router-view></router-view>
</template>
<script>
import Breadcrumb from '../../common/breadcrumb.vue';
export default {
	name: 'app-account-account-overview',
	data() {
		return {};
	},
	components: {
		'm-breadcrumb': Breadcrumb,
	},
	computed: {
		breadcrumbConfig(){
			return {
				data: [{
					msg: '我的账户',
					link: '/#/app/account/'
				}, {
					msg: /account-day-detail/.test(this.$route.path) ? '现金账户明细':'账户明细',
					link: '/#' + this.$route.path
				}]
			};
		}
	}
};
</script>
