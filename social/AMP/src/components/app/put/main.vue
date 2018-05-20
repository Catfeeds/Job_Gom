<template>
    <div class="amp-content">
    	<m-nav :config="navMenu"></m-nav>
	    <div class="content-main">
	    	<div class="amp-account" :class="{'amp-unit': /unit/.test($route.path), 'amp-originality': /idea/.test($route.path)}">
				<router-view></router-view>
				<m-drawer></m-drawer>
			</div>
	    </div>
    </div>
</template>
<script>
import Drawer from './drawer.vue';
import Nav from '../../common/nav.vue';
export default {
	name: 'app-plan-main',
	data() {
		return {
			navMenu: [{
				msg: '投放计划',
				link: 'javascript:void(0)',
				icon: 'icon-account',
				checked: true,
				sub: []
			}]
		};
	},
	components: {
		'm-nav': Nav,
		'm-drawer': Drawer
	}
};
</script>
