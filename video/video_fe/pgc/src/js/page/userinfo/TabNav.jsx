/**
 * [信息导航选项卡]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import React, {Component} from 'react';

class TabNav extends Component{
	constructor(props){
		super(props);
		this.state = {
			type: 0
		}
	}
	onClick = (e)=>{
		let el = e.target;
		let type = el.dataset.type;
		this.setState({type},()=>{
			this.props.onChange(type);
		});
	}
	render(){
		let activeCls = "active";
		let getBtn = (title,type)=>{
			return (<a href="javascript:;"data-type={type} key={type} onClick={this.onClick} className={this.state.type == type ? activeCls : null}>{title}</a>);
		}
		return (
			<div className="info-tab">
				{getBtn('美号信息', 0)}
				{getBtn('用户信息', 1)}
			</div>
		);
	}
}

export default TabNav;