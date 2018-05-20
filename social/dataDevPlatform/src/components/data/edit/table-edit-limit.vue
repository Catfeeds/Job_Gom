<template>
	<form class="form-inline" role="form">
		<div class="limit">
		<div class="form-group">
				<input v-model="startIndex" type="text" class="form-control" placeholder="开始">
			</div>
			<div class="form-group">
				<input v-model="endIndex" type="text" class="form-control" placeholder="结束">
			</div>
		</div>
	</form>
</template>
<script>
	export default {
		data() {
			return {
				startIndex: '',
				endIndex: ''
			};
		}
	};
</script>
<style scoped lang='less'>
	
</style>