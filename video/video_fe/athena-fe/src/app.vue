<template>
    <div class="wrapper">
        <m-header></m-header>
        <el-row class="container">
            <el-col :span="4" class="menu">
                <m-nav></m-nav>
            </el-col>
            <el-col :span="20" class="content">
                <router-view keep-alive></router-view>
            </el-col>
        </el-row>
        <Loading></Loading>
    </div>
</template>
<style>
@import "./assets/less/please-wait.css";
@import "./assets/less/base.css";
@import "./assets/less/csp.min.css";
</style>
<script>
import store from 'store';

import Logo from './components/common/logo.vue';
import Nav from './components/common/nav.vue';
import Loading from './components/base/loading.vue';
export default {
	name: 'App',
	created() {
		if (!store.state.user_info) {
			this.$router.replace('login');
		}
	},
    components: {
	    'm-header': Logo,
        'm-nav': Nav,
        Loading
    }
};
</script>
