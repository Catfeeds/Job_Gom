<template>
	<ul class="nav navbar-right top-nav">
	    <li v-show="!userInfo.ID"><a @click="signUp()" class="navbar-link">注册</a></li>
	    <li v-show="!userInfo.ID"><a @click="signIn()" class="navbar-link">登录</a></li>
		<li class="dropdown"  v-show="userInfo.ID">
			<a @click="showDropDown = !showDropDown" href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i>{{userInfo.TN}}<b class="caret"></b></a>
			<ul class="dropdown-menu" v-show="showDropDown">
				<li>
					<a href="javascript:void(0)" @click="modifyPassword()"><i class="fa fa-fw fa-key"></i>修改密码</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click="signOut()"><i class="fa fa-fw fa-power-off"></i>退出登录</a>
				</li>
			</ul>
		</li>
	</ul>
	<Modal :modal-config="modalConfig">
		<validator  name="validation">
			<form v-if="modalConfig.title==='登录'" id="signinForm">
	              <div :class="{'form-group':true,'has-error': (touchState.signin.name&&$validation.name.required===true),'has-success':(touchState.signin.name&&$validation.name.required===false)}"
					>
	                <label>用户名</label>
	                <input v-model="signin.name"
	                v-validate:name = "{required: true}"
	                @touched =  "touchState.signin.name = true"
	                type="text"
	                class="form-control">
	              </div>
	              <div class="form-group">
	                <label>密码</label>
	                <input v-model="signin.password" name="password" type="password" class="form-control">
	              </div>
	        </form>
	    </validator>
        <form v-if="modalConfig.title==='注册'" id="signupForm">
              <div class="form-group">
                <label>用户名</label>
                <input v-model="signup.name"  name="name" type="text" class="form-control name">
              </div>
              <div class="form-group">
                <label>密码</label>
                <input v-model="signup.password" name="password" type="password" class="form-control password">
              </div>
              <div class="form-group">
                <label>邮箱</label>
                <input v-model="signup.email" name="email" type="text" class="form-control email">
              </div>
              <div class="form-group">
                <label>手机</label>
                <input iv-model="signup.phone" name="phone" type="text" class="form-control phone">
              </div>
        </form>
		<form v-if="modalConfig.title==='修改密码'" id="modifyPasswordForm">
			<div class="form-group">
				<label>原密码</label>
				<input v-model="mpassword.oldPassword"  name="oldPassword" @focus="resetErrMsg()" type="password" class="form-control name">
			</div>
			<div class="form-group">
				<label>新密码</label>
				<input v-model="mpassword.newPassword" name="newPassword" @focus="resetErrMsg()" type="password" class="form-control password">
			</div>
			<div class="form-group">
				<label>确认密码</label>
				<input v-model="mpassword.newPasswordAgain" name="newPasswordAgain" @focus="resetErrMsg()" type="password" class="form-control email">
			</div>
			<div class="error-box">
				<p class="error" v-show="errMsg">{{errMsg}}</p>
			</div>
		</form>
	</Modal>
</template>
<style scoped>
.top-nav {
	padding: 0 15px;
}

.top-nav>li {
	display: inline-block;
	float: left;
}

.top-nav>li>a {
	padding-top: 15px;
	padding-bottom: 15px;
	line-height: 20px;
	color: #999;
}

