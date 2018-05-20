<template>
	<div class="wrap-box clearfix">
		<div class="password login">
			<div class="img"><img src="/dist/img/ui/login-logo.png"></div>
			<input type="text" placeholder="用户名戳这里" v-model="account" @focus="resetErrMsg()" @keyup.enter="loginFocus()">
			<input type="password" placeholder="接下来是密码" v-model="password" @focus="resetErrMsg()" @keyup.enter="login()">
			<div class="error-box">
				<p class="error" v-show="erroMsg | length">{{erroMsg}}</p>
			</div>
			<div class="btn-password"><a href="javascript:void(0)" class="btn btn-big btn-block btn-blue" @click="login()">登  录</a></div>
		</div>
	</div>
</template>
<script>
import store from 'store';
import actions from 'actions';

import utils from 'utils';

import $ from 'jquery';

export default {
	name: 'login',
	data() {
		return {
			account: '',
			password: '',
			erroMsg: ''
		};
	},
	vues: {
		actions: actions
	},
	methods: {
		login() {
			if (!this.checkInput()) {
				return;
			}
			this.erroMsg = '';
			this.$http({
				url: 'operator/login',
				method: 'post',
				body: {
					account: this.account,
					password: this.password
				}
			}).then((res) => {
				const result = res.data;
				if (!result.result) {
					this.erroMsg = result.message;
					return;
				}
				actions.setUserInfo(store, result.data);
				utils.setCookie('user_info', encodeURIComponent(JSON.stringify(result.data)), 60 * 8); // cookie 分钟为单位
				this.$route.router.go('/dashboard');
			});
		},
		checkInput() {
			if (this.account === '') {
				this.erroMsg = '用户名不能为空';
				return false;
			}
			if (this.password === '') {
				this.erroMsg = '密码不能为空';
				return false;
			}
			return true;
		},
		resetErrMsg() {
			this.erroMsg = '';
		},
		loginFocus() {
			$('input[type="password"]').focus();
		}
	}
};
</script>