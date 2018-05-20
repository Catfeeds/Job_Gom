<template>
	<div class="toolbar">
		<button class="btn btn-sm btn-primary" @click="save">保存</button>
		<button class="btn btn-sm btn-info" @click="relate">关联</button>
		<button class="btn btn-sm btn-danger" @click="reset">重置</button>
	</div>
</template>
<script>
	export default {
		methods: {
			save() {

			},
			relate() {

			},
			reset() {
				this.$parent.$refs.content.list = [];
			}
		}
	};
</script>
<style scoped>
	.toolbar {
		height: 50px;
		border: 1px solid #eee;
		border-radius: 5px;
		margin-left: 220px;
		padding: 10px;
	}
</style>