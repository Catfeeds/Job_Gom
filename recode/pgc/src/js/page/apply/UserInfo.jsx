/**
 * [基础资料 -- 用户信息]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import 'css/page/apply/index.scss';

import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ApplyForm from './common/ApplyForm.jsx';
import formConfig from './common/form_config.js';

import fetch from 'io/fetch';
import Notification from 'components/Notification';

import { isArray } from 'util/tools';
import { page } from 'util/phpCommon.js';

class ApplySuccess extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="apply-status-success">
				<div className="apply-status-tips">
					<div className="status-img success-img"></div>
					<div className="status-title">审核成功</div>
					<div className="status-tip">恭喜！资料审核已成功，快去 <Link to="/portal/videoUploader">上传视频</Link> 吧!</div>
				</div>
			</div>
		);
	}
}

class UserInfo extends Component{
	constructor(props){
		super(props);
		this.state = {
			userInfo: null,
			applyState: false,
			userInfo: null,
			alertVisible: false,
			alertMsg: ''
		};
	}
	componentDidMount() {
		let notification = Notification({});
		fetch.get('/apply/getApplyResult',{params:{account_id:page.account_id},loading:true})
		.then((res)=>{
			let data = res.data;
			let applyData = data.data;

			if (data.code == 1) {
				let status = applyData.status;
				if (status == 1) {
					let approveStatus = applyData.approve_status
					if (approveStatus == 1) {
						let formData = this._dataAdapter(formConfig, data.data.apply_data);
						this.setState({
							applyState: true,
							userInfo: formData
						});
						return;
					}
				}
			}
			// 否则没有否则
		})
		.catch((err)=>{
			notification.notice({
			    content: '网络请求异常，请稍后再试',
			    duration: 2
			});
		});
	}

	_dataAdapter(origin, data){

		let tempData = Object.assign({}, origin);
		for(let k in tempData){
			tempData[k].isDisabled = true;
		}
		for(let k in data){
			if (k == 'type') {
				if (data[k] == 2) {
					tempData.company.isRequired = false;
					tempData.company.placeholder = '';
				}
			}
			if (k == 'production_url' && isArray(data.production_url)) {
				data.production_url.map((v, i) => {
					tempData['production_url_'+i].value = v;
					// tempData['production_url_'+i].isDisabled = true;
				});
			}else{
				if (typeof tempData[k] !== 'undefined') {
					tempData[k].value = data[k];
					// tempData[k].isDisabled = true;
				}
			}
		};
		return tempData;
	}

	render(){
		if (!this.state.applyState) {
			return null;
		}

		return (
			<div className="apply-wrap">
				<ApplySuccess />
				<ApplyForm formData={this.state.userInfo} hasSubmit={false} />
			</div>
		)
	}
}

export default UserInfo;