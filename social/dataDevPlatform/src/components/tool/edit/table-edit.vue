<template>
	<modal :show.sync="show" effect="zoom" large="true" title="编辑表" :backdrop="false" ok-text="保存" cancel-text="取消" :callback="save">
		<div slot="modal-body" class="modal-body" v-if="item">
			<tab :list="tabList" :val.sync="tabVal"></tab>
			<table-edit-info v-if="!tabVal" :item="item"></table-edit-info>
			<table-edit-select v-show="tabVal === 1"></table-edit-select>
			<table-edit-join v-if="tabVal === 2"></table-edit-join>
			<table-edit-where v-if="tabVal === 3"></table-edit-where>
			<table-edit-group v-if="tabVal === 4"></table-edit-group>
			<table-edit-having v-if="tabVal === 5"></table-edit-having>
			<table-edit-order v-if="tabVal === 6"></table-edit-order>
			<table-edit-limit v-show="tabVal === 7"></table-edit-limit>
		</div>
	</modal>
</template>
<script>
	import { modal, select as vSelect } from 'vue-strap';
	import store from 'store';
	import actions from 'actions';
	import tab from '../../base/tab';
	import tableEditInfo from './table-edit-info';
	import tableEditSelect from './table-edit-select';
	import tableEditJoin from './table-edit-join';
	import tableEditWhere from './table-edit-where';
	import tableEditGroup from './table-edit-group';
	import tableEditHaving from './table-edit-having';
	import tableEditOrder from './table-edit-order';
	import tableEditLimit from './table-edit-limit';

	export default {
		components: { modal, vSelect, tab, tableEditInfo, tableEditSelect, tableEditJoin, tableEditWhere, tableEditGroup, tableEditHaving, tableEditOrder, tableEditLimit },
		vuex: {
			getters: {
				editconfig: () => store.state.editConfig,
				contentlist: () => store.state.contentList
			}
		},
		data() {
			return {
				tabList: ['info', 'select', 'join', 'where', 'group', 'having', 'order', 'limit', 'lview', 'aggr'],
				tabVal: 0
			};
		},
		computed: {
			item: {
				get() {
					return this.contentlist.find(x => x.isedit);
				},
				set(val) {
					actions.SetContent(store, this.item.schemaname.concat('.', this.item.tablename), val);
				}
			},
			show: {
				get() {
					return this.editconfig.show;
				},
				set(val) {
					actions.SetEditConfig(store, {show: val});
				}
			}
		},
		methods: {
			save() {
				this.show = false;
				// contentlist.length === 1 table
				// union
				// cross
			}
		}
	};
</script>
<style scoped>
	
</style>