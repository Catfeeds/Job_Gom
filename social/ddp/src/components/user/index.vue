<template>
<div>
	<form class="form-inline" style="margin: 10px 0">
		<div class="form-group">
			<input type="text" class="form-control" v-model="filterName" placeholder="名称">
		</div>
		<div class="form-group">
			<button class="btn btn-success" @click="search">查询</button>
		</div>
	</form>
	<table class="table table-bordered table-striped table-hover">
		<tr class="active">
			<th>序号</th>
			<th>姓名</th>
			<th>帐号</th>
			<th>注册时间</th>
			<th>Email</th>
			<th>状态</th>
			<th>操作</th>
		</tr>
		<tr v-for="(index,item) in list">
			<td>{{index+1}}</td>
			<td>{{item.true_name}}</td>
			<td>{{item.user_name}}</td>
			<td>{{item.reg_time | date}}</td>
			<td>{{item.email}}</td>
			<td>{{item.state === 0 ? '正常' : '停用'}}</td>
			<td>
				<button class="btn btn-primary" @click="updatePermission(item)">修改权限</button>
				<!-- <button class="btn btn-danger" @click="deleteById(item)">停用</button> -->
			</td>
		</tr>
	</table>
	<v-pagination :pagination-config.sync="pagconfig"></v-pagination>

	<permission :show.sync="showPermission" :id="permissionId" :name="permissionName"></permission>
</div>
</template>
<script>
import actions from 'actions';
import store from 'store';

import permission from './permission';

export default {
	components: {permission},
	data() {
		return {
			list: [],
			filterName: '',
			config: {
				filter: '',
				page: 1,
				limit: 10
			},
			pagconfig: {
				currentPage: 1,
				itemsPerPage: 10,
				onChange: null,
				pagesLength: 7,
				totalItems: 100
			},
			showPermission: false,
			permissionId: 0,
			permissionName: ''
		};
	},
	route: {
		data() {
			actions.controlSideNav(store, false);
			this.getList();

			this.pagconfig.onChange = () => {
				this.config.page = this.pagconfig.currentPage;
				this.getList();
			};
		}
	},
	methods: {
		getList() {
			let config = this.config;
			let url = `user/list?filter=${config.filter}&page=${config.page}&limit=${config.limit}`;
			this.$http.get(url).then(res => res.json()).then(res => {
				if (res.iserror === '0') {
					this.list = res.data.result;
					this.pagconfig.totalItems = parseInt(res.data.total);
				} else {
					actions.alert(store, {
						show: true,
						msg: res.msg,
						type: 'danger'
					});
				}
			});
		},
		deleteById(item) {
			this.$http.delete(`user?id=${item.user_id}`).then(res => res.json()).then(res => {
				if (res.iserror === '0') {
					item.state = 1;
				} else {
					actions.alert(store, {
						show: true,
						msg: res.msg,
						type: 'danger'
					});
				}
			});
		},
		search() {
			this.config.filter = this.filterName;
			this.getList();
		},
		updatePermission(item) {
			this.permissionId = item.user_id;
			this.permissionName = item.user_name;
			this.showPermission = true;
		}
	}
};
</script>
