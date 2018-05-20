/**
 * [权限申请表单]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, { Component } from 'react';
import Validator from 'util/Validator.js';
import fetch from 'io/fetch.js';
import { connect } from 'react-redux';
// import * as loadingBoxActions from 'reduxs/action/loading_box';
import * as actions from 'reduxs/action/apply';
import { bindActionCreators } from 'redux';
import Notification from 'components/Notification';
import Item from './Item.jsx';
import { isArray } from 'util/tools';

class Form extends Component{
	constructor(props){
		super(props);
		this.state = {
			formData: this.props.formData,
			hasSubmit: this.props.hasSubmit
		};
		this.curdAPI = {
			add: '/apply/add',
			update: '/apply/edit'
		}
		this.onFocus = this.onFocus.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.submit = this.submit.bind(this);
	}

	changeShowErr(name, val){
		let data = this.state.formData;
		data[name].showErr = val;
		this.setState({
			formData: data
		});
	}

	onFocus(e){
		let el = e.target;
		let name = el.name;
		this.changeShowErr(name, 0);
	}

	onChange(e){
		let el = e.target;
		let name = el.name;
		let val = el.value;
		let data = this.state.formData;
		data[name].value = val;
		if (name === 'type') {
			if (val == 1) {
				data.company.isRequired = true;
			}else{
				data.company.isRequired = false;
			}
		}
		this.setState({
			formData: data
		});
	}

	onBlur(e){
		let el = e.target;
		let name = el.name;
		let val = el.value;
		let reg = el.dataset.reg;

		if (!Validator(val,reg,true)) {
			this.changeShowErr(name, 1);
		}
	}

	// 适配提交数据
	_dataAdapter(data, type){
		let tempData = {};
		for(let k in data){
			if (type === 'update' && data[k].isDisabled) {
				continue;
			}
			if (/^production_url_\d+$/.test(k)) {
				isArray(tempData.production_url) || (tempData.production_url = []);
				tempData.production_url.push(data[k].value.trim());
			}else{
				tempData[k] = data[k].value.trim();
			}
		};
		return tempData;
	}

	validateFormData(data){
		let status = true;
		for(let k in data){
			if (!Validator(data[k].value, data[k].reg) && data[k].isRequired) {
				if (data[k].value === '') {
					data[k].showErr = 2;
				}else{
					data[k].showErr = 1;
				}
				status = false;
			}else{
				data[k].showErr = 0;
			}
		}
		this.setState({formData: data});
		return status;
	}

	submit(){
		if (this.isFetch) {
			return false;
		}
		let notification = Notification({});
		
		let formData = this.state.formData;
		let canSubmit = this.validateFormData(formData);

		if (canSubmit) {
			let apiName = this.props.curd;
			let data = this._dataAdapter(formData, apiName);

			this.isFetch = true;
			// this.props.actions.loadingBox(true);

			fetch.post(this.curdAPI[apiName],data,{loading:true})
			.then(({data}) => {
				// this.props.actions.loadingBox(false);
				this.isFetch = false;
				if (data.code == 1) {
					this.props.actions.apply({pageState:1});
				}else{
					if (typeof data.message === 'string') {
						notification.notice({
						    content: data.message,
						    duration: 2
						});
					}else{
						this._errorFields(data.message);
					}
				}
			})
			.catch((err) => {
				// this.props.actions.loadingBox(false);
				this.isFetch = false;
				notification.notice({
				    content: '网络异常，请稍后再试',
				    duration: 2
				});
			});
		}
	}

	_errorFields(data){
		let formData = this.state.formData;
		for(let k in data){
			if (k == 'production_url') {
				continue;
			}
			formData[k].showErr = 1;
		}
		this.setState({
			formData: formData
		});
	}

	render(){
		let config = Object.values(this.state.formData);
		return(
			<div className="apply-content">
				<div className="apply-head">
					<h2>国美内容创作平台申请资料</h2>
				</div>
				<div className="apply-form">
					<Item onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} key="0" itemKey="0" itemTile="申请人资料" data={config.slice(0,4)} />
					<Item onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} key="1" itemKey="1" itemTile="联系信息" data={config.slice(4,8)} />
					<Item onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} key="2" itemKey="2" itemTile="辅助材料" data={config.slice(8,10)} />
					<Item onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} key="3" itemKey="3" data={config.slice(10)} />
					{this.state.hasSubmit ? <SubmitBtn onClick={this.submit} /> : null}
				</div>
			</div>
		)
	}
}


class SubmitBtn extends Component{
	render(){
		return (
			<div className="apply-submit">
				<button onClick={this.props.onClick} className="btn">提交审核</button>
			</div>
		)
	}
}


function mapDispatchToProps(dispatch) {
	// let actions = Object.assign({},loadingBoxActions,applyActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

let ApplyForm = connect(null, mapDispatchToProps)(Form);

export default ApplyForm;