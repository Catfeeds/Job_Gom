<template>
	<div>
		<m-breadcrumb :config="breadcrumbConfig"></m-breadcrumb>
		<m-list></m-list>
	</div>
</template>
<script>
import actions from 'actions';

import Event from 'event';

import Breadcrumb from '../../common/breadcrumb.vue';
import PlanList from "./plan-list.vue";
export default {
	name: 'app-account-account-overview',
	data() {
		return {
			breadcrumbConfig: {
				data: [{
					msg: '投放管理',
					link: '/#/app/put/'
				}, {
					msg: '投放计划',
					link: '/#' + this.$route.path
				}]
			}
		};
	},
	components: {
		'm-breadcrumb': Breadcrumb,
		'm-list': PlanList
	},
	methods: {
		showNew(obj) {
			actions.controlDrawer(this.$store, obj);
		}
	}
};
</script>
