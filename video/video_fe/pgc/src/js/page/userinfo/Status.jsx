/**
 * [审核状态]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import React, {Component} from 'react';

const Status = (props)=>{
	let status = [
		<span key="0" className="red">审核失败</span>,
		<span key="1" className="orange">正在审核</span>,
		<span key="2" className="green">审核成功</span>
	][Number(props.status) + 1];
	return (
		<dl className="clearfix">
			<dt>{props.name}：</dt>
			<dd>
				{props.status == null ? '...' : status}
				{props.msg ? <p>{props.msg}</p> : null}
			</dd>
		</dl>
	);
}

export default Status;