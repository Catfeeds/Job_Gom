<template>
	<div>
		<transition name="fade">
			<div v-bind:style="{zIndex:masterZIndex}" class="master" v-show="config.show" @click="closeDrawer"></div>
		</transition>
		<transition name="drawer">
			<div class="amp-drawer" v-if="config.show && config.type === 'money'">
				<div class="drawer-part">
					<h2 class="part-header"><span class="header-text">现金帐户充值</span><span class="header-fn" @click="closeDrawer"><em class="icon icon-close"></em></span></h2>
					<div class="money-cont">
						<div class="form-column">
							<div class="column-group">
								<div class="group-aside"><i class="group-tip">*</i>充值金额：</div>
								<div class="group-detail">
									<div class="detail-row">
										<div class="money-classify"><a href="" class="btn-square" @click.prevent="changeMoney(5000)" v-bind:class="{'actived' : type !== 'other' && money === 5000}">5000</a><a href="" class="btn-square" v-bind:class="{'actived':type!== 'other'&& money===8000}" @click.prevent="changeMoney(8000)">8000</a><a href="" class="btn-square" v-bind:class="{'actived' : type !== 'other' && money === 10000}" @click.prevent="changeMoney(10000)">10000</a><a href="" class="btn-square" v-bind:class="{'actived' : type !== 'other' && money === 20000}" @click.prevent="changeMoney(20000)">20000</a><a href="" class="btn-square" v-bind:class="{'actived' : type !== 'other' && money === 50000}" @click.prevent="changeMoney(50000)">50000</a><a href="" class="btn-square" v-bind:class="{'actived':type === 'other'}" @click.prevent="changeMoney(0)">其它金额</a></div>
										<div class="money-other"><span class="form-text">其他金额</span>
											<div class="ele-input">
												<input type="text" v-model.number="money">
											</div><span class="form-text">元</span>
											<div class="form-gray-text">请输入1000以上的整数</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">充值方式：</div>
							<div class="group-detail">
								<div class="detail-row">
									<div class="money-classify"><span v-show="chargeType === 1" class="btn-square btn-square-large actived">网银充值</span><span class="btn-square btn-square-large" v-show="chargeType === 2">钱包充值</span></div>
								</div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">支付方式：</div>
							<div class="group-detail">
								<div class="detail-row"> <span class="form-infor">银联</span></div>
							</div>
						</div>
					</div>
				</div>
				<div class="drawer-btn"><a v-bind:href="url" class="btn btn-primary" @click="rechargeHandler" target="_blank">充值</a><a href="" class="btn btn-gray" @click.prevent="closeDrawer">关闭</a></div>
			</div>
		</transition>
		<transition name="fade">
			<div v-show="isDoRecharge" class="dialog-pop">
				<div class="pop-header"><span class="header-text">提示</span><span class="header-close" @click="closeDialog"><em class="icon icon-close"></em></span></div>
				<div class="pop-body">
					<div class="body-infor">
						<h3>请您在新打开的页面上完成充值。</h3>
						<p>充值完成后，根据您的情况点击下面按钮。</p>
					</div>
				</div>
				<div class="pop-footer"><span class="btn btn-primary" @click="rechargeSuccess">充值成功</span><span class="btn btn-gray" @click="rechargeFail">充值失败</span></div>
			</div>
		</transition>
	</div>
</template>
<script>
import store from 'store';
window.store = store;
import actions from 'actions';
window.actions = actions;
import router from '../../../route';
import Axios from 'utils/http';
export default{
	name:'account-money',
	data(){
		return {
		    type:'other',
		    money:0,
			otherMoney:0,
			chargeType:1,
			isDoRecharge:false
		};
	},
	computed:{
		config(){
			return store.state.drawerCtrl;
		},
		masterZIndex(){
		    return this.isDoRecharge ? 1350 : 1200;
		},
		url(){
		    let vm = this;
		    let am = vm.money + '';
		    return this.money > 1000 && am.indexOf('.') < 0 && !/[a-zA-Z]/g.test(am) ? '/api/recharge/'+ this.chargeType +'?txnAmt=' + this.money : 'javascript:void(0)';
		}
	},
	methods: {
		rechargeHandler(){
	        let vm = this;
	        let am = vm.money + '';
	        if(vm.money < 1000 || am.indexOf('.') > -1 || /[a-zA-Z]/g.test(am)){
				vm.$message({
					message: '请输入1000以上的整数',
					type: 'warning'
				});
				return false;
			}else {
	        	this.isDoRecharge = true;
			}
		},
		closeDialog(){
			this.isDoRecharge = false;
		},
		rechargeSuccess(){
			this.closeDrawer();
			router.push({ name:'account-detail-list',params:{type: 2}});
		},
		rechargeFail(){
			this.isDoRecharge = false;
		},
		closeDrawer() {
			this.isDoRecharge = false;
			actions.controlDrawer(this.$store, {
				show: false
			});
		},
		changeMoney(money){
		    console.log(money);
		    this.money = money > 0 ? money : this.money;
		    this.type = money > 0 ? '' : 'other';
		}
	}
};
</script>
<style>

</style>
