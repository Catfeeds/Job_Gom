/**
 * [formCaptcha表单项]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import React, { Component } from 'react';
import Validator from 'util/Validator.js';
import fetch from 'io/fetch';

class FormCaptcha extends Component{
	constructor(props){
		super(props)
		this.state = {
			btnDisabled: false,
		}
		this.timer = null;
		this.sleepTime = 10;
		this.btn = null;
	}
	sendCaptcha = ()=>{
		if(this.btn.disabled){
			return false;
		}

		let api = this.props.captchaApi;
		let mobile = this.props.tel;

		if(Validator(mobile, 'tel')){
			this.btn.disabled = true;
			this.countdown();
			fetch.get(api,{
				params: {mobile}
			}).then((res)=>{
				let data = res.data;
				// nothing to do;
			})
		}
	}
	countdown = ()=>{
		let t = this.sleepTime;
		let _this = this;
		let btn = this.btn;
		clearTimeout(this.timer);
		function waite(){
			btn.value = `${t}秒后重发`;
			--t;
			if(t < 0){
				t = _this.sleepTime;
				btn.value = '获取验证码';
				btn.disabled = false;
				return false;
			}
			_this.timer = setTimeout(waite,1000);
		}
		waite();
	}
	render(){
		let data = this.props.data;
		let msg = '';
		let showMsg = false;

		if (!!data.showErr) {
			msg = ['', data.errorMsg, data.tipsMsg][data.showErr];
			showMsg = true;
		}

		return (
			<div className="form-group">
				<label>
					{data.isRequired ? <span className="color-rad">*</span> : null}
					{data.label}：
				</label>
				<div className="form-input">
					<input disabled={data.isDisabled} onChange={this.props.onChange} onFocus={this.props.onFocus} onBlur={this.props.onBlur} className="input-text input-code" type="text" name={data.name}data-reg={data.reg} placeholder={data.placeholder} value={data.value} />
					<p className={showMsg ? "error show" : "error hide"}>{msg}</p>
				</div>
				<input ref={(btn)=>this.btn=btn} type="button" onClick={this.sendCaptcha} disabled={false} className="btn " value="获取验证码" />
			</div>
		);
	}
}

export default FormCaptcha;