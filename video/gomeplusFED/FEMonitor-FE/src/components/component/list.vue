<template>
	<list-item-page type="component" :map="map" :api="api" :tabLink="tabLink" route-name="listComponent"></list-item-page>
</template>
<script>
import listItemPage from '../common/list-item-page.vue';
import {getConfsCount, getConfsList} from '../../api/component';

export default {
	data() {
		return {
			map: {
				id: 'name',
				name: 'name'
			},
			tabLink: {
				key: 'groupBy',
				currentType: 'mine',
				list: [{
					tab: 'mine',
					msg: '我的'
				}, {
					tab: 'all',
					msg: '所有'
				}, {
					tab: 'recent',
					msg: '近期打开'
				}, {
					tab: 'deleted',
					msg: '已删除'
				}],
				onChange: () => {}
			},
			api: {
				count: {
					fn: getConfsCount,
					param: {
					}
				},
				pagination: {
					fn: getConfsList,
					param: {
					}
				}
			}
		};
	},
	components: {
		listItemPage
	}
};
</script>
