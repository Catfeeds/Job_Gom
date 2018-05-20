/**
 * [申请流程导航]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import React, { Component } from 'react';

class StepNav extends Component{
	constructor(props){
		super(props);
	}
	getStepCls(order, active){
		return active >= order ? `step step${order} active`: `step step${order}`
	}
	render(){
		let step = this.props.step;
		return (
			<div className="id-step">
				<div className={this.getStepCls(1,step)}>
					<p>请选择入驻类型</p>
					<span>1</span>
				</div>
				<div className={this.getStepCls(2,step)}>
					<p>用户信息填写</p>
					<span>2</span>
				</div>
				<div className={this.getStepCls(3,step)}>
					<p>美号信息填写</p>
					<span>3</span>
				</div>
				<div className={this.getStepCls(4,step)}>
					<p>申请成功</p>
					<span>4</span>
				</div>
			</div>
		)
	}
}

export default StepNav;