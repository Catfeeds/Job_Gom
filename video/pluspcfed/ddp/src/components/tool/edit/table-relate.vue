<template>
	<modal :show.sync="show" effect="zoom" title="选择关联表" :backdrop="false" ok-text="关联" cancel-text="取消" :callback="save">
		<div slot="modal-body" class="modal-body">
			<div class="select">
				<p>表1</p>
				<v-select :value.sync="value1" :options="select1" placeholder="选择表1" search close-on-select></v-select>
			</div>
			<div class="select">
				<p>表2</p>
				<v-select :value.sync="value2" :options="select2" placeholder="选择表2" search close-on-select></v-select>
			</div>
			<div class="relate_list">
				<p>关联列表</p>
				<div v-for="item in relatelist">
					<div class="select">
						{{item.a}}
					</div>
					<div class="select">
						{{item.b}}
					</div>
				</div>
			</div>
		</div>
	</modal>
</template>
<script>
	import { modal, select as vSelect } from 'vue-strap';
	import store from 'store';
	import actions from 'actions';

	export default {
		components: { modal, vSelect },
		vuex: {
			getters: {
				relateconfig: () => store.state.relateConfig,
				contentlist: () => store.state.contentList,
				relatelist: () => store.state.relateList
			}
		},
		data() {
			return {
				value1: [],
				value2: []
			};
		},
		computed: {
			show: {
				get() {
					return this.relateconfig.show;
				},
				set(val) {
					actions.SetRelateConfig(store, {show: val});
				}
			},
			select1() {
				let arr = [];
				this.contentlist.forEach(x => {
					let val = [x.schemaname, '.', x.tablename].join('');
					if (!this.value2.length || val !== this.value2[0]) {
						arr.push({
							value: val,
							label: val
						});
					}
				});
				return arr;
			},
			select2() {
				let arr = [];
				this.contentlist.forEach(x => {
					let val = [x.schemaname, '.', x.tablename].join('');
					if (!this.value1.length || val !== this.value1[0]) {
						arr.push({
							value: val,
							label: val
						});
					}
				});
				return arr;
			}
		},
		methods: {
			save() {
				if (!this.value1.length || !this.value2.length) {
					return false;
				}
				let obj = {
					a: this.value1[0],
					b: this.value2[0]
				};
				let isexists = this.relatelist.some(x => JSON.stringify(x) === JSON.stringify(obj));
				if (!isexists) {
					actions.AddRelate(store, obj);
				}
				this.reset();
				// this.show = false;
			},
			reset() {
				this.value1 = [];
				this.value2 = [];
			}
		},
		watch: {
			show(val) {
				if (val) {
					this.reset();
				}
			}
		}
	};
</script>
<style>
	.select {
		width: 49%;
		text-align: center;
		display: inline-block;
	}

	.relate_list {
		text-align: center;
		margin-top: 20px;
		padding: 10px;
		border: 1px solid #eee;
	}
</style>