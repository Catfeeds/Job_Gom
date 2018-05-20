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
			<form>
				<fieldset>
					<legend>基本信息：</legend>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							用户名：
						</label>
						<div class="col-sm-8">
							<input class="form-control" :readonly="editState===-1" value="{{userInfo.name}}" v-model="updateInfo.name" @change="editState=1" lazy>
						</div>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							邮箱：
						</label>
						<div class="col-sm-8">
							<input class="form-control" :readonly="editState===-1" value="{{userInfo.email.value}}" v-model="updateInfo.email" @change="editState=1" lazy>
						</div>
						<button type="button" class="btn btn-sm btn-primary" @click="editState=0">验证邮箱</button>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							手机：
						</label>
						<div class="col-sm-8">
							<input class="form-control" :readonly="editState===-1" value="{{userInfo.phone.value}}" v-model="updateInfo.phone" @change="editState=1" lazy>
						</div>
						<button type="button" class="btn btn-sm btn-primary" @click="editState=0">验证手机</button>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">创建时间：</label>
						<div class="col-sm-8">
							<input class="form-control" readonly :value="userInfo._createdAt | Date 'yyyy-MM-dd'">
						</div>
					</div>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							更新时间：
						</label>
						<div class="col-sm-8">
							<input class="form-control" readonly :value="userInfo._updatedAt | Date 'yyyy-MM-dd'">
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							状态：
						</label>
						<div v-if="userInfo._status === 0">
							<div class="col-sm-8">
								<input class="form-control" readonly value="已禁用">
							</div>
							<button type="button" class="btn btn-sm btn-success" @click="activateUser">启用用户</button>
						</div>
						<div v-else>
							<div class="col-sm-8">
								<input class="form-control" readonly value="可用">
							</div>
							<button type="button" class="btn btn-sm btn-danger" @click="banUser">禁用用户</button>
						</div>
					</div>
					<div class="form-actions">
						<button type="button" class="btn btn-sm btn-primary" @click="editState=0">编辑信息</button>
						<button type="button" class="btn btn-sm btn-danger" @click="deleteUser()">删除用户</button>
						<button v-show="editState !== -1" type="button" class="btn btn-sm btn-danger right" @click="cancel">取消</button>
						<button v-show="editState !== -1" type="button" class="btn btn-sm btn-success right" @click="save">保存</button>
					</div>
				</fieldset>


				<fieldset >
					<legend>用户组信息：</legend>
						<template v-if = "userInfo.group">
							<div class="col-sm-12">
								<label class="col-sm-2 align-rt">
									名称：
								</label>
								<div class="col-sm-8">
									<input class="form-control" :readonly="editState===-1" value="{{userInfo.group.name}}">
								</div>
							</div>
							<div class="col-sm-12">
								<label class="col-sm-2 align-rt">
									code：
								</label>
								<div class="col-sm-8">
									<input class="form-control" :readonly="editState===-1" value="{{userInfo.group.code}}">
								</div>
							</div>
							<div class="col-sm-12">
								<label class="col-sm-2 align-rt">
									权限：
								</label>
								<div class="col-sm-8">
									<table class="table">
										<tr>
											<th>模块</th>
											<th>action</th>
											<th>权限</th>
										</tr>
										<template v-for="(name,value) in userInfo.group.permission">
											<tr>
												<th colspan="1" style="border-right: 1px solid #ddd;" rowspan={{value.length}}>{{name}}</th>
												<td colspan="1">1</td>
												<td colspan="8">{{value[0].value}}</td>
											</tr>
											<tr v-for="(i,ci) in value.slice(1)">
													<td colspan="1">{{ci.id}}</td>
													<td colspan="8">{{ci.value}}</td>
												</tr>
										</template>
									</table>
								</div>
							</div>
							<div class="col-sm-12">
								<label class="col-sm-2 align-rt">
									描述：
								</label>
								<div class="col-sm-8">
									<textarea class="form-control" rows="3" readonly value="">{{userInfo.group.description}}</textarea>
								</div>
							</div>
							<div class="form-actions">
								<button type="button" class="btn btn-sm btn-primary" @click="">指定用户组</button>
								<button type="button" class="btn btn-sm btn-primary" @click="">编辑用户组</button>
							</div>
						</template>
						<template v-else>
							<div class="form-actions">
								<button type="button" class="btn btn-sm btn-primary" @click="">指定用户组</button>
								<button type="button" class="btn btn-sm btn-primary" @click="">编辑用户组</button>
							</div>
						</template>

				</fieldset>

			</form>
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
	import {getUserInfo, updateUserInfo, banUser, activateUser} from '../../../api/user';
	import _ from 'lodash';

	export default {
		name: 'user-detail',
		data() {
			return {
				id: '',
				formInfo: [],
				userInfo: {
					email: {
						value: ''
					},
					phone: {
						value: ''
					}
				},
				updateInfo: {},
				// 1 -> edited 0-> available
				editState: -1
			};
		},
		components: {

		},
		created() {
			const that = this;
			this.id = this.$route.params.id;
			(async () => {
				let result = await getUserInfo(this.id);
				that.userInfo = result;
			})();
		},
		methods: {
			async save() {
				// console.log(this.updateInfo);
				if (this.editState === 1) {
					let res = await updateUserInfo(this.id, this.updateInfo);
					return res;
				} else {
					this.editState = -1;
				}
			},
			cancel() {
				if (this.editState === 1) {
					this.updateInfo.name = this.userInfo.name;
					this.updateInfo.email = this.userInfo.email.value;
					this.updateInfo.phone = this.userInfo.phone.value;
				}
				this.editState = -1;
			},
			async banUser() {
				let res = await banUser(this.id);
				if (res.code === 200) {
					actions.alert(store, {
						show: true,
						type: 'success',
						msg: '禁用成功！',
						dismissible: true
					});
					this.userInfo._status = 0;
				} else {
					actions.alert(store, {
						show: true,
						type: 'danger',
						msg: `禁用失败,详细信息:<br>${JSON.stringify(res.data, null, 4)}`,
						dismissible: true
					});
				}
			},
			async activateUser() {
				let res = await activateUser(this.id);
				if (res.code === 200) {
					actions.alert(store, {
						show: true,
						type: 'success',
						msg: '激活成功！',
						dismissible: true
					});
					this.userInfo._status = 1;
				} else {
					actions.alert(store, {
						show: true,
						type: 'danger',
						msg: `激活失败,详细信息:<br>${JSON.stringify(res.data, null, 4)}`,
						dismissible: true
					});
				}
			}
		}
	};
</script>
