/* css */
import 'css/page/reset/index.scss';

import {
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import React, {Component} from 'react';
import Validator from 'util/Validator.js'
import fetch from 'io/fetch.js';
import {isObject} from 'util/tools.js';
import Header from 'components/Header.js';
import Footer from 'components/Footer';
import { page } from 'util/phpCommon.js';
import { setCookie } from 'util/cookie.js';
/* css */



let states = true;	//验证状态
class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
			passWord: '',
			passMsg:'',
			passError:false,
			tel: '',
			telMsg:'',
			telError:false,
			code: '',
			codeMsg:'',
			codeError:false,
			count:60,
			second:3,
        	liked:false,
        	dis: true,
        	noBtn:false,
        	step1:true,
        	step2:false,
        	step3:false,
        	stepMenu1:true,
        	stepMenu2:false,
        	stepMenu3:false,
		};
    }
    callBackMsg(msgBox){
    	if(msgBox.mobile !=""){
    		this.changeMsg(true,"tel",msgBox.mobile);
    	}
    	if(msgBox.password !=""){
    		this.changeMsg(true,"pass",msgBox.password);
    	}
    	if(msgBox.smscode !=""){
    		this.changeMsg(true,"code",msgBox.smscode);
    	}
    	if(!isObject(msgBox)){
    		this.changeMsg(true,"tel",msgBox);
    	}
    }
    changeMsg(show,errorBox,errorText){
    	switch(errorBox){
    		case "pass":
	    		this.setState({
					passMsg: errorText,
					passError: show
				});
    		break;
    		case "tel":
	    		this.setState({
					telMsg: errorText,
					telError: show
				});
    		break;
    		case "code":
	    		this.setState({
					codeMsg: errorText,
					codeError: show
				});
    		break;
    	}
    }
    handleBlur(event) {
    	const inputname = event.target.name;
    	
    	let pass = this.state.passWord;
    	let tel = this.state.tel;
    	let code = this.state.code;
    	
    	switch(inputname){
    		case "tel":
    			if(tel == ""){
    				this.changeMsg(false,"tel","");
    				this.setState({
                        noBtn: false,
                        noCode: false
                    });
    			}else if(!Validator(tel,"tel")){
		    		this.changeMsg(true,"tel","请输入正确的手机号");
		    	}else if(Validator(tel,"tel")){
		    		fetch.get('account/checkMobile',{params:{mobile:tel}})
					.then((res)=>{
						let data = res.data;
						if (data.code == 0) {
							this.changeMsg(false,"tel","");
							this.setState({
			                	noBtn: false,
			                	noCode: false
			                });
						}else{
			                if(data.data.is_register == 0){
				                this.changeMsg(true,"tel","该手机号未注册，去<a href='/#register'>注册</a>");
								this.setState({
				                	noBtn: true,
				                	noCode: true
				                });
							}else{
								this.changeMsg(false,"tel","");
								this.setState({
				                	noBtn: false,
				                	noCode: false
				                });
							}
						}
					})
					.catch((err)=>{
						console.log(err);
					});
		    	}else{
		    		this.changeMsg(false,"tel","");
		    		states = true;
		    	}
    		break;
    		case "passWord":
		    	if(pass==""){
		    		this.changeMsg(false,"pass","");
		    	}else if(!Validator(pass,"password")){
		    		this.changeMsg(true,"pass","请输入6-20个字母、数字或符号");
		    	}else{
		    		this.changeMsg(false,"pass","");
		    	}
	    	break;
    	}
	}
    handleChange(event) {
    	const name = event.target.name;
    	const value = event.target.value;
	    this.setState({
	    	[name]: value
	    });
	}
    handleClickCode(event){
    	let val = this.state.tel;
    	let tel = this.state.tel;
    	let code = this.state.code;
    	
    	//手机验证
    	if(val==""){
    		this.changeMsg(true,"tel","请输入手机号");
    	}else if(!Validator(val,"tel")){
    		this.changeMsg(true,"tel","请输入正确的手机号");
    	}else{
    		this.changeMsg(false,"tel","");
			this.setState({
            	hasTel: false,
            	noCode: false
            });
            fetch.get('account/getSmsForget',{params:{mobile:val}})
			.then((res)=>{
				let data = res.data;
				if (data.code == 1) {
					this.timer = setInterval(function () {
		            	var count = this.state.count;
		            	this.setState({
		                	liked: true
		                });
		            	count -= 1;
			            if (count < 1) {
			                this.setState({
			                	liked: false
			                });
			                count = 60;
							clearInterval(this.timer);
			            }
			            this.setState({
			                count: count
			            });
		            }.bind(this), 1000);
				}else{
					this.callBackMsg(data.message);
				}
			})
			.catch((err)=>{
				console.log(err);
			});
					
					
//  		fetch.get('account/checkMobile',{params:{mobile:tel}})
//			.then((res)=>{
//				let data = res.data;
//				if (data.code == 0) {
//					if(data.data.is_register == 1){
//						this.changeMsg(true,"tel","该手机号已注册，去<a href='/login'>登录</a>");
//						this.setState({
//		                	hasTel: true,
//		                	noCode: true
//		                });
//					}else{
//						this.changeMsg(false,"tel","");
//						this.setState({
//		                	hasTel: false,
//		                	noCode: false
//		                });
//					}
//				}else{
//					
//				}
//			})
//			.catch((err)=>{
//				console.log(err);
//			});
    	}
    }
    enterClick(event){
	    if(event.keyCode==13) {
			this.handleClick();
	    }
    }
    enterClickNext(event){
    	var ev = document.all ? window.event : event;
	    if(ev.keyCode==13) {
			this.handleClickNext();
	    }
    }
    handleClick(event) {
    	let tel = this.state.tel;
    	let code = this.state.code;
    	
    	//手机验证
    	if(tel==""){
    		this.changeMsg(true,"tel","请输入手机号");
    		states = false;
    	}else if(!Validator(tel,"tel")){
    		this.changeMsg(true,"tel","请输入正确的手机号");
    		states = false;
    	}else{
    		this.changeMsg(false,"tel","");
    		states = true;
    	}
    	
    	//验证码非空验证
    	if(code==""){
    		this.changeMsg(true,"code","请输入验证码");
    		states = false;
    	}else{
    		this.changeMsg(false,"code","");
    		states = true;
    	}
    	
    	if(states){
    		//ajax请求
    		fetch.post('account/forgetPasswd',
    		{
    			mobile:tel,
    			smscode:code
    		})
			.then((res)=>{
				let data = res.data;
				if (data.code == 1) {
					this.setState({
						step1:false,
			        	step2:true,
			        	stepMenu2:true
					});
				}else{
					this.callBackMsg(data.message);
				}
			})
			.catch((err)=>{
				console.log(err);
			});
    	}
	}
    handleClickNext(event) {
    	let pass = this.state.passWord;
    	let tel = this.state.tel;
    	
    	//密码验证
    	if(pass==""){
    		this.changeMsg(true,"pass","请输入密码");
    		states = false;
    	}else if(!Validator(pass,"password")){
    		this.changeMsg(true,"pass","请输入6-20个字母、数字或符号");
    		states = false;
    	}else{
    		this.changeMsg(false,"pass","");
    		states = true;
    	}
    	
    	if(states){
    		//ajax请求
    		fetch.post('account/forgetSetPasswd',
    		{
    			mobile:tel,
    			password:pass
    		})
			.then((res)=>{
				let data = res.data;
				if (data.code == 1) {
					this.setState({
						step2:false,
			        	step3:true,
			        	stepMenu3:true
					});
					// 页面并没有用户相关信息，接口也未返回相应数据。
					/*setCookie('accountId',page.account_id);
					setCookie('username',page.username);*/
					this.timer = setInterval(function () {
                        var second = this.state.second;
                        second -= 1;
                        if (second < 1) {
                            clearInterval(this.timer);
                            window.location.href = "/portal";
                        }
                        this.setState({
                            second: second
                        });
                    }.bind(this), 1000);
				}else{
					this.callBackMsg(data.message);
				}
			})
			.catch((err)=>{
				console.log(err);
			});
    	}
	}
    render() {
        
    	let imgPath = $CONFIG['jsPath'] + "dist/imgs/public/login-head.png";
    	
    	let text = this.state.liked ? this.state.count + '秒后重发' : '发送验证码';
        let cname = this.state.liked ? 'btn disable' : 'btn ';
        
        
        let disable = false;
        if(this.state.liked || this.state.noCode){
        	disable = true;
        }else{
        	disable = false;
        }
    	
        return (
            <div className="bg-fff reset">
            	<Header />
				<div className="login-wrap reset-wrap">
					<div className="login-box">
						<div className="reset-step">
							<div className={this.state.stepMenu1 ? 'step step1 active' : 'step step1'}>
								<p>验证手机号</p>
								<span>1</span>
							</div>
							<div className={this.state.stepMenu2 ? 'step step2 active' : 'step step2'}>
								<p>设置新密码</p>
								<span>2</span>
							</div>
							<div className={this.state.stepMenu3 ? 'step step3 active' : 'step step3'}>
								<p>设置成功</p>
								<span>3</span>
							</div>
						</div>
						<div className={this.state.step1 ? 'login-form show' : 'login-form hide'}>
	                		<div className="form-group">
								<div className="form-input">
									<em className="icon-9"></em>
									<input
										className="input-text"
										name="tel"
							            type="text"
							            placeholder="手机号"
							            value={this.state.tel}
							            onBlur={this.handleBlur.bind(this)}
							            onKeyDown={this.enterClick.bind(this)}
							            onChange={this.handleChange.bind(this)} />
									<p className={this.state.telError ? "error show" : "error hide"} data-msg="name" dangerouslySetInnerHTML={{__html:this.state.telMsg}}></p>
								</div>
							</div>
							<input
								className="hide"
								name="code"
					            type="text"
					            value=""/>
							<div className="form-group">
								<div className="form-input">
									<em className="icon-11"></em>
									<input
										className="input-text input-code"
										name="code"
							            type="text"
							            placeholder="验证码"
							            value={this.state.code}
							            onKeyDown={this.enterClick.bind(this)}
							            onChange={this.handleChange.bind(this)} />
									<p className={this.state.codeError ? "error show" : "error hide"} data-msg="name">{this.state.codeMsg}</p>
								</div>
								<input disabled={disable}  type="button" className={cname} onClick={this.handleClickCode.bind(this)} value={text} />
							</div>
							<div className="form-btn">
								<input
									type="button"
									value="下一步"
									disabled={this.state.noBtn ? true : false}
						            onClick={this.handleClick.bind(this)}
									className={this.state.noBtn ? "btn btn-block disable" : "btn btn-block"} />
							</div>
						</div>
						<div className={this.state.step2 ? 'login-form show' : 'login-form hide'}>
		                	<div className="form-group">
								<div className="form-input">
									<em className="icon-8"></em>
									<input
										className="input-text"
										name="tel"
							            type="text"
							            placeholder="手机号"
							            disabled="true"
							            value={this.state.tel}/>
									<p className={this.state.telError ? "error show" : "error hide"} data-msg="name" dangerouslySetInnerHTML={{__html:this.state.telMsg}}></p>
								</div>
							</div>
							<div className="form-group">
								<div className="form-input">
									<em className="icon-10"></em>
									<input
										className="input-text"
							            type="password"
							            name="passWord"
							            placeholder="密码（6-20个字母、数字或符号）"
							            value={this.state.passWord}
							            onKeyDown={this.enterClickNext.bind(this)}
							            onChange={this.handleChange.bind(this)} />
									<p className={this.state.passError ? "error show" : "error hide"} data-msg="pass">{this.state.passMsg}</p>
								</div>
							</div>
							<div className="form-btn">
								<input
									type="button"
									value="下一步"
						            onClick={this.handleClickNext.bind(this)}
									className="btn btn-block" />
							</div>
						</div>
						<div className={this.state.step3 ? 'login-form show' : 'login-form hide'}>
							<div className="reset-state">
								<em className="icon-2"></em>
								<span>重置密码成功</span>
								<p><span>{this.state.second}</span>秒后，即将进入<a href="/portal">国美视频管理平台首页</a></p>
							</div>
						</div>
					</div>
				</div>
                <div className="footer login-f">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Reset;