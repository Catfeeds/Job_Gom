/**
 * [申请资料审核状态]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, { Component } from 'react';
import {
    Route,
    Link
} from 'react-router-dom';

class ApplyState extends Component{
	constructor(props){
		super(props);
	}


	render(){

		let status = this.props.status;

		let FailTips = <span>资料审核失败，快去 <a onClick={this.props.gotoEdit} href="javascript:;">修改审核资料</a> 吧!</span>;

		let statusConfig = {
			'0':{
				imgClass: 'received-img',
				title:'提交成功',
				tips: '申请资料审核中，请耐心等待...'
			},
			'-1':{
				imgClass: 'fail-img',
				title:'审核失败',
				tips: FailTips
			}
		};

		let rs = statusConfig[status];

		return (
			<div className="apply-content">
				<div className="apply-status-tips">
					<div className={"status-img " + rs.imgClass}></div>
					<div className="status-title">{rs.title}</div>
					<div className="status-tip">{rs.tips}</div>
				</div>
			</div>
		)
	}
}

export default ApplyState;