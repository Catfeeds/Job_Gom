<template>
	<div>
		<m-breadcrumb :config="breadcrumbConfig"></m-breadcrumb>
		<div class="account-main bg-white amp-remain">
			<el-form v-show="isFinishLoading" :model="balanceForm" :rules="rules" ref="balanceForm" class="demo-ruleForm">
			<!-- 账户余额提醒-->
			<div class="amp-path amp-path-large"><span class="path-col"> <b>账户余额提醒</b></span></div>
			<div class="main-wrap">
				<div class="form-column">
					<div class="column-group">
						<div class="group-detail">
							<div class="detail-row">
								<span class="row-check" @click="changeBalanceOpenState"><em class="icon icon-single" v-bind:class="{'icon-singled':isBalanceOpened}"></em><i>开启</i></span>
								<span class="row-check" @click="changeBalanceOpenState"><em class="icon icon-single" v-bind:class="{'icon-singled':!isBalanceOpened}"></em><i>关闭</i></span>
							</div>
						</div>
					</div>
					<div class="column-group">
						<div class="group-detail">
							<div class="detail-row">
								<h2 class="group-title">提醒金额：</h2>
							</div>
							<div class="detail-row"> <span class="form-text"><i class="group-tip">*</i>当帐户少于</span>
								<el-form-item label="" prop="balanceCount">
									<el-input v-model.number="balanceForm.balanceCount" :disabled="!isBalanceOpened"></el-input>
								</el-form-item>
								<span class="form-text">元时提醒我</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 通知方式-->
			<div class="amp-path amp-path-bd amp-path-large"><span class="path-col"> <b>通知方式</b></span></div>
			<div class="main-wrap main-wrap02">
				<div class="form-column">
					<div class="column-group">
						<div class="group-detail">
							<div class="detail-row">
								<span class="row-check" @click="balanceTypeCellPhone = !balanceTypeCellPhone"><em class="icon icon-select" v-bind:class="{'icon-selected':balanceTypeCellPhone}"></em><i class="group-tip" v-show="balanceTypeCellPhone">*</i><i>手机短信：</i></span>
								<el-form-item label="" prop="cellPhone">
									<el-input v-model="balanceForm.cellPhone" :disabled="!balanceTypeCellPhone"></el-input>
								</el-form-item>
							</div>
						</div>
					</div>
				</div>
				<div class="column-group">
					<div class="group-detail">
						<div class="detail-row"><span class="row-check" @click="balanceTypeEmail = !balanceTypeEmail"><em class="icon icon-select" v-bind:class="{'icon-selected':balanceTypeEmail}"></em><i class="group-tip" v-show="balanceTypeEmail">*</i><i>电子邮件：</i></span>
							<el-form-item label="" prop="email">
								<el-input v-model="balanceForm.email" :disabled="!balanceTypeEmail"></el-input>
							</el-form-item>
						</div>
					</div>
				</div>
			</div>
			<!-- 提交-->
			<div class="submit-wrap"><a href="" class="btn btn-primary" @click.prevent="onSubmit">提交</a></div>
			</el-form>
		</div>
	</div>
