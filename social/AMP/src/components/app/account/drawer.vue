<template>
	<div>
		<transition name="fade">
			<div style="z-index:1200;" class="master" v-show="config.show" @click="closeDrawer"></div>
		</transition>
		<transition name="drawer">
			<div class="amp-drawer" v-if="config.show && config.type === 'account'">
				<div class="drawer-part">
					<h2 class="part-header"><span class="header-text">账户资金划拨</span><span class="header-fn" @click="closeDrawer"><em class="icon icon-close"></em></span></h2>
					<div class="money-cont">
						<div class="form-column">
							<div class="column-group">
								<div class="group-aside">总可用余额：</div>
								<div class="group-detail">
									<div class="detail-row"> <span class="form-infor">{{ totalCount }} 元</span></div>
								</div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">广告帐户余额：</div>
							<div class="group-detail">
								<div class="detail-row">
									<div class="ele-input ele-input-normal">
										<input type="text" v-model.number="account.adAccount" @keyup="adInputOnChanged">
									</div>
									<div class="form-text">元</div>
								</div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">返利帐户余额：</div>
							<div class="group-detail">
								<div class="detail-row">
									<div class="ele-input ele-input-normal">
										<input type="text" v-model.number="account.rebateAccount" @keyup="rebInputOnChanged">
									</div>
									<div class="form-text">元</div>
								</div>
								<div class="detail-row detail-row04">
									<el-radio-group v-model="countSplit" @change="splitCountChange">
										<el-radio :label="0">1/4总可用余额</el-radio>
										<el-radio :label="1">1/3总可用余额</el-radio>
										<el-radio :label="2">1/2总可用余额</el-radio>
										<el-radio :label="3">全部总可用余额</el-radio>
									</el-radio-group>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="drawer-btn"><a href="" class="btn btn-primary" @click.prevent="onSubmit">确定</a><a href="" class="btn btn-gray" @click.prevent="closeDrawer">关闭</a></div>
			</div>
		</transition>
	</div>
</template>
<script>
import store from 'store';
window.store = store;
import actions from 'actions';
window.actions = actions;
import Event from 'event';
import {
	objType
} from 'utils/common';
import Axios from 'utils/http';
export default{
	name:'account-drawer',
	props:['result'],
	data(){
	    return {
		account:{
			adAccount: 0,
			rebateAccount: 0
		},
		countSplit:NaN
	};
	},
	computed:{
		config(){
		    return store.state.drawerCtrl;
		},
	    totalCount:function() {
		return parseFloat(this.result.adAccount.balance) + parseFloat(this.result.rebateAccount.balance);
	}
	},
	methods: {
		closeDrawer() {
			actions.controlDrawer(this.$store, {
				show: false
			});
		},
		setAccount(){
		    let vm = this;
			vm.account.adAccount = parseFloat(vm.result.adAccount.balance);
			vm.account.rebateAccount = parseFloat(vm.result.rebateAccount.balance);
		},
		adInputOnChanged(event){
		    let str = event.target.value;
		    if(/[a-zA-z]/g.test(str)){
			this.account.adAccount = 0;
		    }else if(/^0./g.test(str) && str.length > 3 && str.split('.')[1].length > 2){
		    this.account.adAccount = parseFloat(this.account.adAccount).toFixed(2);
		}else if(parseFloat(this.account.adAccount) > this.totalCount){
			this.account.adAccount = this.totalCount;
		}
			this.account.rebateAccount = parseFloat(this.totalCount - parseFloat(this.account.adAccount.length === 0?0:this.account.adAccount).toFixed(2)).toFixed(2);
		},
		rebInputOnChanged(event){
			let str = event.target.value;
			if(/[a-zA-z]/g.test(str)){
				this.account.rebateAccount = 0;
			}else if(/^0./g.test(str) && str.length > 3 && str.split('.')[1].length > 2){
				this.account.rebateAccount = parseFloat(this.account.rebateAccount).toFixed(2);
			}else if(parseFloat(this.account.rebateAccount) > this.totalCount){
			    this.account.rebateAccount = this.totalCount;
			}
			this.account.adAccount = parseFloat(this.totalCount - parseFloat(this.account.rebateAccount.length === 0?0:this.account.rebateAccount).toFixed(2)).toFixed(2);
		},
		splitCountChange(value){
		    let vm = this;
		    console.log(value);
		    switch (value){
		case 0:
			vm.account.rebateAccount = (0.25 * vm.totalCount).toFixed(2);
			vm.account.adAccount = (vm.totalCount - vm.account.rebateAccount).toFixed(2);
			break;
		case 1:
			vm.account.rebateAccount = (vm.totalCount / 3).toFixed(2);
			vm.account.adAccount = (vm.totalCount - vm.account.rebateAccount).toFixed(2);
			break;
		case 2:
			vm.account.rebateAccount = (0.5 * vm.totalCount).toFixed(2);
			vm.account.adAccount = (vm.totalCount - vm.account.rebateAccount).toFixed(2);
			break;
		case 3:
			vm.account.rebateAccount = vm.totalCount;
			vm.account.adAccount = (vm.totalCount - vm.account.rebateAccount).toFixed(2);
			break;
		default:
			vm.account.rebateAccount = 0;
			vm.account.adAccount = (vm.totalCount - vm.account.rebateAccount).toFixed(2);
			break;
		}
		},
		onSubmit(){
		    let vm = this;
		    let param = {adBalance:parseInt(parseFloat(vm.account.adAccount).toFixed(2) * 100),rebateBalance:parseInt(parseFloat(vm.account.rebateAccount).toFixed(2) * 100)};
		    Axios.post('/api/account/transfer',param)
				.then(function(response) {
					console.log(response);
					if(response.status === 200 && response.data.code === 200 && response.data.iserror === 0){
						Event.$emit('account-save');
					}else{
						console.log('fail');
						vm.showMessage(response.data.msg,'error');
					}
				})
				.catch(function(error) {
					console.log(error);
					vm.showMessage('修改失败，请稍后重试！','error');
				});
		},
		showMessage(message,type){
			let vm = this;
			vm.$message({
				message: message,
				type: type
			});
		}
	},
	watch: {
		result: {
			handler: 'setAccount',
			deep: true
		}
	}
};
</script>
