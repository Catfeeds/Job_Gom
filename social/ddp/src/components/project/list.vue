<template>
	<list-item-page type="project" :map="map" route-name="listProject"></list-item-page>
</template>
<script>
import listItemPage from '../common/list-item-page.vue';

export default {
	data() {
		return {
			map: {
				id: 'ID',
				name: 'PN',
				desc: 'PS',
				avatar: 'HU'
			}
		};
	},
	components: {
		listItemPage
	}
};
</script>
