<template>
	<v-pagination :pagination-config.sync="pagconfig" :index="index"></v-pagination>
	<!--<pagination :pagconfig.sync="paconfig" :index="index"></pagination>-->
</template>
<style scoped>
	table{
		border: 1px solid #ddd;
	}
</style>
<script>
	export default {
		name: 'pagination',
		data() {
			return {};
		},
		props: ['pagconfig', 'index', 'formindex'],
		ready() {
			var _this = this;
			window.setconfig = function(params) {
				_this.pagconfig = params;
			};
			this.pagconfig.onChange = function() {
				_this.$dispatch('pagination-config', _this.pagconfig, _this.index || 0, _this.formindex);
				console.log('changed', 66666666);
			};
		}
	};
</script>
