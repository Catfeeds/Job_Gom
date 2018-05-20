<template>
<modal :show.sync="show" effect="zoom" large="true" title="权限管理" :backdrop="true">
	<div slot="modal-body" class="modal-body permission">
		<div style="margin-bottom: 10px;">
			<p>
				用户名: {{name}}
			</p>
			<button class="btn btn-success" @click="add">新增</button>
			<v-select style="float: right;" :value.sync="typeValue" :options="typeOption"  close-on-select></v-select>
		</div>
		<table class="table table-bordered table-striped table-hover">
			<tr class="active">
				<th>序号</th>
				<th>资源名称</th>
				<th>资源类型</th>
				<th>权限</th>
				<th>操作</th>
			</tr>
			<tr v-for="(index,item) in list" track-by="$index">
				<td>{{index+1}}</td>
				<td>{{item.name}}</td>
				<td>{{item.type === 'project'? '项目' : '报表'}}</td>
				<td>{{item.permission}}</td>
				<td>
					<button class="btn btn-primary" @click="update(item)">编辑</button>
					<button class="btn btn-danger" @click="deleteById(item)">删除</button>
				</td>
			</tr>
			<tr v-if="!list.length">
				<td align="center" colspan="5">该账户暂无权限</td>
			</tr>
		</table>
		<v-pagination :pagination-config.sync="pagconfig"></v-pagination>
	</div>
</modal>
<add :show.sync="showModal" :model="model" :callback="savePermission"></add>
</template>
<script>
import actions from 'actions';
import store from 'store';
import { modal, select as vSelect } from 'vue-strap';
import add from './add';
export default {
	components: {modal, vSelect, add},
	props: {
		id: {
			type: Number,
			required: true
		},
		name: {
			type: String
		},
		show: {
			type: Boolean,
			required: true,
			twoWay: true
		}
	},
	data() {
		return {
			list: [],
			config: {
				type: 'report', // 类型（project/report）默认report
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
			typeValue: ['report'],
			typeOption: [
				{
					label: '项目',
					value: 'project'
				},
				{
					label: '报表',
					value: 'report'
				}
			],
			model: {
				id: 0,
				name: '',
				resource: 0,
				permission: '0000',
				type: ''
			},
			showModal: false
		};
	},
	ready() {
		this.pagconfig.onChange = () => {
			this.config.page = this.pagconfig.currentPage;
			this.getList();
		};
	},
	methods: {
		getList() {
			let config = this.config;
			let url = `right?id=${this.id}&type=${config.type}&page=${config.page}&limit=${config.limit}`;
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
			this.$http.delete(`right?id=${item.id}`).then(res => res.json()).then(res => {
				if (res.iserror === '0') {
					let index = this.list.indexOf(item);
					this.list.splice(index, 1);
				} else {
					actions.alert(store, {
						show: true,
						msg: res.msg,
						type: 'danger'
					});
				}
			});
		},
		add() {
			this.model.id = 0;
			this.model.name = '';
			this.model.resource = 0;
			this.model.permission = '0000';
			this.model.type = this.typeValue[0];

			this.showModal = true;
		},
		update(item) {
			this.$set('model', Object.assign({}, item));

			this.showModal = true;
		},
		savePermission(model) {
			if (model.id) {
				this.$http.put('right', {
					id: model.id,
					user: this.id,
					resource: model.resource,
					permission: model.permission
				}, {
					emulateJSON: false
				}).then(res => res.json()).then(res => {
					let temp = this.list.find(x => x.id === model.id);
					for (let key of Object.keys(temp)) {
						temp[key] = model[key];
					}
				});
			} else {
				this.$http.post('right', {
					user: this.id,
					resource: model.resource,
					permission: model.permission,
					type: model.type
				}).then(res => res.json()).then(res => {
					if (!res.data.result) {
						alert(res.msg);
						return;
					}
					model.id = res.data.result;
					if (model.type !== this.typeValue[0]) {
						this.typeValue = [model.type];
					} else {
						this.list.push(model);
					}
				});
			}
		}
	},
	watch: {
		typeValue(val) {
			this.config.type = val[0];
			this.getList();
		},
		id(val) {
			if (val) {
				this.getList();
			}
		}
	}
};
</script>
<style>
.permission+.modal-footer {
	display: none;
}
</style>
