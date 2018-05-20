<template>
	<list-item-page type="task" :map="map" :api="api" :tablink="tablink" route-name="listTask"></list-item-page>
</template>
<script>
import listItemPage from '../common/list-item-page.vue';
import {getTasksCount, getTasksPagination, deleteTasks} from '../../api/task';

export default {
	data() {
		return {
			map: {
				id: '_id',
				name: 'url',
				desc: 'desc',
				userInfo: 'user',
				updatetime: '_updatedAt',
				avatar: ''
			},
			tablink: {
				key: 'groupBy',
				currentType: 'all',
				list: [{
					tab: 'all',
					msg: '所有'

				}, {
					tab: 'mine',
					msg: '我的'
				}, /* {
					tab: 'anonymous',
					msg: '匿名'
				},*/ {
					tab: 'schedule',
					msg: '定期执行'
				}],
				onChange: () => {}
			},
			api: {
				count: {
					fn: getTasksCount,
					param: {
						'filter': ''
					}
				},
				pagination: {
					fn: async (param) => {
						if (param.orderBy && param.sortBy) {
							param.sort = {};
							param.sort[this.map[param.sortBy]] = param.orderBy === 'asc' ? 1 : -1;
							delete param.orderBy;
							delete param.sortBy;
						}
						return await getTasksPagination(param);
					},
					param: {
						'select': 'url deviceType user _updatedAt',
						'sort': {'_updatedAt': -1},
						'limit': 10,
						'page': 1,
						'filter': ''
					}
				},
				delete: {
					fn: deleteTasks
				}
			}
		};
	},
	components: {
		listItemPage
	}
};
</script>
