<template>
	<div>
		<table-edit-param v-ref:column :val.sync="columnVal"></table-edit-param>
		<button class="btn btn-success" @click="add()">分组</button>
	</div>
	<table-edit-group-list title="自定义分组列表" :list="selectList" :remove="remove"></table-edit-group-list>
	<table-edit-group-list title="分组列表" :list="groupList" :remove="removeGroup"></table-edit-group-list>
</div>
</template>
<script>
	import store from 'store';
	import actions from 'actions';
	import tableEditGroupList from './table-edit-group-list';
	import tableEditParam from './table-edit-param';
	import utils from './utils';

	export default {
		components: {tableEditParam, tableEditGroupList},
		vuex: {
			getters: {
				groupList: () => store.state.groupList
			}
		},
		data() {
			return {
				columnVal: [],
				list: []
			};
		},
		methods: {
			add() {
				// if (!this.columnVal.length) {
				// 	return;
				// }
				// this.columnVal.forEach(val => {
				// 	if (!this.groupList.some(x => x === val)) {
				// 		actions.AddGroup(store, val);
				// 	}
				// });
				// this.$refs.column.columnVal = [];
				let arr = utils.getParams(this);
				this.list.push(arr);
				utils.paramReset(this);
			},
			remove(index) {
				this.list.splice(index, 1);
			},
			removeGroup(index) {
				actions.SpliceGroup(store, index);
			}
		},
		computed: {
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
<style scoped>
	
</style>