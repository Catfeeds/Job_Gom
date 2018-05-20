/**
 * [没有数据的缺省页]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import "css/components/no-data.scss";
import React, {Component} from 'react';

const noData = (o={})=>{
	let options = {
		msg: '网络连接出错了，请稍后重试',
		btnVal: '点击重试',
		onClick: ()=>{}
	}
	Object.assign(options,o);
	return (
		<div className="no-data-wrap">
			<p className="no-data-msg">{options.msg}</p>
			<button className="btn no-data-btn" onClick={options.onClick}>{options.btnVal}</button>
		</div>
	)
}

export default noData;