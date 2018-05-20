<template>
    <div class="amp-content">
    	<m-nav :config="navMenu"></m-nav>
	    <div class="content-main">
	    	<div class="amp-account">
				<router-view></router-view>
			</div>
	    </div>
    </div>
</template>
<script>
import Nav from '../../common/nav.vue';
export default {
	name: 'app-account-main',
	data() {
		return {
			navMenu: [{
				msg: '我的账户',
				link: 'javascript:void(0)',
				icon: 'icon-account',
				checked: true,
				sub: [{
					msg: '账户概况',
					link: '/#/app/account/account-overview'
				}, {
					msg: '账户明细',
					link: '/#/app/account/account-detail-list'
				}]
			}, {
				msg: '账户管理',
				link: 'javascript:void(0)',
				icon: 'icon-manage',
				checked: false,
				sub: [{
					msg: '联系方式',
					link: '/#/app/account/contact-way'
				}]
			}, {
				msg: '站内信',
				link: '/#/app/account/message',
				icon: 'icon-letter',
				checked: false,
				sub: []
			}, {
				msg: '余额提醒',
				link: '/#/app/account/balance',
				icon: 'icon-balance',
				checked: false,
				sub: []
			}, {
				msg: '商家资质',
				link: '/#/app/account/business-aptitude',
				icon: 'icon-aptitude',
				checked: false,
				sub: []
			}, {
				msg: '广告审核规范',
				link: '/#/app/account/ad-standard',
				icon: 'icon-verify',
				checked: false,
				sub: []
			}, {
				msg: '用户协议',
				link: 'javascript:void(0)',
				icon: 'icon-agreement',
				checked: false,
				sub: [{
					msg: '用户协议',
					link: '/#/app/account/agreement1'
				}]
			}]
		};
	},
	components: {
		'm-nav': Nav
	}
};
</script>
