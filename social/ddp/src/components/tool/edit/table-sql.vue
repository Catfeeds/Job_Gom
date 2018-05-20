<template>
	<div class='creatsql'>
		<div class='input'>
			<div class='alert alert-danger' role='alert' v-if='error'>	{{error}}
			</div>
			<textarea id="code"></textarea>
			<div style="margin-top: 10px;">
				<button class='btn btn-primary' @click='query' :disabled='isloading'>{{isloading? 'Loading...': '查询'}}</button>
				<button class='btn btn-danger' v-if='isloading' @click='cancel'>取消</button>
			</div>
		</div>
		<div class='result'>
			<hr>
			<tab :list='tabs' :val.sync='tabval' :iscallback="false"></tab>
			<template v-for="(index, table) in list">
				<div class="table-scroll" v-if="(index + 1) === tabval" @scroll="scroll($event, index)">
					<table class='table table-bordered table-condensed' v-if="table.length">
						<tr class='info'>
							<th></th>
							<th v-for='(key, val) in table[0]'>{{key}}</th>
						</tr>
						<tr v-for='item in table'>
							<td>{{$index+1}}</td>
							<td v-for='(key, val) in item'>{{val}}</td>
						</tr>
						<tr v-show="scrolls[index].isscroll">
							<td colspan="99">正在加载更多...</td>
						</tr>
					</table>
					<p align="center" v-show="!table.length">暂无数据</p>
				</div>
			</template>
			<table class='table table-bordered table-hover' v-if="!tabval" >
				<tr class='info'>
					<th>Date</th>
					<th>SQL</th>
				</tr>
				<tr class="cursor" v-for="item in history | orderBy 'date' -1" @click='setValue(item.sql)'>
					<td>{{getDate(item.date)}}</td>
					<td>{{item.sql}}</td>
				</tr>
				<tr v-show="!history.length">
					<td colspan="2" align="center">
						暂无历史记录
					</td>
				</tr>
			</table>
		</div>
		<expression :show.sync="showExpression"></expression>
	</div>
