<template>
	<div>
		<div id="wrapper" :class="{'side-close': !sideNavShow}">
			<nav class="navbar navbar-inverse navbar-fixed-top navbar-custom">
				<logo></logo>
				<nav-right></nav-right>
				<nav-side></nav-side>
			</nav>
			<div id="page-wrapper">
				<div class="container-fluid">
					<router-view></router-view>
				</div>
			</div>
		</div>
		<Alert></Alert>
		<Loading></Loading>
		<Confirm></Confirm>
	</div>
</template>
<style lang="less">
@import "~bootstrap/less/bootstrap.less";
@import "~font-awesome/css/font-awesome.css";
@import "./assets/less/global.less";
@import "./assets/less/list.less";
@import "./assets/less/new.less";
@import "./assets/less/top-area.less";
@import "./assets/less/please-wait.css";
@import "./assets/less/perf-cascade.css";
@import "./assets/less/csp.min.css";
</style>
<script>
import store from 'store';

import Alert from './components/base/alert.vue';
import Loading from './components/base/loading.vue';
import Confirm from './components/base/confirm.vue';
import Logo from './components/common/logo.vue';
import NavRight from './components/common/nav-right.vue';
import NavSilde from './components/common/nav-side.vue';

import Transition from './components/base/transition.vue';
export default {
	name: 'App',
	store: store,
	vuex: {
		getters: {
			sideNavShow: () => store.state.sideNavShow,
			user_info: () => store.state.userInfo
		}
	},
	ready() {
		if (!this.user_info.ID) {
			this.$route.router.go('/login');
		}
	},
	components: {
		'logo': Logo,
		'nav-right': NavRight,
		'nav-side': NavSilde,
		Alert,
		Loading,
		Confirm
	}
};
</script>
