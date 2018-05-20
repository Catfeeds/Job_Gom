<template>
    <div class="amp-header">
        <div class="header-logo"><router-link to="/app">gomeplus</router-link></div>
        <div class="header-nav">
            <ul>
            	<li v-if="!userInfo.isRegistered"></li>
                <li v-if="userInfo.isRegistered" :class="{'actived': $route.path === '/app/index'}"><router-link to="/app/index">首页</router-link></li>
                <li v-if="userInfo.isRegistered" :class="{'actived': /^\/app\/account\/|^\/app\/account$/.test($route.path)}"><router-link to="/app/account">我的账户</router-link></li>
                <li v-if="userInfo.isRegistered" :class="{'actived': /^\/app\/put\/|^\/app\/put$/.test($route.path)}"><router-link to="/app/put">投放管理</router-link></li>
                <li v-if="userInfo.isRegistered" :class="{'actived': /^\/app\/report\/|^\/app\/report$/.test($route.path)}"><router-link to="/app/report">数据报表</router-link></li>
				<!--<li :class="{'actived': /^\/app\/register\/|^\/app\/register/.test($route.path)}"><router-link to="/app/register">商家入驻</router-link></li>-->
            </ul>
        </div>
        <div @click="controlLogoutStatus()" class="header-login">
        	<a href="javascript:void(0)" title="" class="login-after">
        		<span class="after-face">
        			<img src="../../assets/img/user-face.png" alt="">
        		</span>
        		<span class="after-username">{{userInfo.name}}</span>
        		<em class="icon icon-arrow"></em>
        	</a>
            <div v-show="logoutStatus" class="dialog dialog-black arrow arrow-black">
                <ul>
                    <li @click="logout()"><a href="javascript:void(0)" title="">退出</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Http from 'http';
import store from 'store';
import router from '../../route.js';
export default {
	name: 'head',
	data() {
		return {
			logoutStatus: false
		};
	},
	computed: {
		userInfo: () => store.state.userInfo
	},
	mounted() {
		document.body.addEventListener('click', (e) => {
			let event = e || window.event;
			let ele = event.target || event.srcElement;
			while (ele) {
				if (ele.classList && [...ele.classList].indexOf('header-login') !== -1) {
					return;
				}
				ele = ele.parentNode;
			}
			this.logoutStatus = false;
		});
	},
	methods: {
		controlLogoutStatus() {
			this.logoutStatus = !this.logoutStatus;
		},
		logout() {
			// 登出
			Http.post('api/logout')
				.then((res) => {
					if (!res.data.iserror) {
						// 跳转到登陆页
						router.push({
							name: 'login'
						});
					}
				});
		}
	}
};
</script>
