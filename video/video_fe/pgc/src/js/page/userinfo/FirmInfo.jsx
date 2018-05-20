/**
 * [企业用户信息]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import React, { Component } from 'react';
import Status from './Status';

class FirmInfo extends Component{
	constructor(props){
		super(props);
		this.state = {
			infoType: 0
		}
	}

	render(){
		return (
			<div className="tab-con">
				<a href="javascript:;" className="btn-edit">修改资料</a>
				<Status name="美号信息" status="0" msg="" />
				<dl className="clearfix">
					<dt>美号昵称：</dt>
					<dd>审核失败</dd>
				</dl>
				<dl className="clearfix">
					<dt>美号简介：</dt>
					<dd>审核失败</dd>
				</dl>
				<div className="line"></div>
				<dl className="clearfix">
					<dt>美号头像：</dt>
					<dd>
						<img src="//gfs10.gomein.net.cn/T1mfCjBgLT1RCvBVdK_c126_126.jpg" className=""/>
						<img src="//gfs10.gomein.net.cn/T1mfCjBgLT1RCvBVdK_c126_126.jpg" className="img-company"/>
					</dd>
				</dl>
				<dl className="clearfix">
					<dt>美号简介：</dt>
					<dd>审核失败</dd>
				</dl>
			</div>
		)
	}
}

export default FirmInfo;