<template>
	<div>
		<h1>填写公司信息</h1>
		<h4>(本页所有信息项均为必填项)</h4>
		<div class="content-form">
			<p>身份：<b>{{ person }}</b></p>
			<p>国美Plus账户：<b>{{ gomeplusAccount }}</b></p>
			<div class="form-if">
				<div class="if-item"><em style="font-size: 10px;color:#89919c;" class="icon icon-arrow-up"></em><span class="span">营业执照信息（副本）</span><a href="" class="btn btn-normal" @click.prevent="changeStep('company')">编辑</a></div>
				<div class="item-unfold item-unfold-comfirm">
					<div class="unfold-content">
						<div class="column-group">
							<div class="group-aside">公司名称：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.companyName}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">注册号（营业执照号）：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.bizLicenseNumber}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">法人代表姓名：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.legalReprName}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">法人代表身份证号：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.legalReprIdNumber}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">法人身份证电子版：</div>
							<div class="group-detail">
								<div class="detail-row">
									<div class="row-photo-s">
										<div class="photo-add photo-add-nomar"><img v-bind:src="anicerData.legalReprIdImage"></div>
									</div>
									<div class="row-photo-s">
										<div class="photo-add photo-add-nomar"><img v-bind:src="anicerData.legalReprIdBackImage"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">营业执照详细地址：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.bizLicenseAddress}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">成立日期：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{formatFoundDate}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">营业期限：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{formatBizDate}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">注册资本：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.regCapital}} 万元</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">经营范围：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.bizScope}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">营业执照副本电子版：</div>
							<div class="group-detail">
								<div class="detail-row">
									<div class="row-photo-l">
										<div class="photo-add photo-add-nomar"><img v-bind:src="anicerData.bizLicenseImage"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">公司详细地址：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.companyAddress}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">公司电话：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.companyPhone}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">公司紧急联系人：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.emerContact}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">公司紧急联系人电话：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.emerContactPhone}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">公司邮箱：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.companyEmail}}</span></div>
							</div>
						</div>
					</div>
				</div>
				<div class="if-item"><em style="font-size: 10px;color:#89919c;" class="icon icon-arrow-up"></em><span class="span">组织机构代码</span><a href="" class="btn btn-normal" @click.prevent="changeStep('company')">编辑</a></div>
				<div class="item-unfold item-unfold-comfirm">
					<div class="unfold-content">
						<div class="column-group">
							<div class="group-aside">组织机构代码：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.orgCode}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">组织机构代码副本电子版：</div>
							<div class="group-detail">
								<div class="detail-row">
									<div class="row-photo-l">
										<div class="photo-add photo-add-nomar"><img v-bind:src="anicerData.orgCodeImage"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="if-item"><em style="font-size: 10px;color:#89919c;" class="icon icon-arrow-up"></em><span class="span">税务登记证</span><a href="" class="btn btn-normal" @click.prevent="changeStep('company')">编辑</a></div>
				<div class="item-unfold item-unfold-comfirm">
					<div class="unfold-content">
						<div class="column-group">
							<div class="group-aside">税号：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.taxNumber}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">纳税人类型：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{taxpayerTypeText}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">纳税类型税码：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{taxCodeText}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">税务登记证电子版：</div>
							<div class="group-detail">
								<div class="detail-row">
									<div class="row-photo-m">
										<div class="photo-add photo-add-nomar"><img v-bind:src="anicerData.taxRegCertImage"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">一般纳税人资格电子版：</div>
							<div class="group-detail">
								<div class="detail-row">
									<div class="row-photo-m">
										<div class="photo-add photo-add-nomar"><img v-bind:src="anicerData.taxpayerQualificationImage"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="if-item"><em style="font-size: 10px;color:#89919c;" class="icon icon-arrow-up"></em><span class="span">开户银行许可证</span><a href="" class="btn btn-normal" @click.prevent="changeStep('company')">编辑</a></div>
				<div class="item-unfold item-unfold-comfirm">
					<div class="unfold-content">
						<div class="column-group">
							<div class="group-aside">银行开户名：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.bankAccountName}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">公司银行账号：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.bankAccount}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">开户银行支行名称：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.bankBranchName}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">开户银行支行联行号：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.bankBranchLineNumber}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">开户银行支行地址：</div>
							<div class="group-detail">
								<div class="detail-row"><span class="row-span">{{anicerData.bankBranchAddress}}</span></div>
							</div>
						</div>
						<div class="column-group">
							<div class="group-aside">税务登记证电子版：</div>
							<div class="group-detail">
								<div class="detail-row">
									<div class="row-photo-m">
										<div class="photo-add photo-add-nomar"><img v-bind:src="anicerData.bankAccountPermissionImage"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="padding-top:36px;" class="form-next"><a href="" class="btn btn-gray" @click.prevent="changeStep('contact')">上一步</a><a href="" class="btn btn-primary" @click.prevent="isConfirm = !isConfirm">提交</a></div>
		</div>
		<div v-show="isConfirm">
			<div class="master"></div>
			<div class="dialog-pop">
				<div class="pop-header"><span class="header-text">提示</span><span class="header-close"><em class="icon icon-close"@click="isConfirm = false"></em></span></div>
				<div class="pop-body">
					<div class="body-infor">
						<h3>确定提交审核吗？</h3>
						<p>(提交审核后信息将不可更改，请确保无误)</p>
					</div>
				</div>
				<div class="pop-footer"><a href="" class="btn btn-primary" @click.prevent="saveHandler">确定提交</a><a href="" class="btn btn-gray" @click.prevent="isConfirm = false">再检查一下</a></div>
			</div>
		</div>
	</div>
