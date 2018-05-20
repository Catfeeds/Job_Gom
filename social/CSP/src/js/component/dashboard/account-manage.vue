<template>
	<div class="btn-box"><a href="javascript:void(0)" class="btn btn-big btn-blue" @click="addUser()">添加账户</a></div>
	<table class="table">
		<tr>
			<th width="52">ID</th>
			<th>登录名</th>
			<th width="100">昵称</th>
			<th width="70">角色</th>
			<th width="135">创建时间</th>
			<th width="70">目前状态</th>
			<th width="140">操作</th>
		</tr>
		<tr v-for="item in userList">
			<td>{{item.id}}</td>
			<td>{{item.loginName}}</td>
			<td>{{item.nickname}}</td>
			<td>{{item.type | userType}}</td>
			<td>{{item.createTimeStr}}</td>
			<td>{{item.state | userStatus}}</td>
			<td>
				<a href="javascript:void(0)" class="btn btn-red" @click="editUser(item)">编辑</a>
				<a href="javascript:void(0)" class="btn btn-gray" @click="delUser(item)">删除</a>
			</td>
		</tr>
	</table>
	<m-pagination :pagination-conf="paginationConf"></m-pagination>
	<m-modal :modal-config="modalConfigNew">
		<div class="add-acount">
			<div class="input">
				<label>登录名</label>
				<input type="text" placeholder="输入用户gomeplus邮箱名" class="login-name" v-model="currentNewUser.loginName">
			</div>
			<div class="input">
				<label>昵称</label>
				<input type="text" v-model="currentNewUser.nickname">
			</div>
			<div class="input clearfix">
				<label>角色</label>
				<div class="character">
					<input type="text" placeholder="请输入昵称" readonly="readonly" @click="toggleRoleList()" :value="currentNewUser.type | userType"><em class="line" @click="toggleRoleList()"></em><em class="icon-down" @click="toggleRoleList()"></em>
					<ul v-show="showUserList">
						<li @click="toggleRoleList(),changeUserRole('new', 2)" value="2">客服</li>
						<li @click="toggleRoleList(),changeUserRole('new', 1)" value="1">客服经理</li>
					</ul>
				</div>
			</div>
		</div>
	</m-modal>
	<m-modal :modal-config="modalConfigEdit">
		<div class="add-acount">
			<h3 class="add-acount-title">{{currentEditUser.loginName}}</h3>
			<div class="input">
				<label>昵称</label>
				<input type="text" v-model="currentEditUser.nickname">
			</div>
			<div class="input clearfix">
				<label>角色</label>
				<div class="character">
					<input type="text" placeholder="请输入昵称" :value="currentEditUser.type | userType" readonly="readonly" @click="toggleRoleList()"><em class="line" @click="toggleRoleList()"></em><em class="icon-down" @click="toggleRoleList()"></em>
					<ul v-show="showUserList">
						<li @click="toggleRoleList(),changeUserRole('edit', 2)" value="2">客服</li>
						<li @click="toggleRoleList(),changeUserRole('edit', 1)" value="1">客服经理</li>
					</ul>
				</div>
			</div>
		</div>
	</m-modal>
</template>
<script>
import modalCon from '../common/modal-con.vue';
import Pagination from '../base/pagination.vue';

import store from 'store';
import actions from 'actions';

import utils from 'utils';

