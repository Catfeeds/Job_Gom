/**
 * [美号信息表单]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import React, {Component} from 'react';
import FormInput from './FormInput';
import ImgUploader from 'components/ImgUploader';
import Validator from 'util/Validator';
import fetch from 'io/fetch';

let accountData = {
	subscribe_name: {
		label: '美号昵称',
		isRequired: true,
		formType: 'input',
		name: 'subscribe_name',
		value: '',
		isDisabled: false,
		reg: 'str_2_8',
		placeholder: '请填写2-8个字昵称，好的昵称可以吸引更多的关注哦',
		msg: {
			ok: '',
			err: '请填写2-8个字昵称',
			api: '已有相同美号名称，请重新填写',
			tips: '请填写美号昵称'
		},
		showMsg:'ok',
		checkStatus:0
	},
	subscribe_description: {
		label: '美号简介',
		isRequired: true,
		formType: 'input',
		name: 'subscribe_description',
		value: '',
		isDisabled: false,
		reg: 'str_2_20',
		placeholder: '请填写2-20个字简介，可以介绍您美号的主题和特色',
		msg: {
			ok: '',
			err: '请填写2-20个字简介',
			tips: '请填写美号简介'
		},
		showMsg: 'ok'
	},
	subscribe_image: {
		label: '美号头像',
		isRequired: true,
		formType: 'image',
		name: 'subscribe_image',
		value: '',
		isDisabled: false,
		reg: 'notnull',
		placeholder: '',
		msg: {
			ok: '',
			err: '请上传美号头像',
			tips: '请上传美号头像'
		},
		showMsg: 'ok'
	}
}


class AccountInfo extends Component{
	constructor(props){
		super(props);
		this.imgUploader = null;
		this.okName = '';
		this.successName = '';
		this.makeDefaultData();
		this.state = {
			formData: accountData
        };
	}
	makeDefaultData = ()=>{
		let updateInfo = this.props.updateInfo;
		if(updateInfo){
			for(let k in accountData){
				accountData[k].value = updateInfo[k];
				if(k==='subscribe_name'){
					accountData[k].checkStatus = 1;
					this.okName = updateInfo[k];
					this.successName = updateInfo[k];
				}
			}
		}
	}
	faceChange = (info)=>{
		if(info.status == 'success' && !!info.imgUrl){
			let data = this.state.formData;
			data.subscribe_image.value = info.imgUrl;
			this.setState({
				formData: {...data}
			});
		}
	}
	submit = ()=>{
		let res = this.validateFormData(this.state.formData);
		let imgStatus = this.validateImage();
		if(res.status && imgStatus){
			let accountInfo = this._dataAdapter(res.data);
			return accountInfo;
		}
		this.setState({
			formData: {...res.data}
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
		if('subscribe_name' == name){
			data[name].checkStatus = 'ok';
		}
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

		if (!Validator(val,reg,false)) {
			this.changeShowMsg(name, 'err');
			return false;
		}

		if(name === 'subscribe_name'){
			this.checkSubscribeName(val);
		}
	}
	checkSubscribeName = (name, id=0)=>{
		if(this.okName === name || this.successName === name){
			return false;
		}
		let params = id ? {name,subscribe_id: id} : {name};
		fetch.get('/subscribe/checkSubscribeName',{params})
			.then((res)=>{
				let data = res.data;
				let formData = this.state.formData;
				if(data.code == 1){
					this.okName = name;
					formData.subscribe_name.showMsg = 'ok';
					formData.subscribe_name.checkStatus = 1;
				}else{
					formData.subscribe_name.showMsg = 'api';
					formData.subscribe_name.checkStatus = 0;
				}
				this.setState({
					formData: {...formData}
				});
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
			}else if(data[k].name === 'subscribe_name' && !data[k].checkStatus){
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
	validateImage = ()=>{
		let status = true;
		let image = this.state.formData.subscribe_image;
		let uploaderMsg = this.imgUploader.state.msg;
		if(image.value == ''){
			status = false;
			uploaderMsg == '' && this.imgUploader.setMsg(image.msg.tips);
		}
		return status;
	}
	render(){
		let formData = this.state.formData;
		let formList = [formData.subscribe_name, formData.subscribe_description];
		let avatar = formData.subscribe_image;
		return (
			<React.Fragment>
				{formList.map((v,k)=>{
						return <FormInput key={k} data={v} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
				})}
				<ImgUploader
					ref={(loader) => {this.imgUploader = loader}}
					label ={avatar.label+'：'}
					remark = {"仅支持JPG、JPEG、PNG的图片文件，且文件小于4M，像素大于340*340"}
					size={{width: 340, height: 340}}
					onChange={this.faceChange}
					checkRatio={false}
					imgUrl={formData.subscribe_image.value}
					imgType={'avatar'}
				/>
			</React.Fragment>
		)
	}
}

export default AccountInfo;