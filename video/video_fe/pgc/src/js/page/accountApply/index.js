/**
 * [美号申请]
 * @Author: XXX
 * @Email:  xxx@gomeplus.com
 */
import 'css/page/identity/index.scss';
import React, { Component } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import StepNav from './StepNav';
import AccountType from './AccountType';
import IndividualInfo from './IndividualInfo';
import FirmInfo from './FirmInfo';
import AccountInfo from './AccountInfo';
import ApplySuccess from './ApplySuccess';
import fetch from 'io/fetch';
import toast from 'components/Toast';
import {page} from 'util/phpCommon';

class AccountApply extends Component{
	constructor(props){
		super(props);
		this.formData = {};
		this.submitting = false;
		this.state = {
			step: 1,
			type: 0,
		}
	}
	getAccountType = (type)=>{
		this.formData.type = type;
		this.setState({
			step: 2,
			type: type,
		});
	}
	getUserInfo = (userInfo)=>{
		this.formData.userInfo = userInfo;
		this.setState({
			step: 3
		});
	}
	getAccountInfo = (accountInfo)=>{
		this.formData.accountInfo = accountInfo;
		this.submit();
	}
	adaptationSubmitData = (data)=>{
		let formData = {
			type: data.type,
			...data.userInfo,
			...data.accountInfo
		}
		return formData;
	}
	submit = ()=>{
		let formData = this.adaptationSubmitData(this.formData);
		this.isSubmitting = true;
		fetch.post('/apply/add',{...formData},{loading: true})
			.then((res)=>{
				let data = res.data;
				if(data.code == 1){
					page.approve_status = 0;
					this.setState({
						step: 4
					});
				}else{
					toast('提交失败');
				}
				console.log(res);
			})
			.catch((res)=>{
				toast('提交失败，请稍后再试');
			})
			.finally(()=>{
				this.isSubmitting = false;
			});
	}
	render(){
		let container = null;
		switch (this.state.step) {
			case 1:
				container = <AccountType getAccountType={this.getAccountType} />
				break;
			case 2:
				container = [
					null, 
					<FirmInfo getUserInfo={this.getUserInfo} />, 
					<IndividualInfo getUserInfo={this.getUserInfo} />
				][this.state.type]
				break;
			case 3:
				container = <AccountInfo getAccountInfo={this.getAccountInfo} />;
				break;
			case 4:
				container = <ApplySuccess {...this.props} />;
				break;
			default:
				container = null;
		}
		return (
			<React.Fragment>
				<Header />
				<div className="id-wrap">
                	<div className="id-w1200">
						<StepNav step={this.state.step} />
						{container}
					</div>
				</div>
				<Footer type="body" />
			</React.Fragment>
		)
	}
}

export default AccountApply;