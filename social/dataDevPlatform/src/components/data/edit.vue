<template>
	<div class="data-edit"  @mousemove="move" @mouseup="ismousedown = false">
		<div class="left" :style="{'width': (200 + left - default) + 'px'}">
			<table-list :list='dblist' ></table-list>
		</div>
		<div class="drag" :style="{'margin-left': left + 'px'}"  @mousedown="ismousedown = true">
		</div>
		<div class="right" :style="{'margin-left': 220 + left - default + 'px'}">
			<tab :list="tabList" :val.sync="tabVal"></tab>
			<toolbar :val.sync="tabVal"></toolbar>
			<!--<content v-if="false"></content> -->
			<table-sql :info.sync="info" v-show="tabVal === 0"></table-sql>
			<dispatch :info.sync="info" v-if="tabVal === 1"></dispatch>
			<edit-detail :info.sync="info" v-if="tabVal === 2"></edit-detail>
		</div>
		<table-relate></table-relate>
		<table-edit></table-edit>
		<report :show.sync="showreport" :dataid="info.ID"></report>
		<!-- <table-group></table-group> -->
		<!-- <table-save :show.sync="show"></table-save> -->
	</div>
</template>
<script>
	import tableRelate from './edit/table-relate';
	import tableEdit from './edit/table-edit';
	import tableGroup from './edit/table-group';
	import tableSave from './edit/table-save';
	import tableList from './edit/table-list';
	import toolbar from './edit/toolbar';
	// import content from './edit/content';
	import tableSql from './edit/table-sql';
	import tab from '../base/tab.vue';
	import store from 'store';
	import actions from 'actions';
	import api from '../../api/api.js';
	import eventBus from '../common/event-bus';
	import editDetail from './edit/editDetail';
	import dispatch from './edit/dispatch';
	import report from './edit/report';
	import $ from 'jquery';

	export default {
		components: {tableList, editDetail, toolbar, tableSave, tableRelate, tableEdit, tableGroup, tab, tableSql, dispatch, report},
		data() {
			return {
				show: false,
				tabList: ['SQL>', '调度计划>', '基本信息'],
				tabVal: 0,
				// dataForm: {
				// 	dataName: '',
				// 	dataSynopsis: '',
				// 	did: '',
				// 	sql: '',
				// 	query: {}
				// },
				info: {
					ID: 0,
					DN: '',
					DF: '',
					DS: '',
					CD: new Date(),
					CU: 0,
					CUN: '',
					AR: '',
					SC: {
						scheduledate: '',
						isrecurring: false,
						isactivity: false,
						period: 0,
						periodtype: ''
					}
				},
				default: 205,
				left: 205,
				ismousedown: false,
				showreport: false
			};
		},
		vuex: {
			getters: {
				dblist: () => store.state.dbList,
				funlist: () => store.state.funList,
				userInfo: () => store.state.userInfo
			}
		},
		methods: {
			move(e) {
				if (!this.ismousedown) {
					return false;
				}
				let distance = 75;
				let x = e.x;
				let result = x - distance;
				if (result > this.default) {
					this.left = result;
				}
			}
		},
		ready() {
			// let _drag = $('.drag'),
			// 	_left = $('.left'),
			// 	_right = $('.right');
			// _drag.mousedown(function() {

			// });
			eventBus.$on('creatReport', () => {
				this.showreport = true;
			});
		},
		route: {
			data() {
				// actions.ResetContent(store);
				actions.controlSideNav(store, false);
				// 获取数据基本信息
				if (this.$route.params.id) {
					this.$http.get(`dataDetail?data_id=${this.$route.params.id}`).then(res => {
						return res.json();
					}).then(res => {
						if (res.iserror === '0') {
							// if (res.data.result.SC) {
							// 	res.data.result.SC = JSON.parse(res.data.result.SC);
							// }
							let temp = res.data.result;
							this.$set('info', temp);
							eventBus.$emit('sql', temp.CX);
						}
					});
				}

				// 获取数据库列表
				if (!this.dblist.length) {
					api.getDbs().then(res => {
						return res.json();
					}).then(res => {
						// res = JSON.parse(res.data);
						// res = res.data;
						res.data.result = res.data.result.filter(x => x.name);
						actions.addDbs(store, res.data.result);
						// 读取schema
						res.data.result.forEach(x => {
							let id = x.id;
							let schemaid = 0;
							// 读取第一个数据库的所有Schema
							api.getSchemas(id).then(res => {
								return res.json();
							}).then((res2) => {
								// let data = JSON.parse(res2.data);
								// let data = res2.data;
								actions.addSchemas(store, id, res2.data.result);
								// 读取表
								schemaid = res2.data.result[0].schemaid;
								return api.getTables(id, schemaid);
							}).then(res3 => {
								// let data2 = JSON.parse(res3.data);
								// let data2 = res3.data;
								actions.addTables(store, id, schemaid, res3.data.result);
							});
						});
					});
				}
				// 获取函数列表
				if (!this.funlist.length) {
					this.$http.get('hive/funlist').then(res => {
						return res.json();
					}).then(res => {
						if (res.iserror === '0') {
							actions.SetFunList(store, res.data.result);
						}
					});
				}
				// 获取表达式列表
				if (!this.funlist.length) {
					this.$http.get('hive/explist').then(res => {
						return res.json();
					}).then(res => {
						if (res.iserror === '0') {
							actions.SetExpList(store, res.data.result);
						}
					});
				}
			}
		}
	};
</script>
<style scoped>
	.left {
		/*width: 200px;*/
		margin-right: 20px;
		float: left;
		position: fixed;
		height: 100%;
	}
	.drag {
		width: 5px;
		height: 100%;
		position: fixed;
		background-color: #eee;
		cursor: ew-resize;
	}
	/*.clear{
		clear:both;
		height: 0;
		line-height: 0;
		font-size: 0
	}*/
	.right {
		/*margin-left: 220px;*/
	}
	.data-edit {
		height: 100%;
	}

</style>
