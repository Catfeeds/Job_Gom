<template>
	<!--<form id="search">
    	Search <input name="query" v-model="searchQuery">
  	</form>-->
  	<demo-grid
    :data="form.gridData"
    :columns="form.gridColumns"
    :filter-key.sync="searchQuery"
	:formcontentprop="formcontentprop">
  	</demo-grid>
	<pagination :pagconfig.sync="paconfig" :index="index"></pagination>
</template>
<script>
import actions from 'actions';
import store from 'store';
import demoGrid from './newFormContent.vue';
import pagination from '../../common/pagination.vue';
export default {
	name: 'gridf',
	components: {
		demoGrid,
		pagination
	},
	props: ['form', 'paconfig', 'index', 'formcontentprop'],
	data() {
		return {
			searchQuery: '',
			gridColumns: ['name', 'power'],
			gridData: [
				{ name: 'Chuck Norris', power: Infinity, data: [{ value: [ 'ads2_im_event_mess_id', 'ads2_im_event_mess_click_uv' ] }, { value: [ '14654bb1-6a5f-4a3b-816d-c858f406d50e', '5' ] }],
				pconfig: {
					currentPage: 1,
					itemsPerPage: 10,
					pagesLength: 10,
					totalItems: 10,
					onChange() {}
				} },
				{ name: 'Bruce Lee', power: 9000, data: [{ value: [ 'ads2_im_event_mess_id', '99' ] }, { value: [ '14654bb1-6a5f-4a3b-816d-c858f406d50e', '5' ] }],
				pconfig: {
					currentPage: 1,
					itemsPerPage: 10,
					pagesLength: 10,
					totalItems: 10,
					onChange() {}
				}, c_id: 2 },
				{ name: 'Jackie Chan', power: 7000, data: [{ value: [ 'ads2_im_event_mess_id', 'ads2_im_event_mess_click_uv' ] }, { value: [ '10101', '5' ] }],
				pconfig: {
					currentPage: 1,
					itemsPerPage: 10,
					pagesLength: 10,
					totalItems: 10,
					onChange() {}
				} },
				{ name: 'Jet Li', power: 8000, data: [{ value: [ 'ads2_im_event_mess_id', '555' ] }, { value: [ '14654bb1-6a5f-4a3b-816d-c858f406d50e', '5' ] }],
				pconfig: {
					currentPage: 1,
					itemsPerPage: 10,
					pagesLength: 10,
					totalItems: 10,
					onChange() {}
				} }
			]
		};
	}
};
</script>
<style>
#search {
  margin-bottom: 10px;
}
</style>
