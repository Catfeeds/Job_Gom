<template>
	<div>
		<m-breadcrumb :config="breadcrumbConfig"></m-breadcrumb>
		<m-unit-list></m-unit-list>
	</div>
</template>
<script>
import Breadcrumb from '../../common/breadcrumb.vue';
import unitList from "./unit-list";
export default {
	name: 'app-put-plan-unit-overview',
	data() {
		return {
			breadcrumbConfig: {
				data: [{
					msg: '投放管理',
					link: '/#/app/put/'
				}, {
					msg: '投放计划',
					link: '/#/app/put/plan'
				}, {
					msg: '投放单元',
					link: '/#' + this.$route.path
				}]
			}
		};
	},
	components: {
		'm-breadcrumb': Breadcrumb,
		'm-unit-list': unitList
	}
};
</script>
