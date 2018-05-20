/**
 * [权限申请]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
/* css */
import 'css/page/apply/index.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/action/apply';
import { bindActionCreators } from 'redux';

import ApplyForm from './common/ApplyForm.jsx';
import formConfig from './common/form_config.js';
import ApplyState from './ApplyState.jsx';
import FailureReason from './FailureReason.jsx';
import Notification from 'components/Notification';
import fetch from 'io/fetch.js';
import { page } from 'util/phpCommon.js';

let receiptKeys = [];
let receiptValues = [];
let applyFormData = {};

class Apply extends Component{
	constructor(props){
		super(props);
		this.formConfig = this.getFormConfig(formConfig);
	}

	getFormConfig=(data)=>{
		let temp = {};
		for(let k in data){
			temp[k] = Object.assign({},data[k]);
		}
		return temp;
	}

	componentDidMount() {
		if (this.props.pageState > -1) {
			return false;
		}
		let notification = Notification({});
		fetch.get('/apply/getApplyResult',{params:{account_id:page.account_id},loading:true})
		.then((res)=>{
			let data = res.data;
			if (data.code == 1) {
				let applyData = data.data;
				let status = applyData.status;
				if (status == 0) {
					// 未提交过申请
					this.props.actions.apply({
						pageState: 0
					});
				}else{
					// 已提交过申请
					let applyState = data.data.approve_status+'';
					let pageState;

					switch (applyState){
						case '-1':
							pageState = 2;
							applyFormData = applyData.apply_data;
							receiptKeys = Object.keys(applyData.receipt);
							receiptValues = Object.values(applyData.receipt);
							break;
						case '0':
							pageState = 1;
							break;
						case '1':
							// 整体刷新
							window.location.reload();
							break;
						default:
							// do nothing
					}
					this.props.actions.apply({
						pageState: pageState
					});
				}
				
			}else{
				// console.log('失败');
				
				notification.notice({
				    content: '数据获取失败，请稍后再试',
				    duration: 2
				});
			}
		})
		.catch((err)=>{
			// console.log(err);
			notification.notice({
			    content: '网络请求异常，请稍后再试',
			    duration: 2
			});
		});
	}

	gotoEdit(){
		this.props.actions.apply({
			pageState: 3
		});
	}

	_dataAdapter(origin={}, data={}, errs=[]){
		let tempData = Object.assign({}, origin);
		for(let k in data){
			if (k == 'type') {
				if (data[k] == 2) {
					tempData.company.isRequired = false;
					tempData.company.placeholder = '';
				}
			}
			if (k == 'production_url') {
				data.production_url.map((v, k) => {
					tempData['production_url_'+k].value = v;
					tempData['production_url_'+k].isDisabled = true;
				});
			}else{
				if (typeof tempData[k] !== 'undefined') {
					tempData[k].value = data[k];
					if (errs.indexOf(k) == -1) {
						tempData[k].isDisabled = true;
					}
				}
			}
		};
		return tempData;
	}

	render(){
		let pageState = this.props.pageState;
		let updateData = this._dataAdapter(this.formConfig, applyFormData, receiptKeys);
		switch (pageState){
			case 0:
				// 未申请
				return (
					<div className="apply-wrap">
						<ApplyForm curd={'add'} hasSubmit={true} formData={this.formConfig} />
					</div>
				)
			case 1:
				// 审核中
				return (
					<div className="apply-wrap">
						<ApplyState status={0} />
					</div>
				)
			case 2:
				// 审核失败
				return (
					<div className="apply-wrap">
						<ApplyState gotoEdit={this.gotoEdit.bind(this)} status={-1} />
					</div>
				)
			case 3:
				// 修改
				return (
					<div className="apply-wrap">
						<FailureReason reasons={receiptValues} />
						<ApplyForm curd={'update'} hasSubmit={true} formData={updateData} />
					</div>
				)
			default:
				return null;
		}
	}
}

function mapStateToProps(state){
	return Object.assign({}, state.reducers.apply);
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

let APPLY = connect(mapStateToProps, mapDispatchToProps)(Apply);

export default APPLY;