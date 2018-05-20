/**
 * [企业 - 用户信息填写]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, {Component} from 'react';
import firmData from './firmData.js';
import FormInput from './FormInput';
import FormCaptcha from './FormCaptcha';
import FormLicense from './FormLicense';
import fetch from 'io/fetch';
import Validator from 'util/Validator';

const ItemTitle = ({title})=>{
	return (
		<div className="form-group">
			<label></label>
			<div className="form-input">
				<div className="title">{title}</div>
			</div>
		</div>
	)
}

class FirmInfo extends Component{
	constructor(props){
		super(props);
		this.captchaApi = '/account/getSmsForget';
		this.defaultMobile = 0;
		this.state = {
			formData: firmData
		}
	}
	getRegisterMobile = ()=>{
		fetch.get('/apply/getRegisterMobile').then((res)=>{
			let data = res.data;
			if(1 == data.code){
				this.defaultMobile = data.data.mobile;
				let formData = this.state.formData;
				let mobileValue = formData.mobile.value.trim();
				if(mobileValue == ''){
					formData.mobile.value = data.data.mobile;
					formData.mobile.showMsg = 'ok';
					this.setState({
						formData: {...formData}
					},()=>{
						this.checkMobile();
					});
				}else{
					if (Validator(mobileValue,'tel')) {
						this.checkMobile();
					}
				}
			}
		});
	}
	checkMobile = ()=>{
		let formData = this.state.formData;
		let smscodeVisible = this.defaultMobile !== formData.mobile.value.trim();
		let smscode = formData.smscode;
		smscode.visible = smscodeVisible;
		smscode.isRequired = smscodeVisible;
		smscode.reg = smscodeVisible ? 'smscode' : 'ignore';
		smscodeVisible || (smscode.value = '');
		formData.smscode = smscode;
		this.setState({
			formData:{...formData}
		});
	}
	nextStep = ()=>{
		let res = this.validateFormData(this.state.formData);
		this.setState({
			formData: {...res.data}
		},()=>{
			if(res.status){
				let userInfo = this._dataAdapter(res.data);
				this.props.getUserInfo(userInfo);
			}
		});
	}
	_dataAdapter = (data)=>{
		let tempData = {};
		for(let k in data){
			tempData[k] = data[k].value.trim();
		};
		return tempData;
	}
	changeShowMsg = (name, val)=>{
		let data = this.state.formData;
		data[name].showMsg = val;
		this.setState({
			formData: {...data}
		});
	}

	onFocus = (e)=>{
		let el = e.target;
		let name = el.name;
		this.changeShowMsg(name, 'ok');
	}

	onChange = (e)=>{
		let el = e.target;
		let name = el.name;
		let val = el.value;
		let data = this.state.formData;
		data[name].value = val;
		this.setState({
			formData: {...data}
		});
	}

	onBlur = (e)=>{
		let el = e.target;
		let name = el.name;
		let val = el.value;
		let reg = el.dataset.reg;

		if(val.trim() === ''){
			this.changeShowMsg(name, 'tips');
			return false;
		}

		if (!Validator(val,reg)) {
			this.changeShowMsg(name, 'err');
		}

		if('mobile' === name && Validator(val.trim(),reg)){
			this.checkMobile();
		}
	}
	licenseChanged = (info)=>{
		let data = this.state.formData;
		data.business_license_img.value = info.imgUrl;
		if(!info.msg && !info.imgUrl){
			data.business_license_img.showMsg = 'ok';
		}
		this.setState({
			formData: {...data}
		});
	}
	validateFormData = (data)=>{
		let status = true;
		for(let k in data){
			if (!Validator(data[k].value, data[k].reg) && data[k].isRequired) {
				if (data[k].value === '') {
					data[k].showMsg = 'tips';
				}else{
					data[k].showMsg = 'err';
				}
				status = false;
			}else{
				data[k].showMsg = 'ok';
			}
		}
		return {
			status,
			data
		};
	}
	componentDidMount(){
		this.getRegisterMobile();
	}
	render(){
		let formData = Object.values(this.state.formData);
		let userData = formData.slice(0,7);
		let companyData = formData.slice(7);
		return (
			<div className="id-card5">
				<ItemTitle title="联系人信息" />
				{userData.map((v,k)=>{
					if(!v.visible){
						return null;
					}
					if(v.formType === 'captcha'){
						return <FormCaptcha tel={this.state.formData.mobile.value} captchaApi={this.captchaApi} key={k} data={v} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
					}else{
						return <FormInput key={k} data={v} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
					}
				})}
				<ItemTitle title="公司信息" />
				{companyData.map((v,k)=>{
					if(v.formType === 'image'){
						return <FormLicense key={k} data={v} onChange={this.licenseChanged} />
					}else{
						return <FormInput key={k} data={v} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
					}
				})}
				<div className="btn-next2">
					<input type="button" onClick={this.nextStep} value="下一步" className="btn btn-block" />
				</div>
			</div>
		);
	}
}

export default FirmInfo;