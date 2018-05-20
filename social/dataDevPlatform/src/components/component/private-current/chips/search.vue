<template>
	<div class="input-group">
		<span class="input-group-addon">🔍</span>
		<input type="text" class="form-control" placeholder="请输入搜索内容...">
	</div>
</template>
<style scoped>
	.input-group{
		max-width: 300px;
	}
</style>
<script>
	export default {
		name: 'dropdown',
		props: [],
		components: {},
		data() {
			return {
				showSearch: true,
				items: ['666', '777', '888']
			};
		},
		ready() {},
		methods: {}
	};
</script>
