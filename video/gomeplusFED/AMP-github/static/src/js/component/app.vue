<template>
	<div :style="{backgroundImage: 'url(' + bgImgUrl + ')'}">
		<router-view keep-alive></router-view>
		<m-loading></m-loading>
		<m-alert></m-alert>
		<m-confirm></m-confirm>
	</div>
</template>

<script>


import store from 'store';
import actions from 'actions';

import utils from 'utils';

import Loading from './base/loading.vue';
import Alert from './base/alert.vue';
import Confirm from './base/confirm.vue';

export default {
	name: 'App',
	store: store,
	data() {
		return {

		}
	},
	vuex: {
		getters: {
			bgImgUrl: () => {
				return store.state.bgImgUrl;
			},
			isLogin: () => {
				return store.state.isLogin;
			}
		},
		actions: actions
	},
	methods: {

	},
	components: {
		'm-loading': Loading,
		'm-alert': Alert,
		'm-confirm': Confirm
	},
	created() {
		this.$http({
			url: '/api/login',
			method: 'get',
		}).then((res) => {
			if(this.isLogin){
				const resData = res.data;
				actions.setUserInfo(store, utils.formatUserInfo(resData.data));
				// 设置背景图片，功能未开
				// store.dispatch('SETBGURL', resData.data.bgUlr);
			}
		})
	}
}

</script>