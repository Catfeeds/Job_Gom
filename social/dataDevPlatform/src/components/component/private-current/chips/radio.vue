<template>
	<div class="radioGroup">
		<div class="radio" v-for="item in config" style="display: inline-block;margin:0 14px 0 0">
			<label style="padding-bottom:0;">
				<input name="configArr" type="radio" value="item" @click="componentReplyFunc(item)">{{item.name}}
			</label>
		</div>
	</div>
</template>
<style scoped>
</style>
<script>
	export default {
		name: 'radio',
		components: {
		},
		props: ['config', 'componentreply'],
		ready() {
			var input = document.querySelector('.radioGroup input');
			input.setAttribute('checked', 'checked');
		},
		methods: {
			componentReplyFunc(item) {
				this.componentreply.radio = item;
				this.$dispatch('componentreplyC', 'changed');
			}
		}
	};
</script>
