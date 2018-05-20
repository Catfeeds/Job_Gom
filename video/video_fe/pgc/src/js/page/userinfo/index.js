/**
 * [基本资料]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import "css/page/userinfo/index.scss";
import React, { Component } from 'react';
import TabNav from './TabNav';
import AccountInfo from './AccountInfo';
import IndividualInfo from './IndividualInfo';
import FirmInfo from './FirmInfo';

class Userinfo extends Component{
	constructor(props){
		super(props);
		this.state = {
			infoType: 0
		}
	}

	tabChange = (infoType)=>{
		this.setState({infoType});
	}

	render(){
		return (
			<div className="info-wrap">
				<TabNav onChange={this.tabChange} />
				<div className="info-con">
					<AccountInfo />
				</div>
			</div>
		)
	}
}

export default Userinfo;