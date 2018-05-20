<template>
	<div>
		<div class="login-header"><span class="header-login"><a href="/">gomeplus</a></span></div>
		<div class="login-body">
			<div class="body-scaffold">
				<div class="scaffold-main">
					<div class="main-wrap">
						<h2>欢迎登录</h2>
						<el-form :model="formData" :rules="rules" ref="formData">
							<el-form-item label="" prop="name">
								<el-input type="text" v-model="formData.name" placeholder="请输入用户名"></el-input>
							</el-form-item>
							<el-form-item prop="password">
								<el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
							</el-form-item>
							<el-form-item label="用户类型：">
								<el-radio-group v-model="formData.userType">
									<el-radio :label="1">商家会员</el-radio>
									<el-radio :label="2">普通会员</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-form>
						<!-- <div class="wrap-valadate">
							<div class="ele-input">
								<input type="text" value="" placeholder="验证码">
							</div>
							<span class="valadate-img">
								<img src="../../assets/img/code.jpg" height="45" width="89">
							</span>
							<span class="valadate-text">
								<a href="#">换一换</a>
							</span>
						</div> -->
						<!-- <div class="wrap-help"><a href="#" class="help-password">忘记密码</a><a href="#" class="help-register">立即注册 ></a></div> -->
						<div class="wrap-btn">
							<button @click="login" class="btn btn-blue">登 录</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<p>Copyright &#x24B8; 2016 – 2017 All Rights Reserved. 国美互联网生态(分享)科技公司版权所有</p>
		</div>
	</div>
</template>
<script>
import Http from 'http';
import actions from 'actions';
import router from '../../route.js';
export default {
	name: 'login',
	data() {
		return {
			formData: {
				name: '',
				password: '',
				userType: 1
			},
			nameError: '',
			passwordError: '',
			rules: {
				name: [{
					validator: (rule, value, callback) => {
						if (value === '') {
							callback(new Error('用户名不能为空'));
						} else if (this.nameError !== '') {
							callback(new Error(this.nameError));
						} else {
							callback();
						}
					},
					trigger: 'blur'
				}],
				password: [{
					validator: (rule, value, callback) => {
						if (value === '') {
							callback(new Error('密码不能为空'));
						} else if (this.passwordError !== '') {
							callback(new Error(this.passwordError));
						} else {
							callback();
						}
					},
					trigger: 'blur'
				}],
			}
		};
	},
	methods: {
		login() {
			this.nameError = this.passwordError = '';
			Http('api/login', {
					method: 'post',
					data: {
						name: this.formData.name,
						password: this.formData.password,
						userType: this.formData.userType
					}
				})
				.then((res) => {
					if(res.data.code != 200){
					    console.log('--login failure1--', res);
						this.passwordError = '账号密码不正确';
						return;
					} else if (res.data.iserror) {
						if (res.data.data.type === 'name') {
							this.nameError = res.data.msg;
						} else if (res.data.data.type === 'password') {
							this.passwordError = res.data.msg;
						}
						this.$refs.formData.validate();
					} else {
						actions.setUserInfo(this.$store, res.data.data);
						if (!res.data.data.isRegistered) {
							router.push({
								name: 'register'
							});
						} else {
							router.push({
								name: 'index'
							});
						}
					}
				}, (reject) => {
					console.log('--login failure2--', reject);
					this.passwordError = '账号密码不正确';
						return;
				})
				.catch((err) => {
					console.log('--login failure3--', err);
					this.passwordError = '账号密码不正确';
						return;
				});
		}
	}
};
</script>
