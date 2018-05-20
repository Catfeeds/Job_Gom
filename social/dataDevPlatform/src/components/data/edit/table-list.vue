<template>
	<div class='table-list'>
		<div class="btn-group" role="group" aria-label="..." style="margin-bottom: 10px;">
			<button v-for='item in list' :class="{ 'active' : item.id === db }" @click="dbswitch(item.id)" type="button" class="btn btn-primary">{{ item.name }}</button>
		</div>
		<accordion :one-at-atime='false' class="accordion-schema">
			<panel
			v-for='(index,item) in schemalist'
			@click="getTable(item)"
			:header='item.schemaname'
			>
				<!--<ul v-if='item.tables'>
					<li
					v-for='table in item.tables'
					@click="getColumns(item, table)"
					:schemaid="item.schemaid"
					:title="table.tablename"
					@dragstart='dragstart($event, item.schemaid, item.schemaname, table)'
					draggable='true'>-->
						<accordion :one-at-atime='false' class="accordion-table">
						<panel
						v-for="table in item.tables"
						@click="getColumns(item, table)"
						>
							<span
							slot="header"
							draggable='true'
							:title="table.tablename+table.tablecomment"
							@dragstart='dragstart($event, item.schemaid, item.schemaname, table)'
							>
								{{table.tablename}}
							</span>
							<template v-for="column in table.columns">
								<ul v-if="table.columns" >
									<li
									:title="column.columnname + ' (' + column.columntype +') - ' + column.columncomment"
									draggable='true'
									@dragstart='dragstart($event, item.schemaid, item.schemaname, table, column)'
									>{{column.columnname}} ({{column.columntype}}) - {{column.columncomment}}</li>
								</ul>
							</template>
						</panel>
						</accordion>

						<!--<ul v-if="table.columns" v-for="column in table.columns">
							<li>{{column.columnname}}({{columntype}})</li>
						</ul>-->
					<!--</li>
				</ul>-->
			</panel>
		</accordion>
	</div>
</template>
<script>
	import { accordion, panel } from 'vue-strap';
	import store from 'store';
	import actions from 'actions';
	import api from '../../../api/api.js';

	export default {
		components: { accordion, panel },
		props: [ 'list' ],
		data() {
			return {
				db: 4
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
				actions.ResetContent(store);
			},
			getTable(item) {
				if (!item.tables || !item.tables.length) {
					api.getTables(this.db, item.schemaid).then(res2 => {
						let data2 = JSON.parse(res2.data);
						actions.addTables(store, this.db, item.schemaid, data2.data.result);
					});
				}
			},
			getColumns(item, table) {
				let dbid = this.db;
				api.getColumns(dbid, item.schemaid, table.tablename).then(res => {
					return res.json();
				}).then(res => {
					// let data = JSON.parse(res.data);
					// let data = res.data;
					actions.addColumns(store, dbid, item.schemaid, table.tablename, res.data.result);
				});
			},
			dragstart(ev, schemaid, schemaname, table, column) {
				// setData
				ev.dataTransfer.setData('schemaid', schemaid);
				ev.dataTransfer.setData('schemaname', schemaname);
				ev.dataTransfer.setData('tablename', table.tablename);
				ev.dataTransfer.setData('tablecomment', table.tablecomment);
				ev.dataTransfer.setData('DB', this.db);
				// Table-SQL
				if (column && column.columnname) {
					ev.dataTransfer.setData('Sql', `${column.columnname}`);
				} else {
					ev.dataTransfer.setData('Sql', `SELECT * FROM ${schemaname}.${table.tablename}`);
				}
				ev.dataTransfer.setDragImage(ev.currentTarget, 0, 0);
			}
		}
	};
</script>
<style>
	/*.accordion-schema>.panel {
		border-color: #337AB7 !important;
	}
	.accordion-schema>.panel>.panel-heading {
		background-color: #337AB7 !important;
	}*/
	.accordion-table>.panel {
		border-color: #D9EDF7 !important;
	}
	.accordion-table>.panel>.panel-heading {
		background-color: #D9EDF7 !important;
	}
</style>
<style scoped>
	.table-list {
		border-right: 5px sloid #000;
		height: 100%;
	}

	.panel-group {
		height: calc(100% - 50px - 10px - 34px - 50px);
		overflow-y: auto;
	}

	ul {
		padding: 0;
	}

	ul>li {
		list-style: none;
		height: 20px;
		line-height: 20px;
		text-align: left;
		background-color: #D9EDF7;
		padding: 0 0 0 10px;
		margin: 5px 0;
		cursor: pointer;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
		border-radius: 2px;
	}
</style>
