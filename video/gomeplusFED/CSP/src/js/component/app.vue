<template>
	<div>
		<router-view keep-alive></router-view>
		<m-loading></m-loading>
		<m-alert></m-alert>
		<m-confirm></m-confirm>
	</div>
</template>
<script>
import store from 'store';

import Loading from './base/loading.vue';
import Alert from './base/alert.vue';
import Confirm from './base/confirm.vue';

import {
	Select,
	Radio,
	Checkbox
} from './form/index.js';

export default {
	name: 'App',
	store: store,
	vuex: {
		getters: {
			user_info() {
				return store.state.user_info;
			}
		}
	},
	ready() {
		if (!this.user_info) {
			this.$route.router.go('/login');
		}
	},
	components: {
		'm-loading': Loading,
		'm-alert': Alert,
		'm-confirm': Confirm
	}
};
</script>
