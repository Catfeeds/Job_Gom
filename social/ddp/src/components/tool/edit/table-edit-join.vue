<template>
	<div>
		<h4>关联表</h4>
		<v-select :value.sync="left_value" :options="left_opt" placeholder="选择表1" search close-on-select></v-select>
		<!-- <v-select :value.sync="left_columns_value" :options="left_columns_opt" placeholder="字段" search close-on-select></v-select> -->
		<v-select :value.sync="type_value" :options="type_opt" placeholder="关联类型" close-on-select></v-select>
		<v-select :value.sync="right_value" :options="right_opt" placeholder="选择表2" search close-on-select></v-select>
		<!-- <v-select :value.sync="right_columns_value" :options="right_columns_opt" placeholder="字段" search close-on-select></v-select> -->
		<button class="btn btn-success" :disabled="!valid" @click="relate">关联</button>
	</div>
	<div>
		<h4>关联列</h4>
		<table-edit-where></table-edit-where>
	</div>
</template>
<script>
	import { select as vSelect } from 'vue-strap';
	import store from 'store';
	import actions from 'actions';
	import tableEditWhere from './table-edit-where';

	/*
	表关联
	on ...
	字段条件、or/and
	*/

	export default {
		components: {vSelect, tableEditWhere},
		vuex: {
			getters: {
				relateconfig: () => store.state.relateConfig,
				contentlist: () => store.state.contentList,
				relatelist: () => store.state.relateList
			}
		},
		data() {
			return {
				join: {
					type: 'join',
					value: 'left', // left, right, inner, full, left semi
					left: 'table',
					right: 'join',
					on: 'logic'
				},
				type_opt: [{
					label: 'left',
					value: 'left'
				}, {
					label: 'right',
					value: 'right'
				}, {
					label: 'inner',
					value: 'inner'
				}, {
					label: 'full',
					value: 'full'
				}, {
					label: 'left semi',
					value: 'left semi'
				}, {
					label: 'union all',
					value: 'union all'
				}, {
					label: 'union distinct',
					value: 'union distinct'
				}, {
					label: 'union default',
					value: 'union default'
				}],
				type_value: [],
				left_value: [],
				left_columns_value: [],
				right_value: [],
				right_columns_value: []
			};
		},
		methods: {
			getTableOpt(value) {
				let arr = [];
				this.contentlist.forEach(x => {
					let val = [x.schemaname, '.', x.tablename].join('');
					if (!value.length || val !== value[0]) {
						arr.push({
							value: val,
							label: val
						});
					}
				});
				return arr;
			},
			getColumnsOpt(value) {
				let arr = [];
				if (value.length) {
					let temp = this.contentlist.find(x => {
						return [x.schemaname, '.', x.tablename].join('') === value[0];
					});
					temp.columns.forEach(col => {
						arr.push({
							label: col.columnname,
							value: col.columnname
						});
					});
				}
				return arr;
			},
			relate() {
				let join = {
					type: 'join',
					value: this.type_value[0],
					left: this.left_value[0],
					right: this.right_value[0],
					on: {
						type: 'logic',
						value: 'equal',
						left: this.left_columns_value[0],
						right: this.right_columns_value[0]
					}
				};
			}
		},
		computed: {
			valid() {
				return this.type_value.length && this.left_value.length && this.right_value.length;
			},
			left_opt() {
				return this.getTableOpt(this.right_value);
			},
			left_columns_opt() {
				return this.getColumnsOpt(this.left_value);
			},
			right_opt() {
				return this.getTableOpt(this.left_value);
			},
			right_columns_opt() {
				return this.getColumnsOpt(this.right_value);
			}
		},
		watch: {
			left_value() {
				this.left_columns_value = [];
			},
			right_value() {
				this.right_columns_value = [];
			}
		}
	};
</script>
<style scoped>
	
</style>