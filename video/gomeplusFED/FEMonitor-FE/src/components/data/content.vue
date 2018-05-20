<template>
	<div class="content" @drop="drop"  @dragover.prevent>
		<table-detail v-for="item in list" :value="item.schemaid" :name="item.tablename" :list="item.columns" :x="item.x" :y="item.y"></table-detail>
	</div>
</template>
<script>
	import tableDetail from './table-detail';
	import store from 'store';
	import actions from 'actions';
	import api from '../../api/api.js';

	export default {
		components: { tableDetail },
		data() {
			return {
				list: []
			};
		},
		methods: {
			drop(ev) {
				// getData
				var schemaid = ev.dataTransfer.getData('Value');
				var tablename = ev.dataTransfer.getData('Text');
				var db = ev.dataTransfer.getData('DB');
				// 位置
				var x = ev.offsetX;
				var y = ev.offsetY;
				// 判断是添加表格还是拖动位置
				let temp = this.list.find(x => x.tablename === tablename);
				if (temp) {
					temp.x = x;
					temp.y = y;
				} else {
					// 需要判断是否已存在
					api.getColumns(db, schemaid, tablename).then(res => {
						let data = JSON.parse(res.data);
						this.list.push({
							tablename: tablename,
							schemaid: schemaid,
							x: x,
							y: y,
							columns: data.data.result
						});
						actions.addColumns(store, db, schemaid, tablename, data.data.result);
					});
				}
			}
		}
	};
</script>
<style scoped>
	.content {
		position: relative;
		min-height: 500px;
		border: 1px solid #eee;
		border-radius: 5px;
		background: #eee;
		margin: 10px 0 0 220px;
		padding: 10px;
	}
</style>