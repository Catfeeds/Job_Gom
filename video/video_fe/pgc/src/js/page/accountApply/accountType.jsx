/**
 * [入驻类型]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import toast from 'components/Toast';

class AccountType extends Component{
	constructor(props){
		super(props);
		this.state = {
			type:0
		}
	}
	selectType = (type)=>{
		this.setState({type});
	}
	nextStep = ()=>{
		let type = this.state.type;
		if(!type){
			toast('请选择入驻类型');
		}else{
			this.props.getAccountType(type);
		}
	}
	render(){
		let type = this.state.type;
		return(
			<div className="id-card1">
				<div className="id-tab">
					<a href="javascript:;" onClick={()=>{this.selectType(2)}} className={type===2?"active":null}>
						<div className="img"></div>
						<div className="text">个人自媒体</div>
					</a>
					<a href="javascript:;" onClick={()=>{this.selectType(1)}} className={type===1?"company active":"company"}>
						<div className="img"></div>
						<div className="text">企业机构</div>
					</a>
				</div>
				<div className="btn-next">
					<input type="button" value="下一步" onClick={this.nextStep} className="btn btn-block" />
				</div>
			</div>
		)
	}
}

export default AccountType;