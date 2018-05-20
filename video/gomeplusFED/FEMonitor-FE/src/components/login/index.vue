<template>
	<div class="login-con">
		<header class="navbar navbar-fixed-top navbar-empty">
			<div class="container">
				<div class="center-logo">
					<h2>美信页面监控平台</h2>
				</div>
			</div>
		</header>
		<div class="container navless-container">
			<div class="row">
				<div class="col-sm-5 pull-right">
					<div>
						<div class="login-box">
							<div class="login-heading">
								<h3>登录</h3>
							</div>
							<div class="login-body">
								<input type="text" class="form-control input-sm" placeholder="用户名" autofocus="autofocus" v-model="signin.name">
								<input type="password" class="form-control input-sm" placeholder="密码" v-model="signin.password">
								<div class="remember-me checkbox">
									<label for="remember_me">
										<input type="checkbox" name="remember_me" id="remember_me" v-model="remember">
										<span>记住密码</span>
									</label>
									<div class="error-box">
										<p class="error" v-show="errMsg">{{errMsg}}</p>
									</div>
								</div>
								<button type="button" class="btn btn-sm btn-success" @click="signIn()">登录</button>
								<!--<button type="button" class="btn btn-sm">我要注册</button>-->
							</div>

						</div>
					</div>
				</div>
				<div class="col-sm-7 brand-holder pull-left">
					<h1>美信页面监控平台</h1>
					<h3>准确的数据</h3>
					<h4>完美的监控</h4>
				</div>
			</div>
		</div>
		<div class='login-footer'>
			<hr>
			<p>copyright@美信团队</p>
		</div>
	</div>
</template>
<style scoped>
.login-con {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
	background-color: #fff;
	overflow-y: auto;
}
.login-con .container {
	max-width: 960px;
}

header.navbar-empty {
	background: #fff;
	border-bottom: 1px solid #eee;
}

header.navbar-empty .center-logo {
	text-align: center;
	padding: 10px 0;
}

header.navbar-empty .center-logo h2 {
	line-height: 50px;
	color: #555;
	margin: 0;
}

.login-box {
	background: #fafafa;
	border-radius: 10px;
	box-shadow: 0 0 2px #ccc;
	padding: 15px
}

.login-body>input {
	margin: 15px 0;
}

.login-footer {
	height: 24px;
	margin-top: -55px;
	width: 100%;
}
.login-footer p {
	line-height: 24px;
	font-size: 14px;
	text-align: center;
}
.brand-holder p {
	color: #888;
}
.navless-container {
	margin-top: 80px;
	padding-top: 32px;
	height: calc(100% - 112px);
}
</style>
<script type="text/babel">
import actions from 'actions';
import store from 'store';
import * as userAPI from '../../api/user';
import {getCookie, setCookie, deleteCookie} from '../../util/cookie';
export default {
	name: 'login',
	data() {
		return {
			errMsg: '',
			touchState: {
				signin: {},
				signup: {}
			},
			signup: {
				name: '',
				password: '',
				email: '',
				phone: ''
			},
			signin: {
				name: '',
				password: ''
			},
			remember: true
		};
	},
	ready() {
		let rpwd = getCookie('pwd');
		let rname = getCookie('name');
		if (rpwd) {
			this.remember = true;
			this.signin.name = rname;
			this.signin.password = rpwd;
		} else {
			this.remember = false;
		}
	},
	methods: {
		checkInput() {
			if (this.signin.name === '') {
				this.errMsg = '用户名不能为空';
				return true;
			}
			if (this.signin.password === '') {
				this.errMsg = '密码不能为空';
				return true;
			}
		},
		async signIn() {
			if (this.checkInput()) {
				return;
			}
			let res = await userAPI.signIn(this.signin);
			if (res.code === 200) {
				res = res.data.result;
				actions.setUserInfo(store, {
					TN: this.signin.name,
					EM: this.signin.email,
					ID: res.userid,
					IP: res.IP,
					ROOT: res.ROOT
				});
				actions.alert(store, {
					show: true,
					type: 'success',
					msg: `登录成功！当前用户名：${this.signin.name} <br>当前IP地址：${res.IP}`,
					dismissible: true
				});
				// 记住密码
				if (this.remember) {
					console.log('setcookie');
					setCookie('pwd', this.signin.password);
					setCookie('name', this.signin.name);
				} else {
					deleteCookie('pwd');
					deleteCookie('name');
				}
				this.$router.go({
					name: 'index'
				});
			} else if (res.code === 401) {
				let errmsg = [];
				if (res.errors[0].code === 214) {
					// errmsg.push('用户名或密码错误! 详细信息：');
					this.errMsg = '用户名或密码错误';
				}
				/* errmsg.push(res.message);
				errmsg = errmsg.concat(res.errors.map(x => x.message));
				errmsg = errmsg.join('<br>');
				actions.alert(store, {
					show: true,
					type: 'danger',
					msg: errmsg,
					dismissible: true
				});*/
			} else {
				console.log(res);
			}
		}
	}
};
</script>
