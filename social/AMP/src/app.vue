<template>
	<div>
		<router-view></router-view>
		<m-loading></m-loading>
	</div>
</template>
<script>
import Loading from './components/common/loading.vue';
export default {
	name: 'app',
	components: {
		'm-loading': Loading
	}
};
</script>
<style lang="less">
@import './assets/css/public.less';
@import './assets/css/amp.less';
@import './assets/css/transition.less';
</style>
