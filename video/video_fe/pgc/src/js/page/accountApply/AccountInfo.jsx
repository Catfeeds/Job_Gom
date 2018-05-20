/**
 * [美号信息填写]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, {Component} from 'react';
import AccountForm from 'widgets/account/AccountForm';


class AccountInfo extends Component{
	constructor(props){
		super(props);
		this.accountForm = null;
	}
	nextStep = ()=>{
		let accountInfo = this.accountForm.submit();
		this.props.getAccountInfo(accountInfo);
	}
	render(){
		let formData = this.state.formData;
		let formList = [formData.subscribe_name, formData.subscribe_description];
		let avatar = formData.subscribe_image;
		return (
			<div className="id-card3">
				<AccountForm ref={(form)=>this.accountForm = form} />
				<div className="btn-next2">
					<input type="button" onClick={this.nextStep} value="提交" className="btn btn-block" />
				</div>
			</div>
		)
	}
}

export default AccountInfo;