</template>
<script>
import Breadcrumb from '../../common/breadcrumb.vue';
import { ERRORMESSAGE} from '../../../help/textMessage';
import Axios from 'utils/http';
export default {
	name: 'app-account-account-overview',
	data() {
		return {
			breadcrumbConfig: {
				data: [{
					msg: '我的账户',
					link: '/#/app/account/'
				}, {
					msg: '余额提醒',
					link: '/#' + this.$route.path
				}]
			},
			isFinishLoading:false,
			balanceForm:{
				balanceCount:0,
				cellPhone:'',
				email:''
			},
			rules: {
			    balanceCount:[
				{validator:function(rule, value, callback) {
					if(typeof value === 'string' && value.trim().length == 0){
						callback(new Error(ERRORMESSAGE.Balance.balanceMoneyRequired));
					}else {
						if(parseFloat(value) > 1000){
							callback(new Error(ERRORMESSAGE.Balance.balanceMoneyMaxValue));
						}
						callback();
					}
				},trigger:'submit'}
			],
				cellPhone: [
					{ required: true, message: '请输入手机号', trigger: 'submit'},
					{ validator: function(rule, value, callback) {
						if(!/^1\d{10}$/g.test(value)) {
							callback(new Error(ERRORMESSAGE.ContactWay.cellPhoneNumberInvalid));
						}else{
							callback();
						}
					}, trigger: 'submit'}
				],
				email: [
					{ required: true, message: '请输入邮箱', trigger: 'submit'},
					{ validator: function(rule, value, callback) {
						if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(value)) {
							callback(new Error(ERRORMESSAGE.ContactWay.emailInvalid));
						}else{
							callback();
						}
					}, trigger: 'submit'}
				]
			},
			isBalanceOpened:false,
			balanceTypeCellPhone:false,
			balanceTypeEmail:false
		};
	},
	created(){
	    let vm = this;
	    vm.loadData();
	},
	components: {
		'm-breadcrumb': Breadcrumb
	},
	methods:{
	    changeBalanceOpenState:function() {
		this.isBalanceOpened = !this.isBalanceOpened;
	},
		loadData(){
			let vm = this;
	        Axios.get('/api/account/balance/remind')
				.then(function(response) {
					let data = response.data;
					if(response.status === 200 && response.data.code === 200){
						vm.isBalanceOpened = data.data.isOpen == 1;
						vm.balanceForm.balanceCount = data.data.remindAmount / 100;
						vm.balanceTypeCellPhone = data.data.isSms == 1;
						vm.balanceForm.cellPhone = data.data.mobile + '';
						vm.balanceTypeEmail = data.data.isEmail == 1;
						vm.balanceForm.email = data.data.email;
						vm.isFinishLoading = true;
					}
				})
				.then(function(error) {
					console.log(error);
				});
		},
		onSubmit(){
		    let vm = this;
		    if(vm.isBalanceOpened){
				vm.$refs.balanceForm.validateField('balanceCount',function(errorMessage) {
				    if(errorMessage === null || errorMessage.length === 0){
						if(vm.balanceTypeCellPhone){
							vm.$refs.balanceForm.validateField('cellPhone',function(errorMessage) {
								if(errorMessage === null || errorMessage.length === 0){
									if(vm.balanceTypeEmail){
										vm.$refs.balanceForm.validateField('email',function(errorMessage) {
											if(errorMessage === null || errorMessage.length === 0){
												vm.doPost();
											}else {
												return false;
											}
										});
									}else{
									    vm.doPost();
									}
								}else {
									return false;
								}
							});
						}else{
							if(vm.balanceTypeEmail){
								vm.$refs.balanceForm.validateField('email',function(errorMessage) {
									if(errorMessage === null || errorMessage.length === 0){
									    vm.doPost();
									}else {
										return false;
									}
								});
							}else{
							    vm.doPost();
							}
						}
					}else {
				        return false;
					}
				});
			}else {
				vm.doPost();
			}
		},
		doPost(){
		    let vm = this;
			let params = {
				isOpen:vm.isBalanceOpened ? 1 : 0,
				remindAmount:vm.balanceForm.balanceCount * 100,
				isSms:vm.balanceTypeEmail ? 1 : 0,
				mobile:vm.balanceForm.cellPhone ? vm.balanceForm.cellPhone : '',
				isEmail:vm.balanceTypeEmail ? 1 : 0,
				email:vm.balanceForm.email
			};
			Axios.post('/api/account/balance/remind',params)
				.then(function(response) {
					if(response.status === 200 && response.data.code === 200 && response.data.iserror === 0){
						console.log('success');
						vm.showMessage(response.data.msg,'success');
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
				showClose:true,
				message: message,
				type: type
			});
		}
	}
};
</script>
<style scoped>
	.amp-remain .el-form-item{width: 222px;display: inline-block;margin-bottom: 0;vertical-align: middle}
</style>
