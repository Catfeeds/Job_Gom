<template>
	<div>
		<m-breadcrumb :config="breadcrumbConfig"></m-breadcrumb>
		<div class="account-main">
			<!-- amp-path-->
			<div class="amp-path"><span class="path-col"> <b>联系方式</b></span></div>
			<div v-show="isLoadingFinish" class="main-wrap contact-wrap">
				<el-form :model="user" :rules="rules" ref="contactForm" label-width="120px">
					<el-form-item label="联系人：" prop="name">
						<el-input v-model="user.name"></el-input>
					</el-form-item>
					<el-form-item label="称呼：" prop="gender">
						<el-radio-group v-model="user.gender">
							<el-radio :label="0">男士</el-radio>
							<el-radio :label="1">女士</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="手机号：" prop="tel">
						<el-input v-model="user.tel"></el-input>
					</el-form-item>
					<el-form-item label="邮箱：" prop="email">
						<el-input v-model="user.email"></el-input>
					</el-form-item>
					<el-form-item label="通信地址：" prop="address">
						<el-input type="textarea" v-model="user.address"></el-input>
					</el-form-item>
				</el-form>
				<div class="column-group btn-wrap"><a href="" class="btn btn-primary"  @click.prevent="onSubmit">提交修改</a></div>
			</div>
		</div>
	</div>
</template>
<script>
import Breadcrumb from '../../common/breadcrumb.vue';
import { ERRORMESSAGE} from '../../../help/textMessage';
import actions from 'actions';
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
					msg: '联系方式',
					link: '/#' + this.$route.path
				}]
			},
			isLoadingFinish:false,
			user:{
			    name:'',
				gender:0,
				tel:'',
				email:'',
				address:''
			},
			rules: {
				name: [
					{ required: true, message: '请输入联系人名称', trigger: 'blur'},
					{ validator: function(rule, value, callback) {
				    	let cn = value.match(/[\u4e00-\u9fa5]/g);
				    	let cnL = cn ? cn.length : 0;
				    	let len = value.normalize('NFD').length + cnL;
						if(len > 20){
							callback(new Error('最大长度不超过十个汉字'));
						}else if(/[`~!@_#$^&*()=|\d|{}':;',\[\].<>/?~！@#￥……&*（）——|{}【】‘；：”“’。，、？]/g.test(value)) {
							callback(new Error(ERRORMESSAGE.ContactWay.nameContainChar));
						}else{
							callback();
						}
					}, trigger: 'blur'}
				],
				tel: [
					{ required: true, message: '请输入手机号', trigger: 'blur'},
					{ validator: function(rule, value, callback) {
						if(!/^1\d{10}$/g.test(value)) {
							callback(new Error(ERRORMESSAGE.ContactWay.cellPhoneNumberInvalid));
						}else{
						    callback();
						}
					}
						, trigger: 'blur'}
				],
				email: [
					{ required: true, message: '请输入邮箱', trigger: 'blur'},
					{ validator: function(rule, value, callback) {
						if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(value)) {
							callback(new Error(ERRORMESSAGE.ContactWay.emailInvalid));
						}else{
						    callback();
						}
					}, trigger: 'blur'}
				]
			}
		};
	},
	created(){
	    let vm = this;
	    vm.loadData();
	},
	methods:{
		loadData(){
			let vm = this;
			Axios.get('/api/account/contact')
				.then(function(response) {
					let data = response.data;
					if(response.status === 200 && response.data.code === 200){
						vm.user.name = data.data.name;
						vm.user.gender = data.data.gender;
						vm.user.tel = data.data.mobile + '';
						vm.user.email = data.data.email;
						vm.user.address = data.data.address;
						vm.isLoadingFinish = true;
					}
				})
				.then(function(error) {
					console.log(error);
				});
		},
		onSubmit(){
			let vm = this;
			vm.$refs.contactForm.validate(function(valid){
				if(valid){
					let params = {
						name:vm.user.name,
						gender:parseInt(vm.user.gender),
						mobile:vm.user.tel,
						email:vm.user.email,
						address:vm.user.address
					};
					console.log(params);
					Axios.post('/api/account/contact',params)
						.then(function(response) {
							if(response.status === 200 && response.data.code === 200 && response.data.iserror === 0){
								console.log('success');
								actions.setUserName(vm.$store,vm.user.name);
								vm.showMessage(response.data.msg,'success');
							}else{
								console.log('fail');
								vm.showMessage(response.data.msg,'error');
							}
						})
						.catch(function(error) {
							console.log(error);
							vm.showMessage('修改失败，请稍后重试','error');
						});
				}else {
					return false;
				}
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
	components: {
		'm-breadcrumb': Breadcrumb
	}
};
</script>
<style scoped>
	.el-form-item{padding-bottom: 8px;}
	.el-input,.el-textarea{width: 420px;}
</style>
