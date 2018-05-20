<template>
	<div>
		<span class="glyphicon glyphicon-font"></span>
		<table-edit-param></table-edit-param>
		<span class="glyphicon glyphicon-bold"></span>
		<table-edit-param></table-edit-param>
		<div>
			and/or
			<v-select :value.sync="concatValue" :options="concatList"  close-on-select>
			</v-select>
			选择判断条件
			<v-select :value.sync="expValue" :options="expOpts" close-on-select>
			</v-select>
			<tooltip v-if="expDetail" effect="scale" placement="bottom" :content="expDetail.desc_zh || '暂无说明'">
				<span class="glyphicon glyphicon-info-sign"></span>
			</tooltip>
			<button class="btn btn-success" @click="add">添加</button>
		</div>
	</div>
</template>
<script>
	import store from 'store';
	import actions from 'actions';

	import tableEditColumus from './table-edit-columus';
	import tableEditParam from './table-edit-param';
	import {select as vSelect, tooltip} from 'vue-strap';

	export default {
		components: {tableEditColumus, vSelect, tooltip, tableEditParam},
		vuex: {
			getters: {
				explist: () => store.state.expList
			}
		},
		data() {
			return {
				concatList: [{
					label: 'and',
					value: 'and'
				}, {
					label: 'or',
					value: 'or'
				}],
				concatValue: ['and'],
				expValue: []
			};
		},
		methods: {
			add() {

			}
		},
		computed: {
			expOpts() {
				let arr = [];
				if (this.explist.length) {
					this.explist.forEach(x => {
						arr.push({
							label: x.name,
							value: x.name
						});
					});
				}
				return arr;
			},
			expDetail() {
				if (this.expValue.length) {
					return this.explist.find(x => {
						return x.name === this.expValue[0];
					});
				}
				return null;
			}
		}
	};
</script>
