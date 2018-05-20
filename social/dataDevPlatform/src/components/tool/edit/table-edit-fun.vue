<template>
	<v-select :value.sync="fTypeValue" :options="fTypeList" placeholder="选择函数类型" close-on-select>
	</v-select>
	<v-select :value.sync="funValue" :options="funList" placeholder="选择函数" close-on-select>
	</v-select>
	<template v-if="funDetail">
		<tooltip effect="scale" placement="top" :content="funDetail.desc || '暂无说明'">
			<span class="glyphicon glyphicon-info-sign"></span>
		</tooltip>
		<div v-for="(index, item) in funDetail.params" style="margin-left:50px">
			<table-edit-fun></table-edit-fun>
		</div>
		<button v-if="funDetail.params[funDetail.params.length-1] === '...'" class="btn btn-info">添加</button>
	</template>
</template>
</template>
<script>
	import {select as vSelect, tooltip} from 'vue-strap';
	import store from 'store';
	import Vue from 'vue';
	// import tableEditFun from './table-edit-fun';

	export default {
		name: 'tableEditFun',
		components: {vSelect, tooltip},
		data() {
			return {
				fTypeValue: [],
				funValue: []
			};
		},
		vuex: {
			getters: {
				funlist: () => store.state.funList
			}
		},
		computed: {
			fTypeList() {
				let arr = [];
				if (this.funlist) {
					for (let item in this.funlist) {
						arr.push({
							label: item,
							value: item
						});
					}
				}
				return arr;
			},
			funList() {
				let arr = [];
				if (this.fTypeValue.length) {
					this.funValue = [];
					this.funlist[this.fTypeValue[0]].forEach(x => {
						arr.push({
							label: x.name,
							value: x.name
						});
					});
				}
				return arr;
			},
			funDetail() {
				if (this.funValue.length) {
					return this.funlist[this.fTypeValue[0]].find(x => {
						return x.name === this.funValue[0];
					});
				}
				return null;
			}
		},
		watch: {
			funDetail(val) {
				// this.val = val;
			}
		}
	};
	// module.exports = tableEditFun;
</script>
<style>
	
</style>