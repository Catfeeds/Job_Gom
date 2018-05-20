<template>
	<m-header></m-header>
	<div class="wrap-box clearfix">
		<m-nav></m-nav>
		<div class="wrap-right clearfix">
			<div class="welcome" v-show="$route.path === '/dashboard'">欢迎使用国美+客服平台</div>
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
import Header from '../common/header.vue';
import Nav from '../common/nav.vue';

export default {
	name: 'dashboard',
	data() {
		return {

		};
	},
	components: {
		'm-header': Header,
		'm-nav': Nav
	}
};
</script>