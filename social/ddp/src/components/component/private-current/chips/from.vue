<template>
	<table class="table table-striped table-hover table-condensed">
		<tr v-for="item in form">
			<th track-by="$index" v-for="val in form[$index].value">{{val}}</th>
		</tr>
	</table>
	<pagination :pagconfig.sync="paconfig" :index="index" :formindex="formindex"></pagination>
</template>
<style scoped>
	table{
		border: 1px solid #ddd;
	}
</style>
<script>
	import pagination from '../../common/pagination.vue';
	export default {
		name: 'form',
		props: [ 'form', 'paconfig', 'index', 'formindex' ],
		components: {
			pagination
		},
		data() {
			return {

			};
		},
		ready() {
		}
	};
</script>