</template>
<script>
import store from 'store';
window.store = store;
import actions from 'actions';
window.actions = actions;
import router from '../../../route';
import {formatDate} from 'utils/common';
import Axios from 'utils/http';
export default{
	name:'register-confirm',
	data(){
		return{
			isConfirm:false
		};
	},
	computed:{
		anicerData:() => store.state.anicerFormData,
		formatFoundDate(){
		    return formatDate(store.state.anicerFormData.companyFoundDate,'yyyy-MM-dd');
		},
		formatBizDate(){
			return formatDate(store.state.anicerFormData.bizStartDate,'yyyy-MM-dd') + ' - ' + formatDate(store.state.anicerFormData.bizEndDate,'yyyy-MM-dd');
		},
		taxpayerTypeText(){
		    let type = '';
			switch (store.state.anicerFormData.taxpayerType){
				case '2':
				    type = '小规模纳税人';
				    break;
				case '1':
				    type = '一般纳税人';
				    break;
				case '3':
				    type = '非增值税纳税人';
				    break;
			}
			return type;
		},
		taxCodeText(){
		    let code = '';
			switch (store.state.anicerFormData.taxCode){
				case '0':
					code = '0%';
					break;
				case '1':
					code = '3%';
					break;
				case '2':
					code = '6%';
					break;
				case '3':
					code = '7%';
					break;
				case '4':
					code = '11%';
					break;
				case '5':
					code = '13%';
					break;
				case '7':
					code = '图书13%免税';
					break;
				case '6':
					code = '17%';
					break;
			}
			return code;
		},
		person:() => store.state.anicerFormData.companyNature === '2' ? '代理商' : '入驻商家',
		gomeplusAccount:() => store.state.userInfo.mobile
	},
	methods:{
		saveHandler(){
			let vm = this;
		    console.log(store.state.anicerFormData);
			Axios.post('/api/anicer',store.state.anicerFormData)
				.then(function(response) {
				    if(response.status === 200 && response.data.code === 200 && response.data.iserror === 0){
						router.push({name:'index'});
					}
				})
				.catch(function(error) {
					vm.showMessage('修改失败，请稍后重试！','error');
				});
		},
		changeStep(type){
			actions.controlAnicer(this.$store,{isSucceed:store.state.anicerControl.isSucceed,step:type});
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
