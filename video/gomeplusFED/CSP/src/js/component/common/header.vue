<template>
	<div class="header">
		<div class="wrap-box">
			<div class="fl">欢迎您：{{user_info.nick_name}}<a href="javascript:void(0);" class="btn-header" @click="logout()">注销</a></div>
			<div class="fr">
				<a href="javascript:void(0)" v-link="{path: '/dashboard'}">
					<img src="/dist/img/ui/logo.png">					
				</a>
			</div>
		</div>
	</div>
</template>
<script>
import store from 'store';
import utils from 'utils';
export default {
	name: 'header',
	data() {
		return {

		}
	},
	vuex: {
		getters: {
			user_info() {
				return store.state.user_info;
			}
		}
	},
	methods: {
		logout() {
			this.$http({
				url: 'operator/logout?operator_id=' + this.user_info.operator_id,
				method: 'get'
			}).then((res) => {
				const result = res.data;
				if (result.result) {
					utils.delCookie('user_info');
					this.$route.router.go('/login');
				}
			})
		}
	}
}
</script>