export default {
	name: 'accountManage',
	data() {
		return {
			modalConfigNew: {
				show: false,
				title: '新增账户',
				cancel_str: '放弃',
				apply_str: '保存',
				cancel_func: () => {
					this.showUserList = false;
					this.currentNewUser = {
						type: 2
					};
				},
				apply_func: () => {
					if (this.currentNewUser.loginName === '') {
						actions.alert(store, {
							show: true,
							msg: '登录名不能为空',
							type: 'danger'
						});
						return;
					}
					if (this.currentNewUser.nickname === '') {
						actions.alert(store, {
							show: true,
							msg: '昵称不能为空',
							type: 'danger'
						});
						return;
					}
					this.$http({
						url: 'operator/addOperator',
						method: 'post',
						body: {
							login_name: this.currentNewUser.loginName,
							nick_name: this.currentNewUser.nickname,
							role: this.currentNewUser.type
						}
					}).then((res) => {
						if (!res.data.result) {
							actions.alert(store, {
								show: true,
								msg: res.data.message,
								type: 'danger'
							});
							return;
						}
						actions.alert(store, {
							show: true,
							msg: '新增账户成功',
							type: 'success'
						});
						this.modalConfigNew.show = false;
						this.currentNewUser = {
							type: 2
						};
						this.paginationConf.currentPage = 1;
						this.getUserList();
					});
				}
			},
			modalConfigEdit: {
				show: false,
				title: '修改账户',
				cancel_str: '放弃',
				apply_str: '保存',
				cancel_func: () => {
					this.showUserList = false;
					this.currentEditUser = {};
				},
				apply_func: () => {
					if (this.currentEditUser.nickname === '') {
						actions.alert(store, {
							show: true,
							msg: '昵称不能为空',
							type: 'danger'
						});
						return;
					}
					this.$http({
						url: 'operator/updateOperator',
						method: 'post',
						body: {
							operatorId: this.currentEditUser.id,
							nickName: this.currentEditUser.nickname,
							role: this.currentEditUser.type
						}
					}).then((res) => {
						if (!res.data.result) {
							actions.alert(store, {
								show: true,
								msg: res.data.message,
								type: 'danger'
							});
							return;
						}
						actions.alert(store, {
							show: true,
							msg: '修改账户成功',
							type: 'success'
						});
						this.modalConfigEdit.show = false;
						this.currentEditUser = {};
						this.paginationConf.currentPage = 1;
						this.getUserList();
					});
				}
			},
			currentEditUser: {},
			currentNewUser: {
				loginName: '',
				nickname: '',
				type: 2
			},
			showUserList: false,
			paginationConf: {
				currentPage: 1,
				totalItems: 0,
				itemsPerPage: 10,
				pagesLength: 5,
				onChange: () => {
					this.getUserList();
				}
			},
			userList: []
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
	components: {
		'm-modal': modalCon,
		'm-pagination': Pagination
	},
	ready() {
		if (!utils.checkIsAdmin(this.user_info.type)) {
			actions.alert(store, {
				show: true,
				msg: '无权限',
				type: 'danger'
			});
			this.$route.router.go('/dashboard');
			return;
		}
		this.getUserList();
	},
	methods: {
		getUserList() {
			this.$http({
				url: 'operator/getOperatorListByPage',
				method: 'post',
				body: {
					pageSize: this.paginationConf.itemsPerPage,
					pageIndex: this.paginationConf.currentPage
				}
			}).then((res) => {
				const result = res.data;
				this.paginationConf.totalItems = result.data.total;
				this.userList = result.data.result;
			});
		},
		addUser() {
			this.modalConfigNew.show = true;
		},
		editUser(item) {
			this.modalConfigEdit.show = true;
			this.currentEditUser = Object.assign({}, item);
		},
		toggleRoleList() {
			this.showUserList = !this.showUserList;
		},
		changeUserRole(obj, type) {
			let target = null;
			if (obj === 'new') {
				target = this.currentNewUser;
			} else if (obj === 'edit') {
				target = this.currentEditUser;
			}
			target.type = type;
		},
		delUser(item) {
			actions.confirm(store, {
				show: true,
				title: '删除角色',
				msg: '是否删除帐户：' + item.nickname,
				apply: () => {
					this.$http({
						url: 'operator/deleteOperator',
						method: 'post',
						body: {
							operator_id: item.id
						}
					}).then((res) => {
						if (!res.data.result) {
							actions.alert(store, {
								show: true,
								msg: res.data.message,
								type: 'danger'
							});
							return;
						}
						actions.alert(store, {
							show: true,
							msg: '删除成功',
							type: 'success'
						});
						this.paginationConf.currentPage = 1;
						this.getUserList();
					});
				}
			});
		}
	}
};
</script>
