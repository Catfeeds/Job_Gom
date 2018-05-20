<template>
	<db-list :list='dblist' ></db-list>
	<toolbar></toolbar>
	<content v-ref:content></content>
</template>
<script>
	import dbList from './db-list';
	import toolbar from './toolbar';
	import content from './content';
	import store from 'store';
	import actions from 'actions';
	import api from '../../api/api.js';

	export default {
		components: { dbList, toolbar, content },
		data() {
			return {

			};
		},
		vuex: {
			getters: {
				dblist: () => store.state.dblist
			}
		},
		ready() {
			api.getDbs().then(res => {
				res = JSON.parse(res.data);
				res.data.result = res.data.result.filter(x => x.name);
				actions.addDbs(store, res.data.result);
				// 读取schema
				res.data.result.forEach(x => {
					let id = x.id;
					// 读取第一个数据库的所有Schema
					api.getSchemas(id).then((res2) => {
						let data = JSON.parse(res2.data);
						actions.addSchemas(store, id, data.data.result);
						// 读取表
						let first = data.data.result[0].schemaid;
						api.getTables(id, first).then(res3 => {
							let data2 = JSON.parse(res3.data);
							actions.addTables(store, id, first, data2.data.result);
						});
					});
				});
			});
		},
		route: {
			data() {

			}
		}
	};
</script>
