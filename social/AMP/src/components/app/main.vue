<template>
	<div>
		<m-head></m-head>
		<router-view></router-view>
	</div>
</template>
<script>
import Head from '../common/head.vue';
export default {
	name: 'app-main',
	components: {
		'm-head': Head
	}
};
</script>
