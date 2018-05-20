<template>
	<div class='table-list'>
		<div class="btn-group" role="group" aria-label="..." style="margin-bottom: 10px;">
		  <button v-for='item in list' :class="{ 'btn-check' : item.id === db }" @click="dbswitch(item.id)" type="button" class="btn btn-default">{{ item.name }}</button>
		</div>
		<accordion :one-at-atime='true' type='info'>
			<panel v-for='(index,item) in schemalist' @click="getTable(item)" :header='item.schemaname' :is-open='!index' type='primary'>
				<ul v-if='item.tables'>
					<li v-for='table in item.tables' :schemaid="item.schemaid" :title="table.tablename" @dragstart='dragstart($event, item.schemaid, table)' draggable='true'>{{ table.tablename }}</li>
				</ul>
			</panel>
		</accordion>
	</div>
</template>
<script>
	import { accordion, panel } from 'vue-strap';
	import store from 'store';
	import actions from 'actions';
	import api from '../../api/api.js';

	export default {
		components: { accordion, panel },
		props: [ 'list' ],
		data() {
			return {
				db: 3
			};
		},
		computed: {
			schemalist() {
				let model = this.list.find(x => x.id === this.db && x.schemas);
				return model ? model.schemas : [];
			}
		},
		methods: {
			dbswitch(id) {
				this.db = id;
				this.$parent.$refs.content.list = [];
			},
			getTable(item) {
				if (!item.tables) {
					api.getTables(this.db, item.schemaid).then(res2 => {
						let data2 = JSON.parse(res2.data);
						actions.addTables(store, this.db, item.schemaid, data2.data.result);
					});
				}
			},
			dragstart(ev, schemaid, table) {
				// setData
				ev.dataTransfer.setData('Value', schemaid);
				ev.dataTransfer.setData('Text', table.tablename);
				ev.dataTransfer.setData('DB', this.db);
				ev.dataTransfer.setDragImage(ev.currentTarget, 0, 0);
			}
		}
	};
</script>
<style scoped>
	.table-list {
		width: 200px;
		border-right: 5px sloid #000;
		margin-right: 20px;
		float: left;
	}

	.btn-check{
		background: #93C7DE;
	}

	ul {
		padding: 0;
	}

	ul>li {
		list-style: none;
		height: 20px;
		width: 150px;
		line-height: 20px;
		text-align: left;
		background-color: #eee;
		padding: 0 0 0 10px;
		margin: 5px 0;
		cursor: move;
		white-space:nowrap; 
		overflow:hidden; 
		text-overflow:ellipsis;
	}
</style>