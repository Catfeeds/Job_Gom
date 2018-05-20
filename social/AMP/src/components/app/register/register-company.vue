<template>
	<div>
		<h1>填写公司信息</h1>
		<h4>(本页所有信息项均为必填项)</h4>
		<div class="content-form">
			<p>身份：<b>{{ person }}</b></p>
			<p>国美Plus账户：<b>{{ gomeplusAccount }}</b></p>
			<div class="form-if" v-if="!hasCompanyInfo">
				<el-form :model="companyForm" :rules="rules" ref="companyForm" label-width="286px">
					<div class="if-item"><em class="icon icon-unfold em" @click="isLicenseShow = !isLicenseShow"></em><span>营业执照信息（副本）</span><a href="" class="btn btn-normal" @click.prevent="isLicenseShow = !isLicenseShow">编辑</a></div>
					<transition name="anicer-fade">
						<div v-if="isLicenseShow" class="item-unfold"><em class="icon icon-packup em"></em><span class="span">营业执照信息（副本）</span>
							<div class="unfold-content">
								<el-form-item label="公司名称：" prop="companyName">
									<el-input v-model="companyForm.companyName"></el-input>
								</el-form-item>
								<el-form-item label="注册号（营业执照号）：" prop="bizLicenseNumber">
									<el-input v-model="companyForm.bizLicenseNumber"></el-input>
								</el-form-item>
								<el-form-item label="法人代表姓名：" prop="legalReprName" >
									<el-input v-model="companyForm.legalReprName"></el-input>
								</el-form-item>
								<el-form-item label="法人代表身份证号：" prop="legalReprIdNumber" >
									<el-input v-model="companyForm.legalReprIdNumber"></el-input>
								</el-form-item>
								<el-form-item label="法人身份证电子版：">
									<p class="p-r" style="color:#89919c">（身份证正反面照）</p>
									<el-col :span="11" style="width: 146px;margin: 0 20px 0 0;">
										<el-form-item prop="legalReprIdImage">
										<el-upload class="detail-row" :action="uploadUrl" accept="image/*" :multiple="false" :on-success="handleLegalReprIdImageSuccess" :show-upload-list="false">
											<div class="row-photo-s">
												<div class="photo-add photo-add-b"><img v-bind:src="companyForm.legalReprIdImage">
													<div class="add-content">
														<div class="add-mask"></div>
														<div class="add-foot">更换照片</div>
													</div>
												</div>
												<p>身份证正面</p>
											</div>
										</el-upload>
										</el-form-item>
									</el-col>
									<el-col :span="11" style="width: 146px;margin: 0 20px 0 0;">
										<el-form-item prop="legalReprIdBackImage">
										<el-upload class="detail-row" :action="uploadUrl" accept="image/*" :multiple="false" :on-success="handleLegalReprIdBackImageSuccess" :show-upload-list="false">
											<div class="row-photo-s">
												<div class="photo-add photo-add-b"><img v-bind:src="companyForm.legalReprIdBackImage">
													<div class="add-content">
														<div class="add-mask"></div>
														<div class="add-foot">更换照片</div>
													</div>
												</div>
												<p>身份证反面</p>
											</div>
										</el-upload>
										</el-form-item>
									</el-col>
								</el-form-item>
								<el-form-item label="营业执照详细地址：" prop="bizLicenseAddress">
									<el-input v-model="companyForm.bizLicenseAddress"></el-input>
								</el-form-item>
								<el-form-item label="成立日期：" prop="companyFoundDate">
									<el-date-picker type="date" placeholder="选择成立日期" :editable="false" v-model="companyFoundDate" style="width: 420px;"></el-date-picker>
								</el-form-item>
								<el-form-item label="营业期限：" prop="bizStartDate">
									<el-col :span="11" style="width: 194px">
										<el-form-item >
											<el-date-picker type="date" :editable="false" placeholder="选择营业开始日期" v-model="bizStartDate" style="width: 100%;"></el-date-picker>
										</el-form-item>
									</el-col>
									<el-col class="line" style="margin: 0px 11px;width: 10px;text-align: center;">-</el-col>
									<el-col :span="11" style="width: 194px">
										<el-form-item prop="bizEndDate">
											<el-date-picker type="date" :editable="false" placeholder="选择营业结束日期" v-model="bizEndDate" style="width: 100%;"></el-date-picker>
										</el-form-item>
									</el-col>
								</el-form-item>
								<el-form-item label="注册资本：">
									<el-col :span="11" style="width: 380px">
										<el-form-item prop="regCapital">
											<el-input v-model="companyForm.regCapital" style="width: 380px"></el-input>
										</el-form-item>
									</el-col>
									<el-col class="line" :span="2"style="width: 38px;padding-left: 10px">万元</el-col>
								</el-form-item>
								<el-form-item label="经营范围：" prop="bizScope">
									<el-input type="textarea" v-model="companyForm.bizScope"></el-input>
								</el-form-item>
								<el-form-item label="营业执照副本电子版：" prop="bizLicenseImage">
									<p class="p-r" style="color:#89919c">（电子版加盖企业红色公章）</p>
									<el-upload class="detail-row" :action="uploadUrl" accept="image/*" :multiple="false" :on-success="handleBizLicenseImageSuccess" :show-upload-list="false" style="width: 146px;margin: 0 20px 0 0;float: left;">
										<div class="row-photo-l">
											<div class="photo-add photo-add-b"><img v-bind:src="companyForm.bizLicenseImage">
												<div class="add-content">
													<div class="add-mask"></div>
													<div class="add-foot">更换照片</div>
												</div>
											</div>
											<p class="p"> 营业执照副本电子版</p>
										</div>
									</el-upload>
								</el-form-item>
								<el-form-item label="公司详细地址：" prop="companyAddress">
									<el-input v-model="companyForm.companyAddress"></el-input>
								</el-form-item>
								<el-form-item label="公司电话：" prop="companyPhone">
									<el-input v-model="companyForm.companyPhone"></el-input>
								</el-form-item>
								<el-form-item label="公司紧急联系人：" prop="emerContact">
									<el-input v-model="companyForm.emerContact"></el-input>
								</el-form-item>
								<el-form-item label="公司紧急联系人电话：" prop="emerContactPhone">
									<el-input v-model="companyForm.emerContactPhone"></el-input>
								</el-form-item>
								<el-form-item label="公司邮箱：" prop="companyEmail">
									<el-input v-model="companyForm.companyEmail"></el-input>
								</el-form-item>
							</div>
						</div>
					</transition>
					<div class="if-item"><em class="icon icon-unfold" @click="isOrgCodeShow = !isOrgCodeShow"></em><span>组织机构代码</span><a href="" class="btn btn-normal" @click.prevent="isOrgCodeShow = !isOrgCodeShow">编辑</a></div>
					<transition name="anicer-fade">
						<div v-if="isOrgCodeShow" class="item-unfold"><em class="icon icon-packup em"></em><span class="span">组织机构代码</span>
							<div class="unfold-content">
								<el-form-item label="组织机构代码：" prop="orgCode">
									<el-input v-model="companyForm.orgCode"></el-input>
								</el-form-item>
								<el-form-item label="组织机构代码副本电子版：" prop="orgCodeImage">
									<p class="p-r" style="color:#89919c">（电子版加盖企业红色公章）</p>
									<el-upload class="detail-row" :action="uploadUrl" accept="image/*" :multiple="false" :on-success="handleOrgCodeImageSuccess" :show-upload-list="false" style="width: 146px;margin: 0 20px 0 0;float: left;">
										<div class="row-photo-l">
											<div class="photo-add photo-add-b"><img v-bind:src="companyForm.orgCodeImage">
												<div class="add-content">
													<div class="add-mask"></div>
													<div class="add-foot">更换照片</div>
												</div>
											</div>
											<p class="p p-l"> 组织机构代码副本电子版</p>
										</div>
									</el-upload>
								</el-form-item>
							</div>
						</div>
					</transition>
					<div class="if-item"><em class="icon icon-unfold" @click="isTaxRegCertShow = !isTaxRegCertShow"></em><span>税务登记证</span><a href="" class="btn btn-normal" @click.prevent="isTaxRegCertShow = !isTaxRegCertShow">编辑</a></div>
					<transition name="anicer-fade">
						<div v-if="isTaxRegCertShow" class="item-unfold"><em class="icon icon-packup em"></em><span class="span">税务登记证</span>
							<div class="unfold-content">
								<el-form-item label="税号：" prop="taxNumber">
									<el-input v-model="companyForm.taxNumber"></el-input>
								</el-form-item>
								<el-form-item label="纳税人类型：" prop="taxpayerType">
									<el-select v-model="companyForm.taxpayerType" placeholder="请选择纳税人类型">
										<el-option label="一般纳税人" value="1"></el-option>
										<el-option label="小规模纳税人" value="2"></el-option>
										<el-option label="非增值税纳税人" value="3"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="纳税类型税码：" prop="taxCode">
									<el-select v-model="companyForm.taxCode" placeholder="请选择纳税类型税码">
										<el-option label="0%" value="0"></el-option>
										<el-option label="3%" value="1"></el-option>
										<el-option label="6%" value="2"></el-option>
										<el-option label="7%" value="3"></el-option>
										<el-option label="11%" value="4"></el-option>
										<el-option label="13%" value="5"></el-option>
										<el-option label="17%" value="6"></el-option>
										<el-option label="图书13%免税" value="7"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="税务登记证电子版：" prop="taxRegCertImage">
									<p class="p-r" style="color:#89919c">（电子版加盖企业红色公章）</p>
									<el-upload class="detail-row" :action="uploadUrl" accept="image/*" :multiple="false" :on-success="handleTaxRegCertImageSuccess" :show-upload-list="false" style="width: 146px;margin: 0 20px 0 0;float: left;">
										<div class="row-photo-m">
											<div class="photo-add photo-add-b"><img v-bind:src="companyForm.taxRegCertImage">
												<div class="add-content">
													<div class="add-mask"></div>
													<div class="add-foot">更换照片</div>
												</div>
											</div>
											<p class="p p-l">税务登记证电子版</p>
										</div>
									</el-upload>
								</el-form-item>
								<el-form-item label="一般纳税人资格电子版：" prop="taxpayerQualificationImage">
									<p class="p-r" style="color:#89919c">（电子版加盖企业红色公章）</p>
									<el-upload class="detail-row" :action="uploadUrl" accept="image/*" :multiple="false" :on-success="handleTaxpayerQualificationImageSuccess" :show-upload-list="false" style="width: 146px;margin: 0 20px 0 0;float: left;">
										<div class="row-photo-m">
											<div class="photo-add photo-add-b"><img v-bind:src="companyForm.taxpayerQualificationImage">
												<div class="add-content">
													<div class="add-mask"></div>
													<div class="add-foot">更换照片</div>
												</div>
											</div>
											<p class="p p-l">一般纳税人资格电子版</p>
										</div>
									</el-upload>
								</el-form-item>
							</div>
						</div>
					</transition>
					<div class="if-item"><em class="icon icon-unfold" @click="isBankAccountShow = !isBankAccountShow"></em><span>开户银行许可证</span><a href="" class="btn btn-normal" @click.prevent="isBankAccountShow = !isBankAccountShow">编辑</a></div>
					<transition name="anicer-fade">
						<div v-if="isBankAccountShow" class="item-unfold"><em class="icon icon-packup em"></em><span class="span">开户银行许可证</span>
							<div class="unfold-content">
								<el-form-item label="银行开户名：" prop="bankAccountName">
									<el-input v-model="companyForm.bankAccountName"></el-input>
								</el-form-item>
								<el-form-item label="公司银行账号：" prop="bankAccount">
									<el-input v-model="companyForm.bankAccount"></el-input>
								</el-form-item>
								<el-form-item label="开户银行支行名称：" prop="bankBranchName">
									<el-input v-model="companyForm.bankBranchName"></el-input>
								</el-form-item>
								<el-form-item label="开户银行支行联行号：" prop="bankBranchLineNumber">
									<el-input v-model="companyForm.bankBranchLineNumber"></el-input>
								</el-form-item>
								<el-form-item label="开户银行支行地址：" prop="bankBranchAddress">
									<el-input v-model="companyForm.bankBranchAddress"></el-input>
								</el-form-item>
								<el-form-item label="银行开户许可证电子版：" prop="bankAccountPermissionImage">
									<p class="p-r" style="color:#89919c">（电子版加盖企业红色公章）</p>
									<el-upload class="detail-row" :action="uploadUrl" accept="image/*" :multiple="false" :on-success="handleBankAccountPermissionImageSuccess" :show-upload-list="false" style="width: 146px;margin: 0 20px 0 0;float: left;">
										<div class="row-photo-m">
											<div class="photo-add photo-add-b"><img v-bind:src="companyForm.bankAccountPermissionImage">
												<div class="add-content">
													<div class="add-mask"></div>
													<div class="add-foot">更换照片</div>
												</div>
											</div>
											<p class="p p-l">银行开户许可证电子版</p>
										</div>
									</el-upload>
								</el-form-item>
							</div>
						</div>
					</transition>
				</el-form>
			</div>
			<div class="form-if" v-if="hasCompanyInfo">
				<div class="if-item"><em style="font-size: 10px;color:#89919c;" class="icon icon-arrow-up"></em><span class="span">营业执照信息（副本）</span></div>
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
				<div class="if-item"><em style="font-size: 10px;color:#89919c;" class="icon icon-arrow-up"></em><span class="span">组织机构代码</span></div>
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
				<div class="if-item"><em style="font-size: 10px;color:#89919c;" class="icon icon-arrow-up"></em><span class="span">税务登记证</span></div>
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
				<div class="if-item"><em style="font-size: 10px;color:#89919c;" class="icon icon-arrow-up"></em><span class="span">开户银行许可证</span></div>
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
			<div class="form-next-unfold"><a href="" class="btn btn-gray" @click.prevent="changeStep('identity')">上一步</a><a href="#" class="btn btn-primary" @click.prevent="changeStep('contact')">下一步</a></div>
		</div>
	</div>
