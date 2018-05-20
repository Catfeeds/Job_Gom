<template>
	<div class="toolbar">
		<template v-if="false">
			<button class="btn btn-sm btn-success" @click="save">保存</button>
			<div class="btn-group" role="group" aria-label="...">
				<button class="btn btn-sm btn-info" @click="relate">关联</button>
				<button class="btn btn-sm btn-primary" @click="groupby">分组/排序</button>
				<button class="btn btn-sm btn-danger" @click="reset">重置</button>
			</div>
			<!-- <div class="btn-group">
				<button class="btn btn-sm btn-primary">
					<span class="glyphicon glyphicon glyphicon-filter">Where</span>
				</button>
				<button class="btn btn-sm btn-primary">
					<span class="glyphicon glyphicon-th">Group</span>
				</button>
				<button class="btn btn-sm btn-primary">
					<span class="glyphicon glyphicon-glass">Having</span>
				</button>
				<button class="btn btn-sm btn-primary">
					<span class="glyphicon glyphicon-sort-by-alphabet">Order</span>
				</button>
				<button class="btn btn-sm btn-primary">
					<span class="glyphicon glyphicon-hourglass">Limit</span>
				</button>
				<button class="btn btn-sm btn-primary">
					<span class="glyphicon glyphicon-sort">Lview</span>
				</button>
				<button class="btn btn-sm btn-primary">
					Aggr
				</button>
			</div> -->
		</template>
		<template v-if="val === 0">
			<button class="btn btn-sm btn-success" @click="saveSql">保存</button>
			<button class="btn btn-sm btn-primary" @click="creatReport">保存成报表</button>
			<button class="btn btn-sm btn-primary" @click="showExpression">表达式列表</button>
			<button class="btn btn-sm btn-danger" @click="clearHistory">清除历史</button>
		</template>
		<template v-if="val === 1">
			<button class="btn btn-sm btn-success" @click="saveSql">保存</button>
			<button class="btn btn-sm btn-primary" @click="creatReport">保存成报表</button>
			<button class="btn btn-sm btn-danger" @click="clearDispatch">取消调度</button>
		</template>
		<template v-if="val === 2">
			<button class="btn btn-sm btn-success" @click="saveSql">保存</button>
			<button class="btn btn-sm btn-primary" @click="creatReport">保存成报表</button>
		</template>
	</div>
</template>
<script>
	import store from 'store';
	import actions from 'actions';
	import eventBus from '../../common/event-bus';

	export default {
		vuex: {
			getters: {
				contentlist: () => store.state.contentList
			}
		},
		props: ['val'],
		methods: {
			save() {

			},
			relate() {
				if (!this.contentlist.length) {
					// 提示
				}
				actions.SetRelateConfig(store, { show: true });
			},
			groupby() {
				if (!this.contentlist.length) {
					// 提示
				}
				actions.SetGroupConfig(store, { show: true });
			},
			reset() {
				// confirm
				let confirmConfig = {
					show: true,
					title: '重置确认',
					msg: '确认重置？重置后将无法恢复',
					type: 'default', // default/primary/success/info/warning/danger
					applyFunc: () => {
						// actions.ResetRelate(store);
						actions.ResetContent(store);
					},
					cancelFunc: '',
					applyStr: '确认',
					cancelStr: '取消'
				};
				actions.confirm(store, confirmConfig);
			},
			saveSql() {
				eventBus.$emit('save');
			},
			clearDispatch() {
				eventBus.$emit('clearDispatch');
			},
			showExpression() {
				eventBus.$emit('showExpression');
			},
			creatReport() {
				if (this.$route.params.id) {
					eventBus.$emit('creatReport');
				} else {
					eventBus.$emit('save', true);
				}
			},
			clearHistory() {
				actions.SetSqlList(store, []);
			}
		}
	};
</script>
<style scoped>
	.toolbar {
		height: 50px;
		border: 1px solid #eee;
		border-radius: 5px;
		margin: 0 0 10px 0;
		padding: 10px;
	}
</style>
