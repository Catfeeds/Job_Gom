<template>
	<div class="checkboxGroup">
		<div class="checkbox"  v-for="item in configc" style="display: inline-block;margin:0 14px 0 0;">
			<label style="padding-bottom: 0;"><input name="checkBoxConfigArr" type="checkbox" value="item" @click="componentReplyFunc($event,item)">{{item.name}}</label>
		</div>
	</div>
</template>
<style scoped>
</style>
<script>
	export default {
		name: 'checkbox',
		components: {
		},
		props: ['configc', 'componentreply'],
		ready() {},
		methods: {
			componentReplyFunc(e, item) {
				let dom = e.target;
				if (dom.checked) {
					this.componentreply.checkBox.push(item);
				} else {
					this.componentreply.checkBox.$remove(item);
				}
				this.$dispatch('componentreplyC', 'changed');
			}
		}
	};
</script>
