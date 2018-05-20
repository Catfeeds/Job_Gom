<template>
	<div class="table-edit-param">
		<v-select :value.sync="typeVal" :options="typeOpts"  close-on-select></v-select>

		<input v-if="type === '1'" type="text" v-model="text" class="form-control" placeholder="常量 数字/文本/日期">

		<table-edit-columus v-if="type === '2'" :val.sync="columnVal" :multiple="false"></table-edit-columus>

		<template v-if="type === '3'">
			<v-select :value.sync="fTypeValue" :options="fTypeList" placeholder="选择函数类型" close-on-select>
			</v-select>
			<v-select :value.sync="funValue" :options="funList" placeholder="选择函数" close-on-select>
			</v-select>
			<template v-if="funDetail">
				<tooltip trigger="hover" effect="scale" placement="top" :content="funDetail.desc || '暂无说明'">
					<span class="glyphicon glyphicon-info-sign"></span>
				</tooltip>
				<div v-for="(index, item) in funDetail.params" style="margin-left:50px">
					<table-edit-param v-ref:params></table-edit-param>
				</div>
				<div v-for="(index, item) in paramLength" style="margin-left:50px">
					<table-edit-param ></table-edit-param>
				</div>
				<tooltip v-if="funDetail.params[funDetail.params.length-1] === '...'" trigger="hover" effect="scale" placement="top" content="该函数不限制参数个数，点击添加">
					<button class="btn btn-info" @click="paramLength++"><span class="glyphicon glyphicon-plus"></span></button>
				</tooltip>
				<button v-if="paramLength" class="btn btn-info" @click="paramLength--"><span class="glyphicon glyphicon-minus"></span></button>
			</template>
		</template>
	</div>
</template>
<script>
	import store from 'store';
	import actions from 'actions';

	import tableEditColumus from './table-edit-columus';
	import {select as vSelect, tooltip} from 'vue-strap';

	export default {
		name: 'tableEditParam',
		// props: {
		// 	fun: {
		// 		type: Function,
		// 		twoWay: true,
		// 		default: () => {}
		// 	}
		// },
		components: {tableEditColumus, vSelect, tooltip},
		data() {
			return {
				typeOpts: [{
					label: '常量',
					value: '1'
				}, {
					label: '字段',
					value: '2'
				}, {
					label: '函数',
					value: '3'
				}],
				typeVal: ['1'],
				columnVal: [],
				fTypeValue: [],
				funValue: [],
				paramLength: 0,
				text: ''
			};
		},
		vuex: {
			getters: {
				funlist: () => store.state.funList
			}
		},
		methods: {
			getVal() {
				let val;
				switch (this.type) {
				case '1':
					val = this.text;
					break;
				case '2':
					val = this.columnVal;
					break;
				case '3':
					val = this.funDetail;
					break;
				};
				return {
					type: this.type,
					val: val
				};
			}
		},
		computed: {
			type() {
				return this.typeVal.length ? this.typeVal[0] : '1';
			},
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
		}
	};
</script>
<style scoped>
	input.form-control {
		display: inline;
		width: auto;
	}
	.table-edit-param {
		padding: 10px;
		margin: 5px;
		border: 2px solid #abc;
		border-radius: 3px;
	}
</style>