<template>
	<div>
		<m-breadcrumb :config="breadcrumbConfig"></m-breadcrumb>
		<div class="amp-module">
			<div class="module-statis">
				<div class="statis-infor">
					<div class="infor-name">
						<p><span class="name-icon"><em class="icon icon-wallet"></em></span><span class="name-title">现金账户</span></p>
					</div>
					<div class="infor-data">
						<ul>
							<li>
								<p><strong>广告帐户余额</strong><span v-show="isFinishLoading">¥{{result.adAccount.balance}}</span></p>
							</li>
							<li>
								<p><strong>今日广告花费</strong><span v-show="isFinishLoading">¥{{result.adAccount.todayCost}}</span></p>
							</li>
							<li>
								<p><strong>返利帐户余额</strong><span v-show="isFinishLoading">¥{{result.rebateAccount.balance}}</span></p>
							</li>
							<li>
								<p><strong>今日返利花费</strong><span v-show="isFinishLoading">¥{{result.rebateAccount.todayCost}}</span></p>
							</li>
						</ul>
					</div>
				</div>
				<div class="statis-fn"><a href="" class="btn btn-primary" @click.prevent="showNew({type: 'money', show: true, action: 'modify'})">充值</a><a href="/#/app/account/balance" class="btn btn-base-gray">设置余额提醒</a><a href="" class="btn btn-base-gray" @click.prevent="showNew({type: 'account', show: true, action: 'modify'})">资金划拔</a></div>
			</div>
		</div>
		<m-money></m-money>
		<m-drawer :result="result"></m-drawer>
	</div>
</template>
<script>
import actions from 'actions';
import Breadcrumb from '../../common/breadcrumb.vue';
import Axios from 'utils/http';
import Event from 'event';
import Drawer from './drawer.vue';
import DrawerMoney from './drawerMoney.vue';
export default {
	name: 'app-account-account-overview',
	data() {
		return {
			breadcrumbConfig: {
				data: [{
					msg: '我的账户',
					link: '/#/app/account/'
				}, {
					msg: '账户概况',
					link: '/#' + this.$route.path
				}]
			},
			isFinishLoading:false,
			result:{
				adAccount: {
					balance: 0,
					todayCost: 0
				},
				rebateAccount: {
					balance: 0,
					todayCost: 0
				},
				messages: []
			}
		};
	},
	components: {
		'm-breadcrumb': Breadcrumb,
		'm-drawer': Drawer,
		'm-money':DrawerMoney
	},
	created: function() {
		this.loadDashData();
	},
	methods: {
		loadDashData:function() {
			let vm = this;
			Axios.get('/api/account')
				.then(function(response) {
					let data = response.data;
					console.log(data);
					if(response.status === 200 && response.data.code === 200){
						vm.result.adAccount.balance = (data.data.adBalance * 0.01).toFixed(2);
						vm.result.adAccount.todayCost = (data.data.adTodayCost * 0.01).toFixed(2);
						vm.result.rebateAccount.balance = (data.data.rebateBalance * 0.01).toFixed(2);
						vm.result.rebateAccount.todayCost = (data.data.rebateTodayCost * 0.01).toFixed(2);
						vm.isFinishLoading = true;
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		showNew(obj) {
			actions.controlDrawer(this.$store, obj);
		}
	},
	mounted(){
	    let vm = this;
		Event.$on('account-save',() =>{
		    vm.loadDashData();
			actions.controlDrawer(vm.$store, {
				show: false
			});
		});
	}
};
</script>
