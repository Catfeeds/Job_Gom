<template>
<div>
	<edit-detail :report-revise.sync="reportRevise" v-ref:detail></edit-detail>
	<div class="edit" v-show="!reportRevise">
		<toolbar :name="$refs.detail.info.RN" v-ref:toolbar></toolbar>
		<chiplist :name="$refs.detail.info.RN"></chiplist>
		<layout v-ref:layout></layout>
		<foot></foot>
	</div>
</div>
</template>
<script>
	import chiplist from './edit/chiplist';
	import layout from './edit/layout';
	import toolbar from './edit/toolbar';
	import foot from './edit/footer';
	import editDetail from './edit/editDetail';

	import store from 'store';
	import actions from 'actions';

	export default {
		components: {chiplist, layout, toolbar, foot, editDetail},
		data() {
			return {
				info: {
					name: '',
					id: 0,
					layout: {}
				},
				reportRevise: true
			};
		},
		vuex: {
			getters: {
				layouts: () => store.state.layouts,
				componentList: () => store.state.componentList
			}
		},
		route: {
			data() {
				actions.controlSideNav(store, false);

				if (!this.layouts.length) {
					this.$http.get('layout?limit=0&sortBy=name').then(res => {
						return res.json();
					}).then(res => {
						actions.setLayouts(store, res.data.result);
					});
					actions.setLayouts(store, [{id: 1, name: '组件1'}]);
				}
				// 获取组件信息并获取当前报表信息
				this.$http.get('component/forReport').then(res => {
					return res.json();
				}).then(res => {
					actions.setComponents(store, res.data.result);
					this.getInfo();
				});
			}
		},
		methods: {
			getInfo() {
				// this.$http.get('reportDetail?id=' + this.$route.params.id).then(res => {
				// 	return res.json();
				// }).then(res => {

				let data = this.$refs.detail.info;
				// 布局ID
				this.$refs.toolbar.layoutValue = [data.LI.toString() || '1'];
				if (data.LY && data.LN) {
					this.info.name = data.RN;
					let componentList = this.componentList;
					actions.setLayoutId(store, parseInt(data.LI));
					this.$refs.layout.layoutDetail.position.forEach((x, index) => {
						let temp = data.LY.position[index];
						let component = temp.component.id ? componentList.find(x => {
							return x.id === temp.component.id;
						}) : {};
						x.component = JSON.parse(JSON.stringify(component));
						x.ref = temp.ref;
						x.compName = x.component ? x.component.name : '';
					});
				}
				// });
			}
		}
	};
</script>
<style scoped>
	.edit {
		height: 100%;
	}
</style>
