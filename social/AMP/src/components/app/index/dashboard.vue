<template>
	<div class="index-statis">
		<ul>
			<li>
				<div class="statis-title"><em class="icon icon-advert"></em><span>广告账户</span></div>
				<div class="statis-cont">
					<p>账户金额：<span>¥{{result.adAccount.balance}}</span></p>
					<p>今日花费：<span>¥{{result.adAccount.todayCost}}</span></p><span class="cont-fn"><a href="" title=""  @click.prevent="showNew({type: 'money', show: true, action: 'modify'})">充值</a></span>
				</div>
			</li>
			<li>
				<div class="statis-title"><em class="icon icon-rebate"></em><span>返利账户</span></div>
				<div class="statis-cont">
					<p>账户金额：<span>¥{{result.rebateAccount.balance}}</span></p>
					<p>今日花费：<span>¥{{result.rebateAccount.todayCost}}</span></p><span class="cont-fn"><a href="" title="" @click.prevent="showNew({type: 'account', show: true, action: 'modify'})">资金划拨</a></span>
				</div>
			</li>
			<li>
				<div class="statis-title"><em class="icon icon-msg"></em><span>最新消息</span></div>
				<div class="statis-cont statis-cont-reset">
					<dl>
						<dt v-for="msg in result.messages" v-bind:class="{'cont-new':!msg.isRead}"><router-link :to="{name: 'message-detail', params:{type:msg.type,id: msg.messageId}}"><em class="icon icon-letter"></em><span class="cont-text">{{msg.title}}</span><span class="cont-time">{{formatDate(msg.time)}}</span></router-link></dt>
					</dl>
				</div>
			</li>
		</ul>
		<m-money></m-money>
		<m-drawer :result="result"></m-drawer>
	</div>
</template>
<script>
import actions from 'actions';
import Axios from '../../../utils/http';
import Event from 'event';
import Drawer from '../account/drawer.vue';
import DrawerMoney from '../account/drawerMoney.vue';
export default {
	name: 'index-dashboard',
	data(){
		return {
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
		'm-drawer': Drawer,
		'm-money': DrawerMoney
	},
	created: function() {
		this.loadDashData();
	},
	methods: {
		loadDashData:function() {
			let vm = this;
			Axios.get('/api/home/summary')
				.then(function(response) {
					let data = response.data;
					console.log(data);
					if(response.status === 200 && response.data.code === 200){
						vm.result.adAccount.balance = (data.data.adAccount.balance * 0.01).toFixed(2);
						vm.result.adAccount.todayCost = (data.data.adAccount.todayCost * 0.01).toFixed(2);
						vm.result.rebateAccount.balance = (data.data.rebateAccount.balance * 0.01).toFixed(2);
						vm.result.rebateAccount.todayCost = (data.data.rebateAccount.todayCost * 0.01).toFixed(2);
						vm.result.messages = data.data.messages;
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		formatDate:function(timestamp) {
			let date = new Date(timestamp);
			return date.getFullYear() + "-" + (date.getMonth() + 1) + '-' + date.getDate();
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
