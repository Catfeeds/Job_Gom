/**
 * [radio表单]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, { Component } from 'react';
import { page } from 'util/phpCommon';

class FormRadio extends Component{
	constructor(props){
		super(props);
	}

	render(){
		let radios = [];
		let data = this.props.data;
		let options = data.options;
		for(let k in options){
			radios.push(
				<label className={page.approve_status == 0 ? "apply-user-type" : "apply-user-type apply-disabled"} key={k}>
					<input disabled={data.isDisabled} onChange={this.props.onChange} type="radio" name={data.name} value={k} checked={data.value == k} />
					<i className={data.value == k ? 'icon-2' : 'icon-1'}></i>
					<span>{options[k]}</span>
				</label>
			);
		}

		return (
			<div className="form-group">
				<label>
					<span className="color-rad">{data.isRequired ? '*' : ''}</span>
					{data.label}：
				</label>
				<div className="form-input">
					{radios}
				</div>
			</div>
		)
	}
}

export default FormRadio;