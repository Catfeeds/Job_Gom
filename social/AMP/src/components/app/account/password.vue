<template>
	<div>
		<m-breadcrumb :config="breadcrumbConfig"></m-breadcrumb>
		<h1>{{$route.path}}</h1>
	</div>
</template>
<script>
import Breadcrumb from '../../common/breadcrumb.vue';
export default {
	name: 'app-account-account-overview',
	data() {
		return {
			breadcrumbConfig: {
				data: [{
					msg: '我的账户',
					link: '/#/app/account/'
				}, {
					msg: '修改密码',
					link: '/#' + this.$route.path
				}]
			}
		};
	},
	components: {
		'm-breadcrumb': Breadcrumb
	}
};
</script>
