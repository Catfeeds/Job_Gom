<template>
	<div>
		<table-edit-param></table-edit-param>
		<button class="btn btn-success" @click="add()">排序</button>
		<label class="radio-inline">
			<input type="radio" name="optionsRadios" id="optionsRadios1" value="desc" checked>
			desc降序
		</label>
		<label class="radio-inline">
			<input type="radio" name="optionsRadios" id="optionsRadios2" value="asc">
			asc升序
		</label>
	</div>
	<table-edit-group-list title="排序列表" :list="orderbyList" :remove="removeOrderby"></table-edit-group-list>
</div>
</template>
<script>
	import store from 'store';
	import actions from 'actions';
	import tableEditParam from './table-edit-param';
	import tableEditGroupList from './table-edit-group-list';

	export default {
		components: {tableEditParam, tableEditGroupList},
		vuex: {
			getters: {
				orderbyList: () => store.state.orderbyList
			}
		},
		data() {
			return {
				list: []
			};
		},
		methods: {
			add() {

			},
			removeOrderby(index) {
				actions.SpliceOrderby(store, index);
			}
		}
	};
</script>
<style scoped>
	
</style>