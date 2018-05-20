<template>
	<list-item-page type="data" :map="map" route-name="listData"></list-item-page>
</template>
<script>
import listItemPage from '../common/list-item-page.vue';

export default {
	data() {
		return {
			map: {
				id: 'ID',
				name: 'DN',
				desc: 'DS',
				avatar: ''
			}
		};
	},
	components: {
		listItemPage
	}
};
</script>
