/**
 * [个体 - 用户信息填写]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, {Component} from 'react';
import FormInput from './FormInput';
import Validator from 'util/Validator.js';

class IndividualInfo extends Component{
	constructor(props){
		super(props);
		this.state = {
			formData: {
				truename: {
					label: '真实姓名',
					isRequired: true,
					formType: 'input',
					name: 'truename',
					value: '',
					isDisabled: false,
					reg: 'notnull',
					placeholder: '请输入真实姓名，以便更好确认身份',
					msg: {
						ok: '',
						err: '',
						tips: '请输入真实姓名'
					},
					showMsg: 'ok'
				},
				identity_card: {
					label: '身份证号',
					isRequired: true,
					formType: 'input',
					name: 'identity_card',
					value: '',
					isDisabled: false,
					reg: 'identity',
					placeholder: '请输入真实身份证号，以便更好确认身份',
					msg: {
						ok: '',
						err: '请输入正确的身份证号码',
						tips: '请输入身份证号'
					},
					showMsg: 'ok'
				},
				wechat: {
					label: '微信号',
					isRequired: false,
					formType: 'input',
					name: 'wechat',
					value: '',
					isDisabled: false,
					reg: 'ignore',
					placeholder: '',
					msg: {
						ok: '',
						err: '',
						tips: ''
					},
					showMsg: 'ok'
				}
			}
		}
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

		if (!Validator(val,reg,false)) {
			this.changeShowMsg(name, 'err');
		}
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
	render(){
		let formData = Object.values(this.state.formData);
		return (
			<div className="id-card2">
				{formData.map((v, k)=>{
					return <FormInput key={k} data={v} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
				})}
				<div className="btn-next2">
					<input type="button" value="下一步" onClick={this.nextStep} className="btn btn-block" />
				</div>
			</div>
		)
	}
}

export default IndividualInfo;