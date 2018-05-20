<template>

	<div class="panel panel-default">
		<div class="">
			<div class="cover-block" style="text-align: center;">
				<div class="">
					<h3>{{userInfo.name}}</h3>
				</div>
				<div class="proj-desc">
					<p>{{userInfo.group?userInfo.group.name:'未指定用户组'}}</p>
				</div>
			</div>
		</div>
		<div class="panel-body">
			<validator name="validation">
				<form>
				<fieldset>
					<legend>基本信息：</legend>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							用户名：
						</label>
						<div class="col-sm-8">
							<input class="form-control" @blur="nameBlur" autofocus v-validate:name = "{
							required: { rule: true, initial: 'off' }}" type="text" v-model="userInfo.name" >
							<span v-show='$validation.name.required || errNameMsg' id="errName"  style="color:red">请输入名称!</span>
						</div>
					</div>
					<!--<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							密码：
						</label>
						<div class="col-sm-8">
							<input class="form-control" type="password" v-model="userInfo.password" >
						</div>
					</div>-->
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							邮箱：
						</label>
						<div class="col-sm-8">
							<input class="form-control" @blur="emailBlur" v-validate:email = "{ email: { rule: true, initial: 'off' }}" type="text"  v-model="userInfo.email.value">
							<span v-show='$validation.email.email || errEmailMsg' id="errEmail"  style="color:red">请输入正确的url!</span>
						</div>
						<!--<button type="button" class="btn btn-sm btn-primary">验证邮箱</button>-->
					</div>
					<!--<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							手机：
						</label>
						<div class="col-sm-8">
							<input class="form-control" type="text" v-model="userInfo.phone.value" lazy>
						</div>
						&lt;!&ndash;<button type="button" class="btn btn-sm btn-primary" @click="editState=0">验证手机</button>&ndash;&gt;
					</div>-->

					<div class="form-actions">
						<button  type="button" class="btn btn-sm btn-danger right" @click="cancel">取消</button>
						<button  type="button" class="btn btn-sm btn-success right" @click="save">保存</button>
					</div>
				</fieldset>

			</form>
			</validator>
	</div>

</template>

<style scoped>
	fieldset {
		padding-bottom:30px;
	}

	label {
		padding-top:5px;
		padding-bottom:20px;
		font-weight: normal;
	}

	legend {
		color:#5c5c5c;
	}
	.hiddenForm {
		display: inline;
		border: 0px;
		padding: 0px;
	}
	.table td{
		text-align:center;
	}
	.circle-chart{
		width: 100%;
		height: 500px;
		float: left;
		margin-top: 35px;
	}

	legend {
		padding-bottom:8px;
	}


	.form-actions {
		margin:-15px;
		padding:16px;
		overflow: hidden;
		background: white;
	}
	.right {
		float: right;
		margin-left: 5px;
	}

</style>

<script type="text/babel">
	import actions from 'actions';
	import store from 'store';
	import {signUp, checkValidate} from '../../../api/user';
	import _ from 'lodash';

	export default {
		name: 'user-detail',
		data() {
			return {
				errNameMsg: false,
				errEmailMsg: false,
				userInfo: {
					name: '',
					password: '',
					email: {
						value: ''
					},
					phone: {
						value: ''
					}
				}
			};
		},
		components: {

		},
		ready() {

		},
		methods: {
			async nameBlur(e) {
				if (this.userInfo.name.trim() === '') {
					return;
				}
				let res = await checkValidate({
					name: this.userInfo.name
				});
				if (res) {
					this.errNameMsg = true;
					document.querySelector('#errName').innerHTML = '该名称已存在!';
				} else {
					this.errNameMsg = false;
					document.querySelector('#errName').innerHTML = '请输入名称!';
				}
			},
			async emailBlur(e) {
				if (this.userInfo.email.value.trim() === '') {
					return;
				}
				let res = await checkValidate({
					'email.value': this.userInfo.email.value
				});
				if (res) {
					this.errEmailMsg = true;
					document.querySelector('#errEmail').innerHTML = '该email已存在!';
				} else {
					this.errEmailMsg = false;
					document.querySelector('#errEmail').innerHTML = '请输入正确的url!';
				}
			},
			async save() {
				if (this.$validation.valid && !this.errNameMsg && !this.errEmailMsg) {
					let res = await signUp({
						name: this.userInfo.name,
						password: '123456',
						email: this.userInfo.email.value
					});
					if (res.code === 200) {
						res = res.data.result;
						actions.alert(store, {
							show: true,
							type: 'success',
							msg: '新增成功！',
							dismissible: true
						});
						this.$route.router.go({
							name: 'listUsers'
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
				} else {
					console.log('valid error..');
				}
			},
			async cancel() {
				this.$route.router.go({
					name: 'listUsers'
				});
			}
		},
		validators: {
			email: function(val) {
				return (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(val);
			}
		}
	};
</script>
