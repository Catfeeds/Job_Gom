/**
 * [协议]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, {Component} from 'react';
import fetch from 'io/fetch.js';
import { page } from 'util/phpCommon.js';

class Agreement extends Component{
	constructor(props){
		super(props)
		this.state = {
			agreementInfo: '协议内容加载中，请稍等...'
		}
	}

	updateAgreement = ()=>{
		this.setState({
			agreementInfo: window.$CONFIG.agreement
		});
	}

	componentDidMount(){
		let jsConfigDadaId = 'jsConfigDadaId';
		let $jsConfig = document.getElementById(jsConfigDadaId);
		if (!$jsConfig) {
			$jsConfig = document.createElement('script');
			$jsConfig.id = jsConfigDadaId;
			$jsConfig.src = page.jsPath + 'dist/data/agreement.js';
			$jsConfig.onload = ()=>{
				this.updateAgreement();
			}
			document.body.appendChild($jsConfig);
		}else{
			this.updateAgreement();
		}
	}

	render(){
		return (
			<div className="register-rules" dangerouslySetInnerHTML={{__html: this.state.agreementInfo}}></div>
		)
	}
}

export default Agreement;