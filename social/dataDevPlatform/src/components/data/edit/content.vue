<template>
	<div class="content" @drop="drop"  @dragover.prevent>
		<div :style="{transform: 'scale(' + scale.val / 100 + ')'}">
			<table-detail v-for="item in contentlist" :obj="item"></table-detail>
			<line :list="lineList"></line>
		</div>
		<scale :transform="scale.transform" :max="scale.max" :min="scale.min" :val.sync="scale.val"></scale>
	</div>
</template>
<script>
	import tableDetail from './table-detail';
	import line from '../../base/line';
	import scale from '../../base/scale';
	import store from 'store';
	import actions from 'actions';
	import api from '../../../api/api.js';

	export default {
		components: { tableDetail, line, scale },
		data() {
			return {
				scale: {
					transform: 0,
					min: 10,
					max: 200,
					val: 100
				}
			};
		},
		vuex: {
			getters: {
				dblist: () => store.state.dbList,
				contentlist: () => store.state.contentList,
				relatelist: () => store.state.relateList
			}
		},
		computed: {
			lineList() {
				let arr = [];
				if (this.relatelist.length) {
					this.relatelist.forEach(x => {
						let a = this.contentlist.find(l => l.schemaname.concat('.', l.tablename) === x.a);
						let b = this.contentlist.find(l => l.schemaname.concat('.', l.tablename) === x.b);
						arr.push({
							x1: a.x,
							y1: a.y,
							x2: b.x,
							y2: b.y
						});
					});
				}
				return arr;
			}
		},
		methods: {
			drop(ev) {
				// getData
				var schemaid = ev.dataTransfer.getData('schemaid');
				var schemaname = ev.dataTransfer.getData('schemaname');
				var tablename = ev.dataTransfer.getData('tablename');
				var tablecomment = ev.dataTransfer.getData('tablecomment');
				var dbid = ev.dataTransfer.getData('DB');
				// 位置
				var x = ev.offsetX;
				var y = ev.offsetY;
				// 判断是添加表格还是拖动位置
				let tablename2 = schemaname.concat('.', tablename);
				let temp = this.contentlist.find(x => x.schemaname.concat('.', x.tablename) === tablename2);
				if (temp) {
					actions.SetContent(store, tablename2, { x: x, y: y });
				} else {
					// 保存list的对象
					let obj = {
						tablename: tablename,
						tablecomment: tablecomment,
						schemaid: schemaid,
						schemaname: schemaname,
						dbid: dbid,
						x: x,
						y: y,
						alias: '', // 别名
						columns: []
					};

					// 判断是否已存在
					let db = this.dblist.find(x => x.id === parseInt(dbid));
					let model = db.schemas.find(x => x.schemaid === schemaid || x.schemaid === parseInt(schemaid));
					let table = model.tables.find(x => x.tablename === tablename);
					if (table.columns) {
						// 去除引用
						table.columns.forEach(x => {
							let temp = {};
							for (let item in x) {
								temp[item] = x[item];
							}
							obj.columns.push(temp);
						});
						// obj.columns = table.columns;
						this.add(obj);
					} else {
						api.getColumns(dbid, schemaid, tablename).then(res => {
							return res.json();
						}).then(res => {
							// let data = JSON.parse(res.data);
							// let data = res.data;
							actions.addColumns(store, dbid, schemaid, tablename, res.data.result);
							obj.columns = res.data.result;
							this.add(obj);
						});
					}
				}
			},
			add(obj) {
				// 添加默认字段
				obj.isedit = false;
				if (obj.columns && obj.columns.length) {
					obj.columns.map(x => {
						x.isreturn = true;
						x.alias = '';
						x.value = '';
					});
				}
				actions.AddContent(store, obj);
				// 动态修改高度
				// this.$nextTick(() => {
				// 	var ul = document.querySelectorAll('.content>ul');
				// 	let offsetHeight = ul[ul.length - 1].offsetHeight;
				// 	if (obj.y + offsetHeight > this.height) {
				// 		this.height = obj.y + offsetHeight + 50;
				// 	};
				// });
			},
			reset() {
				actions.ResetContent(store);
			}
		},
		watch: {
			'scale.val': function(val) {
				// this.$nextTick(() => {
				// 	this.contentlist.map((x, index) => {
				// 		let _li = document.querySelectorAll('.content>ul')[index];
				// 		x.y = _li.offsetTop;
				// 		x.x = _li.offsetLeft;
				// 	});
				// });
			}
		}
	};
</script>
<style scoped>
	.content {
		position: fixed;
		/*height: 100%;*/
		/*min-height: 450px;*/
		width: calc(100% - 320px);
		height: calc(100% - 200px);
		border: 1px solid #eee;
		border-radius: 5px;
		background: #eee;
		margin: 10px 0 0 0;
		padding: 10px;
		overflow: auto; 
	}

	.scale {
		position: absolute;
		right: 0px;
		top: 10px;
	}
</style>