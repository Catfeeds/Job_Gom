<template>
	<div>
		<m-breadcrumb :config="breadcrumbConfig"></m-breadcrumb>
		<router-view></router-view>
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
					msg: '站内信',
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
