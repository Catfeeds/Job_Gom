/**
 * [后台欢迎页，空白首页]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {page} from 'util/phpCommon';

class Welcome extends Component {
	constructor(props){
		super(props);
	}
	render(){
		let toUrl = '/portal/publishContent/publishArticle';

		if (page.approve_status !== "1") {
		    toUrl = '/portal/auth';
		}

		return (<Redirect from={'/portal'} to={toUrl} />)
	}
}

export default Welcome;
