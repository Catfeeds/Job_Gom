<template>
	<modal :show.sync="show" effect="zoom" title="关联组件" :backdrop="false" ok-text="保存" cancel-text="取消" :callback="save">
		<div slot="modal-body" class="modal-body">
			<div class="row">
				<span>请选择要关联的组件</span>
				<v-select placeholder="展示组件" close-on-select :options="controlOpts" :value.sync="controlValue"></v-select>
				<v-select placeholder="关联列名" close-on-select :options="columnOpts" :value.sync="columnValue"></v-select>
				<button class="btn btn-success" @click="relate">关联</button>
			</div>
			<div>
				<group-list title="关联列表" :list="grouplist" :remove="remove"></group-list>
			</div>
		</div>
	</modal>
</template>
<script>
	import store from 'store';
	import actions from 'actions';
	import {modal, select as vSelect} from 'vue-strap';
	import groupList from '../../data/edit/table-edit-group-list';
	export default {
		components: {modal, vSelect, groupList},
		props: ['show', 'position', 'detail'],
		vuex: {
			getters: {
				components: () => store.state.components,
				layoutId: () => store.state.layoutId
			}
		},
		data() {
			return {
				controlValue: [],
				columnOpts: [],
				columnValue: [],
				grouplist: []
			};
		},
		methods: {
			save() {
				// console.log(this.detail.ref);
				this.show = false;
			},
			relate() {
				let tag = this.controlOpts.find(x => {
					return x.value === this.controlValue[0];
				});
				let column = this.columnOpts.find(x => {
					return x.value === this.columnValue[0];
				});
				let temp = {
					tagName: tag.label,
					tagid: tag.value,
					column: column.label
				};
				let exists = this.detail.ref.some(x => {
					return x.tagid === temp.tagid;
				});
				if (!exists) {
					this.detail.ref.push(temp);
				} else {
					actions.alert(store, {
						show: true,
						msg: '已关联该组件',
						type: 'danger',
						dismissible: true,
						delay: 2000
					});
				}
			},
			remove(index) {
				let group = this.grouplist[index];
				this.detail.ref.find((x, index) => {
					if (x.tagid === group.value) {
						this.detail.ref.splice(index, 1);
						return true;
					}
				});
			}
		},
		computed: {
			controlOpts() {
				let arr = [];
				if (this.position.length) {
					this.position.forEach(x => {
						if (x.component && x.component.compType === 'show') {
							arr.push({
								label: x.component.name,
								value: x.component.id.toString(),
								dataid: x.component.dataid
							});
						}
					});
				}
				return arr;
			},
			grouplist() {
				let arr = [];
				if (this.detail.ref.length) {
					this.detail.ref.forEach(x => {
						arr.push({
							text: `${x.tagName}.${x.column}`,
							value: x.tagid
						});
					});
				}
				return arr;
			}
		},
		watch: {
			controlValue(val) {
				if (val.length) {
					let id = this.controlOpts.find(x => {
						return x.value === val[0];
					}).dataid;
					this.$http.get('meta/column?id=' + id).then(res => {
						return res.json();
					}).then(res => {
						let arr = [];
						res.data.result.fields.forEach(x => {
							arr.push({
								label: x,
								value: x
							});
						});
						this.columnOpts = arr;
					});
				}
			}
		}
	};
</script>
<style scoped>
	.row {
		padding: 10px;
	}
</style>
