<template>
	<p class="title">{{ item.tablecomment + item.schemaname + "." + item.tablename}}
		<input type="text" class="form-control" placeholder="别名" @input="updateTableAlias" :value="item.alias">
		<label class="checkbox-inline">
			<input type="checkbox"> distinct
		</label>
	</p>
	<table class="table table-condensed table-bordered table-hover " >
		<tr>
			<th></th>
			<th>字段名称</th>
			<th>字段类型</th>
			<th>字段描述</th>
			<!-- <th>筛选条件</th>
			<th>筛选值</th> -->
			<th>是否返回该字段</th>
			<th>别名</th>
		</tr>
		<tr v-for="(index, column) in item.columns">
			<td>{{column.ordinalposition}}</td>
			<td>{{column.columnname}}</td>
			<td>{{column.columntype}}</td>
			<td>{{column.columncomment}}</td>
			<!-- <td>=</td>
			<td><input type="text" @input="updateValue(index, $event)" :value="column.value" class="form-control" name=""></td> -->
			<td>
				<input type="checkbox"  @click="updateIsReturn(index, !column.isreturn)" :checked="column.isreturn" name=""></td>
				<td><input type="text" class="form-control" :disabled="!column.isreturn" style="width: 100px;"  @input="updateAlias(index, $event)" :value="column.alias" name=""></td>
			</tr>
		</table>
	</template>
	<script>
		import store from 'store';
		import actions from 'actions';

		export default {
			props: ['item'],
			computed: {
				tablename() {
					return this.item.schemaname.concat('.', this.item.tablename);
				}
			},
			methods: {
				updateIsReturn(index, val) {
					actions.SetContentCoulumn(store, this.tablename, index, {isreturn: val});
				},
				updateAlias(index, e) {
					actions.SetContentCoulumn(store, this.tablename, index, {alias: e.target.value});
				},
				updateValue(index, e) {
					actions.SetContentCoulumn(store, this.tablename, index, {value: e.target.value});
				},
				updateTableAlias(e) {
					actions.SetContent(store, this.tablename, {alias: e.target.value});
				}
			}
		};
	</script>
	<style>
		p.title {
			text-align: center;
		}
		p.title > input {
			width: auto;
			display: inline;
		}
	</style>