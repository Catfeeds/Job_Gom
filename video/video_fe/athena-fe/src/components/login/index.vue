<template>
	<div class="login-con">
		<div class="header navbar navbar-fixed-top navbar-empty">
			<div class="nav-container">
				<div class="nav-logo">
					<h2>前端持续集成平台</h2>
				</div>
			</div>
		</div>
		<el-row class="navless-container">
			<el-col :span="8">
				<div class="brand-holder pull-left">
					<h3>一个让你方便地持续集成前端资源的可靠平台</h3>
				</div>
			</el-col>
			<el-col :span="8" class="login-box">
				<el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="用户名" prop="username">
						<el-input type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
					</el-form-item>
				</el-form>
				<div class="login-error" v-show="show">{{msg || '用户名或者密码错误'}}</div>
			</el-col>
		</el-row>
		<div class='login-footer'>
			<hr>
			<p>copyright@国美视频团队</p>
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

.header.navbar-empty {
	background: #fff;
	border-bottom: 1px solid #eee;
}

.header.navbar-empty .center-logo {
	text-align: center;
	padding: 10px 0;
}

.header.navbar-empty .center-logo h2 {
	line-height: 50px;
	color: #555;
	margin: 0;
}

.login-box {
	background: #fafafa;
	border-radius: 10px;
	box-shadow: 0 0 2px #ccc;
	padding: 15px;
	position: absolute;
	top: 40%;
	left: 50%;
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
.brand-holder {
	position: absolute;
	left:5%;
	top: 10%;
}
.brand-holder p {
	color: #888;
}
.navless-container {
	margin-top: 80px;
	padding-top: 32px;
	height: calc(100% - 134px);
}
.nav-logo {
	padding: 10px;
}
h1 {
	font-size: 36px;
}
h2 {
	font-size: 24px;
}
h3 {
	font-size: 24px;
}
.login-error {
	font-size: 16px;
	color: red;
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
            show: false,
			msg: '',
            ruleForm: {
                username: '',
                password: ''
            },
			rules: {
                username: { required: true, message: '请输入用户名', trigger: 'blur' },
				password: { required: true, message: '请输入密码', trigger: 'blur'}
			}
        };
    },
    methods: {
        submitForm(formName) {
            let that  = this;
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let data = await userAPI.login(that.ruleForm);
                    if (data.code === 200) {
                        actions.setUserInfo(store, data.data);
                        setCookie('user_info', JSON.stringify(data.data));
						that.$router.push("/index");
					} else if (data.code === 50007){
                        that.show = true;
                        that.msg = data.msg;
					}
                } else {
                    that.show = true;
                    return false;
                }
            });
        }
    }
};
</script>
