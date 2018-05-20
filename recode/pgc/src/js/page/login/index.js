import React, { Component } from 'react';
/* css */
import 'css/page/login/index.scss';
import {
    Link
} from 'react-router-dom';
import Validator from 'util/Validator.js'
import fetch from 'io/fetch.js';
import Toast from 'components/Toast';
import {store, history} from 'store';
import * as cookie from 'util/cookie';
import {isObject} from 'util/tools.js';

let states = true;	//验证状态


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	userName: '',
			userMsg:'',
			userError:false,
			passWord: '',
			passMsg:'',
			passError:false,
			tel: '',
			telMsg:'',
			telError:false,
			code: '',
			codeMsg:'',
			codeError:false,
			showError: false,
			showCode: false,
			codeImg:''
		};
    }
    callBackMsg(msgBox){
    	if(msgBox.username != ""){
    		if(msgBox.username === '账号或密码出错'){
    			this.changeMsg(true, "pass", msgBox.username);
    		} else {
    			this.changeMsg(true, "user", msgBox.username);
    		}
    	}
    	if(msgBox.password && msgBox.password != ""){
    		this.changeMsg(true,"pass",msgBox.password);
    	}
    	if(msgBox.imagecode && msgBox.imagecode != ""){
    		this.changeMsg(true,"code",msgBox.imagecode);
    	}
    	if(!isObject(msgBox)){
    		this.changeMsg(true, "pass", msgBox);
    	}
    }
    changeMsg(show,errorBox,errorText){
    	switch(errorBox){
    		case "user":
	    		this.setState({
					userMsg: errorText,
					userError: show
				});
    		break;
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
    handleChange(event) {
    	const name = event.target.name;
    	const value = event.target.value;
	    this.setState({
	    	[name]: value
	    });
	}
    enterClick(event){
	    if(event.keyCode==13) {
			this.handleClick();
	    }
    }
    changeImgCode(event) {
    	fetch.get('account/getCaptcha')
		.then((res)=>{
			let data = res.data;
			if (data.code == 1) {
				this.setState({
					codeImg: data.data.image
				});
			}else{
				console.log('失败');
			}
		})
		.catch((err)=>{
			console.log(err);
		});
	}
    handleClick(event) {
    	let name = this.state.userName;
    	let pass = this.state.passWord;
    	let code = this.state.code;
    	
    	
    	
    	
    	//用户名非空验证
    	if(name==""){
    		this.changeMsg(true,"user","请输入账号");
    		states = false;
    		return;
    	}else if(Validator(name,"tel")){
			this.changeMsg(false,"user","");
    		states = true;
    	}else if(Validator(name,"account")){
			this.changeMsg(false,"user","");
    		states = true;
    	}else{
    		this.changeMsg(false,"user","");
    		this.changeMsg(true,"pass","账号或密码出错");
    		states = false;
    	}
    	
    	//密码非空验证
    	if(pass==""){
    		this.changeMsg(true,"pass","请输入密码");
    		states = false;
    		return;
    	}else if(!Validator(pass,"password")){
    		this.changeMsg(true,"pass","账号或密码出错");
    		states = false;
    	}else{
    		this.changeMsg(false,"pass","");
    		states = true;
    	}
    	
    	
    	if(this.state.showCode){
    		if(code==""){
	      		this.changeMsg(true,"code","请输入验证码");
	      		states = false;
	      		return;
	    	}
    		else{
    			this.changeMsg(false,"code","");
    			states = true;
    		}
    	}
    	
    	if(states){
    		let that = this;
    		fetch.post('account/login',
    		{
    			username:name,
    			password:pass,
    			imagecode:code
    		})
			.then((res)=>{
				let data = res.data;
				if (data.code == 1) {
					//成功后的处理
					window.location.href = "/";
				}else{
					//显示图片验证码
					if(data.data.is_display_captcha == 1){
						fetch.get('account/getCaptcha')
						.then((res)=>{
							let data = res.data;
							if (data.code == 1) {
								that.setState({
									codeImg: data.data.image,
									showCode: true
								});
							}
						})
						.catch((err)=>{
							console.log(err);
						});
					}else{
						this.setState({
							showCode: false
						});
					}
					//失败错误提示
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
        return (
            <div>
            	<div className="login-head">
					<img src={imgPath}/>
				</div>
				<div className="login-wrap">
					<div className="login-box">
						<div className="login-form">
							<h2>登录</h2>
		                	<div className="form-group">
								<div className="form-input">
									<em className="icon-8"></em>
									<input
										className="input-text"
										name="userName"
							            type="text"
							            placeholder="手机号/账号"
							            onKeyDown={this.enterClick.bind(this)}
							            value={this.state.userName}
							            onChange={this.handleChange.bind(this)} />
									<p className={this.state.userError ? "error show" : "error hide"} data-msg="name">{this.state.userMsg}</p>
								</div>
							</div>
							<div className="form-group">
								<div className="form-input">
									<em className="icon-10"></em>
									<input
										className="input-text"
							            type="password"
							            name="passWord"
							            placeholder="密码"
							            onKeyDown={this.enterClick.bind(this)}
							            value={this.state.passWord}
							            onChange={this.handleChange.bind(this)} />
									<p className={this.state.passError ? "error show" : "error hide"} data-msg="pass">{this.state.passMsg}</p>
								</div>
							</div>
							<div className={this.state.showCode ? "form-group show" : "form-group hide"}>
								<div className="form-input">
									<em className="icon-11"></em>
									<input
										className="input-text code"
							            type="text"
							            name="code"
							            placeholder="验证码"
							            onKeyDown={this.enterClick.bind(this)}
							            value={this.state.code}
							            onChange={this.handleChange.bind(this)} />
									<p className={this.state.codeError ? "error show" : "error hide"} data-msg="pass">{this.state.codeMsg}</p>
								</div>
								<img className="code-img" src={this.state.codeImg} />
								<span className="code-change" onClick={this.changeImgCode.bind(this)}>换一张</span>
							</div>
							<div className="form-btn">
								<input
									type="button"
									value="登录"
						            onClick={this.handleClick.bind(this)}
									className="btn btn-block" />
							</div>
							<div className="login-link">
								<Link to="/portal/reset">忘记密码</Link>
								<span>|</span>
								<Link to="/#register">立即注册</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="footer login-f">
                    Copyright © 2015-2017 美信网络技术有限公司版权所有
                </div>
            </div>
        )
    }
}

export default Login;