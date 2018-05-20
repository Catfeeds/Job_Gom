<template>
	<div class="footer">
		<button class="btn btn-info" @click="emitEvent('preview')">预览</button>
		<button class="btn btn-primary" @click="emitEvent('save')">保存</button>
		<!-- <button class="btn btn-primary" @click="emitEvent('save', true)">发布</button> -->
		<button class="btn btn-danger" v-link="{path: '/report'}">放弃</button>
	</div>
</template>
<script>
	import eventBus from '../../common/event-bus';
	export default {
		methods: {
			emitEvent(type, val) {
				eventBus.$emit(type, val);
			}
		}
	};
</script>
<style scoped>
	.footer {
		height: 80px;
		position: fixed;
		bottom: 10px;
		text-align: center;
		width: calc(100% - 180px + 130px);
	}
</style>
