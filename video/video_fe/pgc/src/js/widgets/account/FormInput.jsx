/**
 * [formInput表单项]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import React, { Component } from 'react';

class FormInput extends Component{
	constructor(props){
		super(props)
	}
	render(){
		let data = this.props.data;
		let showMsg = data.showMsg;
		let msg = data.msg[showMsg];

		return (
			<div className="form-group">
				<label>
					{data.isRequired ? <span className="color-rad">*</span> : null}
					{data.label}：
				</label>
				<div className="form-input">
					<input disabled={data.isDisabled} onChange={this.props.onChange} onFocus={this.props.onFocus} onBlur={this.props.onBlur} className="input-text" type="text" name={data.name} data-reg={data.reg} placeholder={data.placeholder} value={data.value} />
					<p className={showMsg !== 'ok' ? "error show" : "error hide"}>{msg}</p>
				</div>
			</div>
		);
	}
}

export default FormInput;