<template>
	<div class="crumbs">
		<a v-for="(item, index) in config.data" :href="item.link">
			<span :class="{'crumbs-acitved': index === config.data.length - 1}">{{item.msg}}</span>
			<em v-show="index !== config.data.length - 1">{{config.sep || '>'}}</em>
		</a>
	</div>
</template>
<script>
export default {
	name: 'breadcrumb',
	props: ['config']
};
</script>
