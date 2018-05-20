/**
 * [美号信息]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import React, {Component} from 'react';
import Status from './Status';
import fetch from 'io/fetch';
import converThumbnail from 'util/convertThumbnail';
import NoData from 'components/NoData';
import Dialog from 'components/Dialog';
import AccountForm from 'widgets/account/AccountForm';

class AccountInfo extends Component{
	constructor(props){
		super(props);
		this.isFetching = false;
		this.accountForm = null;
		this.updateInfo = {};
		this.state = {
			accountInfo: {
				subscribe_id: 0,
				approve_status: null,
				name: '',
				description:'',
				image: '',
				approveFailMsg: ''
			},
			isFetchData: true,
			fetchErrTips: '',
			visible: false
		};
	}
	makeUpdateInfo = (data)=>{
		this.updateInfo.subscribe_name = data.name;
		this.updateInfo.subscribe_description = data.description;
		this.updateInfo.subscribe_image = data.image;
	}
	fetchData = ()=>{
		if(this.isFetching){
			return false;
		}
		this.isFetching = true;
		fetch.get('/subscribe/detail',{},{loading: true})
			.then((res)=>{
				let data = res.data;
				if(data.code == 1){
					this.setState({
						accountInfo: {...data.data},
						isFetchData: true
					});
					this.makeUpdateInfo(data.data);
				}else{
					this.setState({
						isFetchData: false,
						fetchErrTips: '信息获取失败，请稍后重试'
					});
				}
			}).catch(()=>{
				this.setState({
					isFetchData: false,
					fetchErrTips: '网络连接失败，请稍后重试'
				});
			}).finally(()=>{
				this.isFetching = false;
			});
	}
	onUpdate = ()=>{
		this.setState({
			visible: true
		});
	}
	updateSubmit = ()=>{
		let accountInfo = this.accountForm.submit();
		console.log(accountInfo);
	}
	updateCancel = ()=>{
		this.setState({
			visible: false
		});
	}
	componentDidMount(){
		this.fetchData();
	}
	render(){
		let info = this.state.accountInfo;
		let fetchErrTips = this.state.fetchErrTips;
		let omit = '...';
		if (!this.state.isFetchData){
			return <NoData msg={fetchErrTips} btnVal="点击重试" onClick={this.fetchData} />
		}
		return (
			<React.Fragment>
				<div className="tab-con">
					<a href="javascript:;" onClick={this.onUpdate} className="btn-edit">修改资料</a>
					<Status name="美号信息" status={info.approve_status} msg={info.approveFailMsg} />
					<dl className="clearfix">
						<dt>美号昵称：</dt>
						<dd>{info.name || omit}</dd>
					</dl>
					<dl className="clearfix">
						<dt>美号简介：</dt>
						<dd>{info.description || omit}</dd>
					</dl>
					<dl className="clearfix">
						<dt>美号头像：</dt>
						<dd>
							{info.image ? <img src={converThumbnail(info.image)} className=""/> : omit}
						</dd>
					</dl>
				</div>
				<Dialog
					visible={this.state.visible}
					title="修改美号信息"
				>
					<div className="dialog-info">
						<AccountForm updateInfo={this.updateInfo} ref={(form)=>this.accountForm=form} />
					</div>
					<div className="dialog-footer">
						<button className="btn sure-btn" onClick={this.updateSubmit}>提交</button>
						<button className="btn cancel-btn" onClick={this.updateCancel}>取消</button>
					</div>
				</Dialog>
			</React.Fragment>
		);
	}
}

export default AccountInfo;