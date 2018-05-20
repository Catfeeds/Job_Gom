<template>
	<div>
		<table-edit-param ></table-edit-param>
		<button class="btn btn-success" @click="add">添加</button>
		<table-edit-group-list title="自定义返回字段" :list="selectList" :remove="updateIsReturn"></table-edit-group-list>
		<table-edit-group-list title="基本返回字段" :list="columns" :remove="updateIsReturn"></table-edit-group-list>
	</div>
</template>
<script>
	import tableEditGroupList from './table-edit-group-list';
	import tableEditParam from './table-edit-param';
	import store from 'store';
	import actions from 'actions';
	import utils from './utils';

	export default {
		components: {tableEditGroupList, tableEditParam},
		vuex: {
			getters: {
				contentlist: () => store.state.contentList
			}
		},
		data() {
			return {
				list: []
			};
		},
		methods: {
			updateIsReturn(index) {
				actions.SetContentCoulumn(store, this.columns[index].name, this.columns[index].index, {isreturn: false});
			},
			add() {
				let arr = utils.getParams(this);
				this.list.push(arr);
				utils.paramReset(this);
			}
		},
		computed: {
			columns() {
				let arr = [];
				let temp = this.contentlist.forEach(x => {
					x.columns.forEach((c, index) => {
						if (c.isreturn) {
							arr.push({
								text: c.tablename + '.' + c.columnname + (c.alias ? (' 别名:' + c.alias) : ''),
								tablename: c.tablename,
								label: c.columnname + (c.alias ? (' 别名:' + c.alias) : ''),
								name: c.tableschema + '.' + c.tablename,
								index: index
							});
						}
					});
				});
				return arr;
			},
			selectList() {
				let arr = [];
				this.list.forEach(x => {
					let obj = {};
					// x.forEach(i => {
					let i = x[0];
					switch (i.val.type) {
					case '1':
						obj = {
							text: '常量:' + i.val.val
						};
						break;
					case '2':
						obj = {
							text: `字段:${i.val.val[0].tablename}.${i.val.val[0].label}`
						};
						break;
					case '3':
						obj = {
							text: '函数:' + i.val.val.name
						};
						break;
					}
					// });
					arr.push(obj);
				});
				return arr;
			}
		}
	};
</script>
<style>
	
</style>