</template>
<script>
	import tab from '../../base/tab';
	import CodeMirror from 'codemirror/lib/codemirror.js';
	import 'codemirror/lib/codemirror.css';
	import 'codemirror/addon/hint/show-hint.css';
	import 'codemirror/mode/sql/sql';
	import 'codemirror/addon/hint/show-hint.js';
	import 'codemirror/addon/hint/sql-hint.js';

	import store from 'store';
	import actions from 'actions';
	import eventBus from '../../common/event-bus';

	import expression from './expression';

	var editor = {};

	export default {
		components: {tab, expression},
		props: ['info'],
		data() {
			return {
				sql: '',
				list: [],
				isloading: false,
				tabval: 0,
				error: '',
				height: 80,
				showExpression: false
			};
		},
		vuex: {
			getters: {
				history: () => store.state.sqlList,
				dbList: () => store.state.dbList
			}
		},
		ready() {
			// 添加表名/字段提示
			let tablesConfig = {};
			if (this.dbList && this.dbList.length) {
				this.dbList[0].schemas.forEach(x => {
					if (x.tables && x.tables.length) {
						x.tables.forEach(t => {
							if (t.columns && t.columns.length) {
								let columns = t.columns.map(x => x.columnname);
								tablesConfig[t.tablename] = columns;
							}
						});
					}
				});
			}
			let code = document.getElementById('code');
			editor = CodeMirror.fromTextArea(code, {
				lineNumbers: true,
				lineWrapping: true,
				extraKeys: {'Ctrl': 'autocomplete'},
				mode: {name: 'text/x-hive', globalVars: true},
				hintOptions: {
					tables: tablesConfig,
					completeSingle: false
				}
			});
			editor.setSize('auto', 'auto');
			editor.on('keyup', function(cm, e) {
				// 满足自动触发自动联想功能
				// [回车, 上, 下, 退格]
				if (e.keyCode === 27) {

				} else if (editor.state.focused && [13, 40, 38, 8].indexOf(e.keyCode) === -1) {
					editor.showHint();
				}
			});
			// 拖拽
			editor.on('drop', function(cm, e) {
				let text = e.dataTransfer.getData('Sql');
				// editor.setValue(editor.getValue() + text);
				editor.replaceRange(text, CodeMirror.Pos(editor.lastLine()));
				editor.focus();
			});
			eventBus.$off('showExpression');
			// 保存
			eventBus.$on('showExpression', () => {
				this.showExpression = true;
			});

			eventBus.$off('save');
			// 保存
			eventBus.$on('save', (isReport) => {
				// valid
				let sql = editor.getValue();
				let errorMsg = '';
				if (!this.info.DN) {
					errorMsg = '数据名称不允许为空';
					this.$parent.tabVal = 2;
				} else if (!sql) {
					errorMsg = 'SQL不允许为空';
					this.$parent.tabVal = 0;
				}
				if (errorMsg) {
					actions.alert(store, {
						show: true,
						msg: errorMsg,
						type: 'danger',
						dismissible: true,
						delay: 2000
					});
					return;
				}
				let param = {
					id: this.info.ID,
					dataName: this.info.DN,
					dataSynopsis: this.info.DS,
					context: sql,
					json: '',
					schedule: this.info.SC
				};
				// if (param.id) {
				this.$http.put('data', param, {
					emulateJSON: false
				}).then(res => {
					return res.json();
				}).then(res => {
					if (res.iserror === '0') {
						if (isReport) {
							this.info.ID = res.data.result;
							eventBus.$emit('creatReport');
						} else {
							this.$router.go('/data/list');
						}
					} else {
						actions.alert(store, {
							show: true,
							msg: res.msg,
							type: 'danger',
							dismissible: true,
							delay: 2000
						});
					}
				});
				// } else {
				// 	param.schedule = JSON.stringify(param.schedule);
				// 	this.$http.post('data', param, {
				// 		emulateJSON: true
				// 	}).then(res => {
				// 		return res.json();
				// 	}).then(res => {
				// 		if (res.iserror === '0') {
				// 			this.$router.go('/data/list');
				// 		} else {
				// 			actions.alert(store, {
				// 				show: true,
				// 				msg: res.msg,
				// 				type: 'danger',
				// 				dismissible: true,
				// 				delay: 2000
				// 			});
				// 		}
				// 	});
				// }
			});
			eventBus.$off('sql');
			eventBus.$on('sql', (sql) => {
				this.setValue(sql);
			});
		},
		methods: {
			scroll(e, index) {
				let isscroll = this.scrolls[index].isscroll;
				let page = this.scrolls[index].page;
				if (isscroll && page) {
					return false;
				}
				let nScrollHight = e.target.scrollHeight;
				let nScrollTop = e.target.scrollTop;
				if (nScrollHight - e.target.offsetTop - nScrollTop < 800) {
					this.scrolls[index].page++;
					this.scrolls[index].isscroll = true;
					let param = {
						sql: this.sql,
						page: this.scrolls[index].page,
						index: index + 1
					};
					this.$http.post('hivequery', {data: JSON.stringify(param)}
					).then((res) => {
						return res.json();
					}).then((res) => {
						this.scrolls[index].isscroll = false;
						if (res.code !== '200') {
							this.error = res.msg;
						} else {
							let list = res.data.result;
							if (list && list.length) {
								list[0].forEach((x, i) => {
									if (i >= this.list[index].length) {
										this.list[index].push(x);
									}
								});
								// this.list[index] = list[0];
							} else {
								this.scrolls[index].page = 0;
							}
						}
					});
				}
			},
			query() {
				this.sql = editor.getValue();
				if (!this.sql) {
					this.error = '不允许为空';
					return;
				}
				this.error = '';
				this.page = 1;
				this.isloading = true;
				actions.AddSql(store, {
					date: new Date(),
					sql: this.sql
				});
				let param = {
					sql: this.sql,
					page: this.page,
					index: 0
				};
				this.list = [];
				this.tabval = 0;
				this.$http.post('hivequery', {data: JSON.stringify(param)}).then((res) => {
					// 判断是否cancels
					if (this.isloading) {
						this.list = [];
						return res.json();
					}
				}).then((res) => {
					this.isloading = false;
					if (res.code !== '200') {
						this.error = res.msg;
					} else {
						this.list = res.data.result;
						this.tabval = 1;
					}
				});
			},
			cancel() {
				this.isloading = false;
			},
			setValue(sql) {
				editor.setValue(sql);
			},
			getDate(date1) {
				if (typeof date1 === 'string') {
					date1 = new Date(date1);
				}
				let date2 = new Date();
				let date3 = date2.getTime() - date1.getTime();
				// 计算出相差天数
				let days = Math.floor(date3 / (24 * 3600 * 1000));
				// 计算出小时数
				let leave1 = date3 % (24 * 3600 * 1000);
				let hours = Math.floor(leave1 / (3600 * 1000));
				// 计算相差分钟数
				let leave2 = leave1 % (3600 * 1000);
				let minutes = Math.floor(leave2 / (60 * 1000));
				// 计算相差秒数
				let leave3 = leave2 % (60 * 1000);
				let seconds = Math.round(leave3 / 1000);
				let result = '';
				if (days) {
					result += days + '天前';
				} else if (hours) {
					result += hours + '小时前';
				} else if (minutes) {
					result += minutes + '分钟前';
				} else if (seconds) {
					result += seconds + '秒前';
				} else {
					result += '刚刚';
				}
				return result;
			}
		},
		computed: {
			tabs() {
				let arr = ['查询历史'];
				if (this.list.length) {
					this.list.forEach((x, index) => {
						arr.push('查询结果' + (index + 1));
					});
				}
				return arr;
			},
			scrolls() {
				let arr = [];
				if (this.list.length) {
					this.list.forEach((x, index) => {
						arr.push({
							page: 1,
							isscroll: false
						});
					});
				};
				return arr;
			}
		}
	};
</script>
<style>
	.CodeMirror {
		font-family: monospace;
		height: 150px !important;
		color: black;
		border: 1px solid #ddd;
		margin-bottom: 10px;
	}
</style>
<style scoped>

	.creatsql {
		margin: 10px 0 0 0;
	}
	#code {
		/*position: absolute;
		width: 500px;
		height: 80px;
		margin: 0 0 10px 0;*/
	}
	.input {
		margin-top: 20px;
	}
	.result {
		margin-top: 10px;
	}
	ul.nav {
		margin-bottom: 10px;
	}

	.table-scroll {
		overflow: auto;
		max-width: 1200px;
		height: 600px;
	}

	table + p {
		text-align: center;
	}
	tr.cursor {
		cursor: pointer;
	}
	/* BASICS */
</style>