</template>
<script>
import store from 'store';
window.store = store;
import actions from 'actions';
window.actions = actions;
import {formatDate} from 'utils/common';
import apiConfig from '../../../config/api.config.js';
export default{
	name:'register-company',
	data(){
		return{
		    isLicenseShow:false,
			isOrgCodeShow:false,
			isTaxRegCertShow:false,
			isBankAccountShow:false,
			loading:{
				legalPersonFileFrontLoading:false,
				legalPersonFileReverseLoading:false
			},
			companyForm:{
				bankAccount: '',
				bankAccountName: '',
				bankAccountPermissionImage: '',
				bankBranchAddress: '',
				bankBranchLineNumber: '',
				bankBranchName: '',
				bizEndDate: '',
				bizLicenseAddress: '',
				bizLicenseImage: '',
				bizLicenseNumber: '',
				bizScope: '',
				bizStartDate: '',
				companyAddress: '',
				companyEmail: '',
				companyFoundDate: '',
				companyName: '',
				companyPhone: '',
				emerContact: '',
				emerContactPhone: '',
				legalReprIdBackImage: '',
				legalReprIdImage: '',
				legalReprIdNumber: '',
				legalReprName: '',
				orgCode: '',
				orgCodeImage: '',
				regCapital: '',
				taxCode: '',
				taxNumber: '',
				taxRegCertImage: '',
				taxpayerQualificationImage: '',
				taxpayerType: ''
			},
			companyFoundDate:'',
			bizStartDate:'',
			bizEndDate:'',
			rules: {
				companyName: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入公司名称')):callback();}, trigger: 'blur'}],
				bizLicenseNumber: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入注册号（营业执照号）')):callback();}, trigger: 'blur'}],
				legalReprName: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入法人代表姓名')):callback();}, trigger: 'blur'}],
				legalReprIdNumber: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入法人代表身份证号')):callback();}, trigger: 'blur'}],
				legalReprIdImage: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请上传身份证电子版正面')):callback();}, trigger: 'blur'}],
				legalReprIdBackImage: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请上传身份证电子版反面')):callback();}, trigger: 'blur'}],
				bizLicenseAddress: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入营业执照详细地址')):callback();}, trigger: 'blur'}],
				companyFoundDate: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入成立日期')):callback();}, trigger: 'change'}],
				bizStartDate: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入营业期限开始时间')):callback();}, trigger: 'change'}],
				bizEndDate: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入营业期限结束时间')):callback();}, trigger: 'change'}],
				regCapital: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入注册资本')):callback();}, trigger: 'blur'}],
				bizScope: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入经营范围')):callback();}, trigger: 'blur'}],
				bizLicenseImage: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请上传营业执照副本电子版')):callback();}, trigger: 'blur'}],
				companyAddress: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入公司详细地址')):callback();}, trigger: 'blur'}],
				companyPhone: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入公司电话')):callback();}, trigger: 'blur'}],
				emerContact: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入公司紧急联系人')):callback();}, trigger: 'blur'}],
				emerContactPhone: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入公司紧急联系人电话')):callback();}, trigger: 'blur'}],
				companyEmail: [{ validator: function(rule, value, callback) {
				    if(value === '' || value.length === 0){
						callback(new Error('请输入公司邮箱'));
					}else if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(value)) {
						callback(new Error('请输入有效邮箱地址'));
					}else{
						callback();
					}
				    }, trigger: 'blur'
				    }],
				orgCode: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入组织机构代码')):callback();}, trigger: 'blur'}],
				orgCodeImage: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请上传组织机构代码副本电子版')):callback();}, trigger: 'blur'}],
				taxNumber: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入税号')):callback();}, trigger: 'blur'}],
				taxpayerType: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请选择纳税人类型')):callback();}, trigger: 'change'}],
				taxCode: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请选择纳税类型税码')):callback();}, trigger: 'change'}],
				taxRegCertImage: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请上传税务登记证电子版')):callback();}, trigger: 'blur'}],
				taxpayerQualificationImage: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请上传一般纳税人资格电子版')):callback();}, trigger: 'blur'}],
				bankAccountName: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入银行开户名')):callback();}, trigger: 'blur'}],
				bankAccount: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入公司银行账号')):callback();}, trigger: 'blur'}],
				bankBranchName: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入开户银行支行名称')):callback();}, trigger: 'blur'}],
				bankBranchLineNumber: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入开户银行支行联行号')):callback();}, trigger: 'blur'}],
				bankBranchAddress: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请输入开户银行支行地址')):callback();}, trigger: 'blur'}],
				bankAccountPermissionImage: [{ validator: function(rule, value, callback) {value === '' || value.length === 0 ? callback(new Error('请上传银行开户许可证电子版')):callback();}, trigger: 'blur'}]
			},
			uploadUrl: `${apiConfig[process.env.NODE_ENV]}/api/image/upload`
		};
	},
	computed:{
		companyNature:() => store.state.anicerFormData.companyNature,
		hasCompanyInfo:() => store.state.anicerControl.hasCompanyInfo,
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
		changeStep(type){
			let vm = this;
		    if(!vm.hasCompanyInfo && type === 'contact'){
				vm.$refs.companyForm.validate(function(valid) {
					if (valid) {
						actions.setAnicerData(vm.$store,vm.companyForm);
						actions.controlAnicer(vm.$store,{step:type});
					}else {
					    return false;
					}
				});
			}else {
				actions.controlAnicer(vm.$store,{step:type});
			}
		},
		handleLegalReprIdImageSuccess(response,file, fileList) {//法人身份证电子版(正面)
		    if(response.code === 200){
		        this.companyForm.legalReprIdImage = response.data.imageUrl;
			}
		},
		handleLegalReprIdBackImageSuccess(response) {//法人身份证电子版(背面)
			if(response.code === 200){
				this.companyForm.legalReprIdBackImage = response.data.imageUrl;
			}
		},
		handleBizLicenseImageSuccess(response){//营业执照副本电子版
			if(response.code === 200){
				this.companyForm.bizLicenseImage = response.data.imageUrl;
			}
		},
		handleOrgCodeImageSuccess(response){//组织机构代码副本电子版
			if(response.code === 200){
				this.companyForm.orgCodeImage = response.data.imageUrl;
			}
		},
		handleTaxRegCertImageSuccess(response){//税务登记证电子版
			if(response.code === 200){
				this.companyForm.taxRegCertImage = response.data.imageUrl;
			}
		},
		handleTaxpayerQualificationImageSuccess(response){//一般纳税人资格电子版
			if(response.code === 200){
				this.companyForm.taxpayerQualificationImage = response.data.imageUrl;
			}
		},
		handleBankAccountPermissionImageSuccess(response){//银行开户许可证电子版
			if(response.code === 200){
				this.companyForm.bankAccountPermissionImage = response.data.imageUrl;
			}
		}
	},
	watch:{
		companyFoundDate: function() {
			if (this.companyFoundDate) {
				this.companyForm.companyFoundDate = new Date(this.companyFoundDate).valueOf();
			}
		},
		bizStartDate: function() {
			if (this.bizStartDate) {
				this.companyForm.bizStartDate = new Date(this.bizStartDate).valueOf();
			}
		},
		bizEndDate: function() {
			if (this.bizEndDate) {
				this.companyForm.bizEndDate = new Date(this.bizEndDate).valueOf();
			}
		}
	}
};
</script>
<style scoped>
	.anicer-fade-enter-active, .anicer-fade-leave-active {
		transition: opacity 0.3s;
	}
	.anicer-fade-enter, .anicer-fade-leave-active {
		opacity: 0
	}
	.el-input,.el-textarea,.el-select{width: 420px;}
</style>
