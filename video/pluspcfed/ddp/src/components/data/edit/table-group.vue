<template>
	<modal :show.sync="show" effect="zoom" title="分组信息" :backdrop="false" ok-text="保存" cancel-text="取消" :callback="save">
		<div slot="modal-body" class="modal-body">
			<div>
				<v-select :value.sync="tableVal" :options="tableList" placeholder="选择表" search close-on-select></v-select>
				<v-select :value.sync="columnVal" :options="columnList" placeholder="选择列" search close-on-select></v-select>
				<span>根据该字段</span>
				<button class="btn btn-primary" @click="add(1)">分组</button>
				<button class="btn btn-primary" @click="add(2)">排序</button>
			</div>
			<group-list title="分组列表" :list="groupList" :remove="removeGroup"></group-list>
			<group-list title="排序列表" :list="orderbyList" :remove="removeOrderby"></group-list>
		</div>
	</modal>
</template>
<script>
	import {modal, select as vSelect} from 'vue-strap';
	import store from 'store';
	import actions from 'actions';
	import groupList from './table-edit-group-list';

	export default {
		components: {modal, vSelect, groupList},
		vuex: {
			getters: {
				contentlist: () => store.state.contentList,
				groupconfig: () => store.state.groupConfig,
				groupList: () => store.state.groupList,
				orderbyList: () => store.state.orderbyList
			}
		},
		data() {
			return {
				tableVal: [],
				columnVal: [],
				list: []
			};
		},
		computed: {
			show: {
				get() {
					return this.groupconfig.show;
				},
				set(val) {
					actions.SetGroupConfig(store, {show: val});
				}
			},
			tableList() {
				let arr = [];
				this.contentlist.forEach(x => {
					let val = [x.schemaname, '.', x.tablename].join('');
					arr.push({
						value: val,
						label: val,
						columns: x.columns
					});
				});
				return arr;
			},
			columnList() {
				let arr = [];
				if (this.tableVal.length) {
					let val = this.tableVal[0];
					let temp = this.contentlist.find(x => {
						return [x.schemaname, '.', x.tablename].join('') === val;
					});
					if (temp && temp.columns) {
						temp.columns.forEach(col => {
							arr.push({
								value: col.ordinalposition.toString(),
								label: col.columnname,
								tablename: col.tablename,
								tableschema: col.tableschema
							});
						});
					}
				}
				return arr;
			}
		},
		methods: {
			add(type) {
				if (!this.columnVal.length) {
					return;
				}
				let val = this.columnVal[0];
				let temp = this.columnList.find(x => {
					return x.value === val;
				});

				if (type === 1) {
					if (this.groupList.some(x => x === temp)) {
						return;
					}

					actions.AddGroup(store, temp);
				} else if (type === 2) {
					if (this.orderbyList.some(x => x === temp)) {
						return;
					}

					actions.AddOrderby(store, temp);
				}
			},
			removeGroup(index) {
				actions.SpliceGroup(store, index);
			},
			removeOrderby(index) {
				actions.SpliceOrderby(store, index);
			},
			save() {
				this.show = false;
			}
		},
		watch: {
			show(val) {
				if (val) {
					this.tableVal = [];
					this.columnVal = [];
				}
			},
			tableVal() {
				this.columnVal = [];
			}
		}
	};
</script>
