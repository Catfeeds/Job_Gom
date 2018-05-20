<template>
	<div class="toolbar">
		<span>报表：
			<b>{{name}}</b>&nbsp;
		</span>
		<span>布局：</span>
		<v-select :options="layoutOptions" :value.sync="layoutValue" close-on-select></v-select>
	</div>
</template>
<script>
	import store from 'store';
	import actions from 'actions';
	import { select as vSelect } from 'vue-strap';

	export default {
		components: {vSelect},
		props: ['name'],
		vuex: {
			getters: {
				layouts: () => store.state.layouts
			}
		},
		data() {
			return {
				layoutValue: []
			};
		},
		computed: {
			layoutOptions() {
				let arr = [];
				if (this.layouts.length) {
					this.layouts.forEach(x => {
						arr.push({
							label: x.name,
							value: x.id.toString()
						});
					});
					this.layoutValue = arr[0].value;
				}
				return arr;
			}
		},
		watch: {
			layoutValue(val) {
				if (val.length) {
					actions.setLayoutId(store, parseInt(val[0]));
				} else {
					actions.setLayoutId(store, 0);
				}
			}
		}
	};
</script>
<style scoped lang="less">
	@height: 60px;
	.toolbar {
		height: @height;
		line-height: @height;
		text-align: center;
		border-bottom: 1px solid #abc;
		margin-bottom: 10px;
	}
</style>
