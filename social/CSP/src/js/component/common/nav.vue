<template>
	<div class="wrap-left">
		<div class="menu">
			<a href="javascript:void(0)" v-link="{name: 'AccountManage'}" v-show="user_info.type == '0' || user_info.type == '1'">账号管理</a>
			<a href="javascript:void(0)" v-link="{name: 'CommonMsg'}">常用语配置</a>
			<a href="javascript:void(0)" v-link="{name: 'Password'}" v-show="user_info.type == '0'">修改密码</a>
			<a href="javascript:void(0)" v-link="{name: 'ChatRecord'}">查询聊天记录</a>
			<!-- <a href="javascript:void(0)" v-link="{name: 'Configuration'}">配置管理</a> -->
			<a href="javascript:void(0)" target="_blank" @click="enterIm()">进入IM</a>
		</div>
	</div>
</template>
<script>
import store from 'store';
import actions from 'actions';
export default {
	name: 'nav',
	vuex: {
		getters: {
		    user_info() {
		        return store.state.user_info
		    }
		},
		actions
	},
	ready(){
		const _self = this;
	},
	methods:{
		enterIm(){
			const _self = this;
			window.open('#!/im','美信客服平台IM');
		}
	}
}
</script>