.top-nav>li>a:hover,
.top-nav>li>a:focus{
	color: #fff;
	background-color: #000;
}
.dropdown-menu {
	display: block;
}
.navbar-link{
	cursor: pointer;
}
</style>
<script type="text/babel">
import { $, on } from 'utils/dom.js';
import actions from 'actions';
import store from 'store';
import Modal from '../base/modal.vue';
import * as userAPI from '../../api/user';
import {deleteCookie} from '../../util/cookie';
export default {
	data() {
		return {
			errMsg: '',
			showDropDown: false,
			modalConfig: {
				show: false,
				title: '',
				applyStr: '提交',
				cancelStr: '取消',
				applyFunc: () => {
					// console.log('xxxxxxx..', this.modalConfig.title === '修改密码');
					let self = this;
					if (this.modalConfig.title === '修改密码') {
						if (this.checkInput()) {
							return;
						}
						userAPI.checkPassword({
							name: store.state.userInfo.TN,
							password: this.mpassword.oldPassword
						}).then(data => {
							console.log(data);
							if (data) {
								userAPI.updateUserInfo(store.state.userInfo.ID, {
									password: this.mpassword.newPassword
								}).then(result => {
									actions.alert(store, {
										show: true,
										msg: '密码修改成功，请重新登陆',
										type: 'success'
									});
									self.signOut();
								});
							} else {
								this.errMsg = '原密码不正确';
							}
						});
					}
				},
				cancelFunc: () => {
					console.log('cancel');
					this.modalConfig.show = false;
				}
			},
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
			mpassword: {
				oldPassword: '',
				newPassword: '',
				newPasswordAgain: ''
			}
		};
	},
	vuex: {
		getters: {
			userInfo: () => store.state.userInfo,
			loginUrl: () => store.state.loginUrl
		}
	},
	ready() {
		const _this = this;
		$('html')[0].on('click', function(e) {
			if (!e.target.classList.contains('dropdown-toggle')) {
				_this.showDropDown = false;
			};
		});
	},
	methods: {
		signUp() {
			this.modalConfig.title = '注册';
			this.modalConfig.applyFunc = async () => {
				let res = await userAPI.signUp(this.signup);
				if (res.code === 200) {
					res = res.data.result;
					actions.setUserInfo(store, {
						TN: this.signup.name,
						EM: this.signup.email,
						ID: res.userid,
						IP: res.IP
					});
					this.modalConfig.show = false;
					actions.alert(store, {
						show: true,
						type: 'success',
						msg: `注册成功！当前用户名：${this.signup.name} <br>当前IP地址：${res.IP}`,
						dismissible: true
					});
				} else if (res.code === 400) {
					let errmsg = [];
					if (res.errors[0].name) {
						errmsg.push('参数错误! 详细信息：');
						errmsg.push(res.errors[0].name);
					}
					errmsg.push(res.message);
					errmsg = errmsg.concat(res.errors.map(x => x.message));
					errmsg = errmsg.join('<br>');
					actions.alert(store, {
						show: true,
						type: 'danger',
						msg: errmsg,
						dismissible: true
					});
				}
			};
			this.modalConfig.show = true;
		},
		signIn() {
			this.modalConfig.title = '登录';
			this.modalConfig.applyFunc = async () => {
				let res = await userAPI.signIn(this.signin);
				if (res.code === 200) {
					res = res.data.result;
					actions.setUserInfo(store, {
						TN: this.signin.name,
						EM: this.signin.email,
						ID: res.userid,
						IP: res.IP
					});
					this.modalConfig.show = false;
					actions.alert(store, {
						show: true,
						type: 'success',
						msg: `登录成功！当前用户名：${this.signin.name} <br>当前IP地址：${res.IP}`,
						dismissible: true
					});
				} else if (res.code === 401) {
					let errmsg = [];
					if (res.errors[0].code === 214) {
						errmsg.push('用户名或密码错误! 详细信息：');
					}
					errmsg.push(res.message);
					errmsg = errmsg.concat(res.errors.map(x => x.message));
					errmsg = errmsg.join('<br>');
					actions.alert(store, {
						show: true,
						type: 'danger',
						msg: errmsg,
						dismissible: true
					});
				} else {
					console.log(res);
				}
			};
			this.modalConfig.show = true;
		},
		async signOut() {
			let res = await userAPI.signOut();
			if (res.code === 200) {
				res = res.data.result;
				actions.setUserInfo(store, {
					TN: '匿名',
					IP: res.IP
				});
				/* actions.alert(store, {
					show: true,
					type: 'warning',
					msg: '您已经退出登陆，目前为匿名身份！',
					dismissible: true
				});*/
				deleteCookie('pwd');
				deleteCookie('name');
				this.modalConfig.show = false;
				this.mpassword.oldPassword = '';
				this.mpassword.newPassword = '';
				this.mpassword.newPasswordAgain = '';
				this.$route.router.go('/login');
			}
		},
		resetErrMsg() {
			this.errMsg = '';
		},
		checkInput() {
			const regx = new RegExp(/(\w|\d){6,20}/g);
			if (this.mpassword.oldPassword === '') {
				this.errMsg = '密码不能为空';
				return true;
			}
			if (this.mpassword.newPassword === '' || this.mpassword.newPasswordAgain === '') {
				this.errMsg = '请输入新密码';
				return true;
			}
			if (this.mpassword.newPassword !== this.mpassword.newPasswordAgain) {
				this.errMsg = '两次密码不一致';
				return true;
			}
			if (this.mpassword.newPassword === this.mpassword.oldPassword) {
				this.errMsg = '新旧密码不能一致';
				return true;
			}
			if (!regx.test(this.mpassword.newPassword)) {
				this.errMsg = '请输入6-20位只包含字母、数字或下划线的密码';
				return true;
			}
		},
		modifyPassword() {
			this.modalConfig.show = true;
			this.modalConfig.title = '修改密码';
		}
	},
	components: {
		Modal
	},
	validators: {
	}
};
</script>
