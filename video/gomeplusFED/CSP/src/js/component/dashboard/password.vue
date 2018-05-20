<template>
	<div class="password">
		<input type="password" v-model="oldPassword" placeholder="请输入原密码" @focus="resetErrMsg()">
		<input type="password" v-model="newPassword" placeholder="请输入新密码" @focus="resetErrMsg()">
		<input type="password" v-model="newPasswordAgain" placeholder="请再次输入新密码" @focus="resetErrMsg()">
		<div class="error-box">
			<p class="error" v-show="errMsg | length">{{errMsg}}</p>
		</div>
	</div>
	<div class="btn-password"><a href="javascript:void(0)" class="btn btn-big btn-blue" @click="submit($event)">提交</a></div>
</template>
<script>
import store from 'store';
import actions from 'actions';
import utils from 'utils';
export default {
	name: 'password',
	data() {
		return {
			oldPassword: '',
			newPassword: '',
			newPasswordAgain: '',
			errMsg: ''
		};
	},
	vuex: {
		getters: {
			user_info() {
				return store.state.user_info;
			}
		},
		actions: actions
	},
	ready() {
		if (!utils.checkIsAdmin(this.user_info.type)) {
			actions.alert(store, {
				show: true,
				msg: '无权限',
				type: 'danger'
			});
			this.$route.router.go('/dashboard');
		}
	},
	methods: {
		resetErrMsg() {
			this.errMsg = '';
		},
		checkInput() {
			const regx = new RegExp(/(\w|\d){6,20}/g);
			if (this.oldPassword === '') {
				this.errMsg = '密码不能为空';
				return true;
			}
			if (this.newPassword === '' || this.newPasswordAgain === '') {
				this.errMsg = '请输入新密码';
				return true;
			}
			if (this.newPassword !== this.newPasswordAgain) {
				this.errMsg = '两次密码不一致';
				return true;
			}
			if (this.newPassword === this.oldPassword) {
				this.errMsg = '新旧密码不能一致';
				return true;
			}
			if (!regx.test(this.newPassword)) {
				this.errMsg = '请输入6-20位只包含字母、数字或下划线的密码';
				return true;
			}
		},
		submit(e) {
			if (this.checkInput()) {
				return;
			};
			this.$http({
				url: 'operator/updateOperatorPwd',
				method: 'post',
				body: {
					operator_id: this.user_info.operator_id,
					password: this.newPassword,
					oldpassword: this.oldPassword
				}
			}).then((res) => {
				const resResult = res.data;
				if (!resResult.result) {
					this.errMsg = resResult.message;
					return;
				}
				actions.alert(store, {
					show: true,
					msg: '密码修改成功，请重新登陆',
					type: 'success'
				});
				this.$http({
					url: 'operator/logout',
					method: 'get'
				}).then((res) => {
					const result = res.data;
					if (result.result) {
						utils.delCookie('user_info');
						this.$route.router.go('/login');
					}
				});
			});
		}
	}
};
</script>
