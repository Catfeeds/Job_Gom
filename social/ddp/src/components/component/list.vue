<template>
	<list-item-page type="component" :map="map" route-name="listComponent"></list-item-page>
</template>
<script>
import listItemPage from '../common/list-item-page.vue';

export default {
	data() {
		return {
			map: {
				id: 'id',
				name: 'name',
				desc: 'description',
				avatar: ''
			}
		};
	},
	components: {
		listItemPage
	}
};
</script>
