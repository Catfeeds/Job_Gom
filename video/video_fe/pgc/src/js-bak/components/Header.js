/**
 * [头部]
 * @return {[type]} [description]
 */
import React, {PropTypes} from 'react';
// import routes from '../router/navigation.jsx';
import { page } from 'util/phpCommon.js';
import fetch from 'io/fetch';
import Notification from 'components/Notification';
import {
    Route,
    Link
} from 'react-router-dom';

import { deleteCookie, getCookie } from 'util/cookie.js';

class Header extends React.Component{

	constructor(props){
		super(props);
	}

	logout = ()=>{
		let notification = Notification({});
		fetch.get('/account/logout',{loading:true})
		.then(res=>{
			let data = res.data;
			if (data.code == 1) {
				// 删除cookie
				deleteCookie('accountId');
				deleteCookie('username');

				window.location.href = '/';
			}else{
				notification.notice({
				    content: '退出失败，请重试',
				    duration: 2
				});
			}
		})
		.catch(err=>{
			// console.log(err);
			notification.notice({
			    content: '网络请求异常，请稍后再试',
			    duration: 2
			});
		});
	}

	render() {
		let userName = page.username;
		let logoImg = page.jsPath+'dist/imgs/public/logo.png?v2.0.0';
		let isLogin = page.account_id;
		let url = '/';

		if (typeof isLogin === 'undefined') {
			userName = getCookie('username');
			isLogin = getCookie('accountId');
		}
		
		let userStatusTxt = (
		    	<div className="fr">
                    <a href="/">去登录</a>
                </div>
            );

		if(isLogin > 0){
		    url = "/portal";
		    userStatusTxt = (
				<div className="fr">
                    <span>{userName}</span>
                    <span className="line">|</span>
                    <a href="javascript:;" onClick={this.logout}>退出</a>
                </div>
		    );
		}

		let isUploading = location.pathname === '/portal/videoUploader';
		if (isUploading) {
			url = '/portal';
		}
		return (
			<div className="head">
				<div className="logo">
					{isUploading ? <Link to={url} ><img src={logoImg} /></Link> : <a href={url}><img src={logoImg} /></a>}
				</div>
				{userStatusTxt}
			</div>
		)
	}
}

export default Header;
