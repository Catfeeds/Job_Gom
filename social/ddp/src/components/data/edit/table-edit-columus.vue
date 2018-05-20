<template>
		<v-select :value.sync="tableVal" :options="tableList" placeholder="选择表" search close-on-select></v-select>
		<em></em>
		<v-select :value.sync="columnVal" :options="columnList" placeholder="选择列" search :multiple="multiple" :close-on-select="!multiple"></v-select>
</template>
<script>
	import {select as vSelect} from 'vue-strap';
	import store from 'store';

	export default {
		components: {vSelect},
		props: {
			val: {
				type: Array
			},
			multiple: {
				type: Boolean,
				default: true
			}
		},
		vuex: {
			getters: {
				contentlist: () => store.state.contentList
			}
		},
		data() {
			return {
				tableVal: [],
				columnVal: []
			};
		},
		computed: {
			tableList() {
				let arr = [];
				this.contentlist.forEach(x => {
					let val = [x.schemaname, '.', x.tablename].join('');
					let label = [x.schemaname, '.', x.tablename, x.alias].join('');
					arr.push({
						value: val,
						label: label,
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
								label: col.columnname + col.alias,
								tablename: col.tablename,
								tableschema: col.tableschema,
								columntype: col.columntype
							});
						});
					}
				}
				return arr;
			}
		},
		watch: {
			tableVal() {
				this.columnVal = [];
			},
			columnVal(val) {
				let arr = [];
				if (val.length) {
					this.columnVal.forEach(val => {
						let temp = this.columnList.find(x => {
							return x.value === val;
						});
						arr.push(temp);
					});
				}
				this.val = arr;
			}
		}
	};
</script>
<style scoped>
	
</style>