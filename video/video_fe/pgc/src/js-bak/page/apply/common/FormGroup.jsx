/**
 * [表单组]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, { Component } from 'react';
import FormRadio from './FormRadio.jsx';

class FormGroup extends Component{
	constructor(props){
		super(props);
	}

	render(){
		let data = this.props.data;

		let formInput = (t) => {
			switch (t) {
				case 'input':
					return (
						<input disabled={data.isDisabled} onChange={this.props.onChange} onFocus={this.props.onFocus} onBlur={this.props.onBlur} className="input-text" type="text" name={data.name}data-reg={data.reg} placeholder={data.placeholder} value={data.value} />
					)
					
				case 'textarea':
					return (
						<textarea disabled={data.isDisabled} onChange={this.props.onChange} onFocus={this.props.onFocus} onBlur={this.props.onBlur} className="input-textarea" name={data.name} data-reg={data.reg} placeholder={data.placeholder} value={data.value}></textarea>
					)
				default:
					// nothing
			}
		}

		let msg = '';
		let showMsg = false;

		if (!!data.showErr) {
			msg = ['', data.errorMsg, data.tipsMsg][data.showErr];
			showMsg = true;
		}

		if (data.name == 'type') {
			return (
				<FormRadio onChange={this.props.onChange} data={data}/>
			)
		}else{
			return (
				<div className="form-group">
					<label>
						<span className="color-rad">{data.isRequired ? '*' : ''}</span>
						{data.label}：
					</label>
					<div className="form-input">
						{formInput(data.formType)}
						<p className={showMsg ? "error show" : "error hide"}>{msg}</p>
					</div>
				</div>
			)
		}	
	}
}

export default FormGroup;