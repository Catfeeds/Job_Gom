/**
 * [权限申请 - 失败原因]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, { Component } from 'react';

class FailureReason extends Component{
	constructor(props){
		super(props);
	}

	render(){

		let reasons = this.props.reasons;

		if (!reasons.length) {
			return false;
		}
		
		return (
			<div className="apply-fail">
				<h2>审核失败原因</h2>
				<p>
					{
						reasons.map((rs, k)=>{
							return (<span key={k}>{`${k+1}.`}{rs}</span>)
						})
					}
				</p>
			</div>
		)
	}
}

export default FailureReason;