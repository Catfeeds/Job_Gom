<template>
	<div>
		<h1>联系人信息</h1>
		<p class="content-p content-p-m">身份：<b>{{ person }}</b></p>
		<p class="content-p">国美Plus账户：<b>{{ gomeplusAccount }}</b></p>
		<div class="content-contacts">
			<el-form :model="contactForm" :rules="rules" ref="contactForm" label-width="400px">
				<el-form-item label="联系人：" prop="contactName">
					<el-input v-model="contactForm.contactName"></el-input>
				</el-form-item>
				<el-form-item label="称呼：" prop="contactSex">
					<el-radio-group v-model="contactForm.contactSex">
						<el-radio :label="0">男士</el-radio>
						<el-radio :label="1">女士</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机号：" prop="contactMobile">
					<el-input v-model="contactForm.contactMobile"></el-input>
				</el-form-item>
				<el-form-item label="邮箱：" prop="contactEmail">
					<el-input v-model="contactForm.contactEmail"></el-input>
				</el-form-item>
				<el-form-item label="通信地址：" prop="contactAddress">
					<el-input type="textarea" v-model="contactForm.contactAddress"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="content-form">
			<div class="form-next-unfold"><a href="" class="btn btn-gray" @click.prevent="changeStep('company')">上一步</a><!--<a href="" class="btn btn-primary" @click.prevent="saveHandler">保存</a>--><a href="" class="btn btn-primary" @click.prevent="changeStep('confirm')">下一步</a></div>
		</div>
	</div>
</template>
<script>
import store from 'store';
window.store = store;
import actions from 'actions';
window.actions = actions;
import Axios from 'utils/http';
export default{
	name:'register-contact',
	data(){
		return{
			contactForm:{
				contactName:'',
				contactSex:0,
				contactMobile:'',
				contactEmail:'',
				contactAddress:''
			},
			rules: {
				contactName: [
					{ required: true, message: '请输入联系人名称', trigger: 'blur'},
				],
				contactMobile: [
					{ required: true, message: '请输入手机号', trigger: 'blur'},
					{ validator: function(rule, value, callback) {
						if(!/^1\d{10}$/g.test(value)) {
							callback(new Error('请输入有效手机号'));
						}else{
							callback();
						}
					}
						, trigger: 'blur'}
				],
				contactEmail: [
					{ required: true, message: '请输入邮箱', trigger: 'blur'},
					{ validator: function(rule, value, callback) {
						if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(value)) {
							callback(new Error('请输入有效邮箱地址'));
						}else{
							callback();
						}
					}, trigger: 'blur'}
				],
				contactAddress:[
					{ required: true, message: '请输入通讯地址', trigger: 'blur'},
				]
			}
		};
	},
	computed:{
		person:() => store.state.anicerFormData.companyNature === '2' ? '代理商' : '入驻商家',
		gomeplusAccount:() => store.state.userInfo.mobile
	},
	methods:{
		saveHandler(){
			let vm = this;
			vm.$refs.contactForm.validate(function(valid) {
				if (valid) {
					actions.setAnicerData(vm.$store,vm.contactForm);
					Axios.post('/api/anicer',store.state.anicerFormData)
						.then(function(response) {
							if(response.status === 200 && response.data.code === 200 && response.data.iserror === 0){
								vm.showMessage(response.data.msg,'success');
							}else{
								vm.showMessage(response.data.msg,'error');
							}
						})
						.catch(function(error) {
							vm.showMessage('修改失败，请稍后重试！','error');
						});
				}else {
					return false;
				}
			});
		},
		changeStep(type){
		    let vm = this;
		    if(type === 'confirm'){
				vm.$refs.contactForm.validate(function(valid) {
					if (valid) {
						actions.setAnicerData(vm.$store,vm.contactForm);
						actions.controlAnicer(vm.$store,{isSucceed:store.state.anicerControl.isSucceed,step:type});
					}else {
						return false;
					}
				});
			}else{
				actions.controlAnicer(vm.$store,{isSucceed:store.state.anicerControl.isSucceed,step:type});
			}
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
	.el-input,.el-textarea,.el-select{width: 420px;}
</style>
