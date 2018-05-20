<template>
	<list-item-page type="report" :map="map" route-name="listReport"></list-item-page>
</template>
<script>
import listItemPage from '../common/list-item-page.vue';

export default {
	data() {
		return {
			map: {
				id: 'ID',
				name: 'RN',
				desc: 'RS',
				avatar: 'HU',
				time: 'CD',
				creator: 'CUN',
				parentProjectName: 'TN'
			}
		};
	},
	components: {
		listItemPage
	}
};
</script>
