/* css */
import 'css/page/register/index.scss';
import 'css/page/login/index.scss';
import {
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import React, {Component} from 'react';
import Validator from 'util/Validator.js';
import fetch from 'io/fetch.js';
import Dialog from 'components/Dialog';
import Agreement from './Agreement.js';
import ReactDOM from 'react-dom';
import {isObject} from 'util/tools.js';

import { setCookie } from 'util/cookie.js';


//showModal(<Toast visible={true} msg="删除成功"/>);

const showModal=(App, delay)=>{
    setTimeout(()=>{
        ReactDOM.render(App,
            document.getElementById('vm-dialog'));
    }, delay || 0);
}

let states = true;  //验证状态
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userMsg:'',
            userError:false,
            userMessge:this.props.userMeesge,
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
            liked:false,
            noCode:false,
            hasUser:false,
            hasTel:false,
            showAgreement: false
        };
    }
    callBackMsg(msgBox){
        if(msgBox.username !=""){
            this.changeMsg(true,"user",msgBox.username);
        }
        if(msgBox.password !=""){
            this.changeMsg(true,"pass",msgBox.password);
        }
        if(msgBox.mobile !=""){
            this.changeMsg(true,"tel",msgBox.mobile);
        }
        if(msgBox.smscode !=""){
            this.changeMsg(true,"code",msgBox.smscode);
        }
        if(!isObject(msgBox)){
            this.changeMsg(true,"code",msgBox);
        }
    }
    enterClick(event){
        if(event.keyCode==13) {
            this.handleClick();
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
    showDialog(){
        showModal(
            <Dialog
                exist={true}
                visible={true}
                title="国美内容创作平台服务协议"
                style={{ width: 900}}
            >
                <Agreement />
            </Dialog>
        );
    }
    handleFocus(event){
        let inputname = event.target.name;
        if(inputname == "userName"){
            this.setState({
                userMessge: true
            });
        }else{
            this.setState({
                userMessge: false
            });
        }
    }
    handleBlur(event) {
        const inputname = event.target.name;
        
        let name = this.state.userName;
        let pass = this.state.passWord;
        let tel = this.state.tel;
        let code = this.state.code;
        
        switch(inputname){
            case "userName":
                if(name == ""){
//                  this.setState({
//                      userMessge: false
//                  });
                    this.changeMsg(false,"user","");
                }else if(Validator(name, 'number') || Validator(name, 'symbol') ||!Validator(name,"account")){
//                  this.setState({
//                      userMessge: true
//                  });
                    this.changeMsg(true,"user","输入信息不符合上述规则");
                }else if(Validator(name,"account")){
                    fetch.get('account/checkAccount',{params:{username:name}})
                    .then((res)=>{
                        let data = res.data;
                        if (data.code == 0) {
                            if(data.data.is_register == 1){
                                this.changeMsg(true,"user","该账号已存在，去<a href='/'>登录</a>");
                                this.setState({
                                    hasUser: true,
//                                  userMessge: false
                                });
                            }else{
                                this.changeMsg(false,"user","");
                                this.setState({
                                    hasUser: false,
//                                  userMessge: false
                                });
                            }
                        }else{
                            this.changeMsg(false,"user","");
                            this.setState({
                                hasUser: false,
//                              userMessge: false
                            });
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
                }else{
                    this.setState({
//                      userMessge: false
                    });
                    this.changeMsg(false,"user","");
                    states = true;
                }
            break;
            case "tel":
                if(tel == ""){
                    this.changeMsg(false,"tel","");
                }else if(!Validator(tel,"tel")){
                    this.changeMsg(true,"tel","请输入正确的手机号");
                }else if(Validator(tel,"tel")){
                    fetch.get('account/checkMobile',{params:{mobile:tel}})
                    .then((res)=>{
                        let data = res.data;
                        if (data.code == 0) {
                            if(data.data.is_register == 1){
                                this.changeMsg(true,"tel","该手机号已注册，去<a href='/'>登录</a>");
                                this.setState({
                                    hasTel: true,
                                    noCode: true
                                });
                            }else{
                                this.changeMsg(false,"tel","");
                                this.setState({
                                    hasTel: false,
                                    noCode: false
                                });
                            }
                        }else{
                            this.changeMsg(false,"tel","");
                            this.setState({
                                hasTel: false,
                                noCode: false
                            });
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
            this.changeMsg(true,"tel","手机号出错");
        }else{
            fetch.get('account/checkMobile',{params:{mobile:tel}})
            .then((res)=>{
                let data = res.data;
                if (data.code == 0) {
                    if(data.data.is_register == 1){
                        this.changeMsg(true,"tel","该手机号已注册，去<a href='/'>登录</a>");
                        this.setState({
                            hasTel: true,
                            noCode: true
                        });
                    }else{
                        this.changeMsg(false,"tel","");
                        this.setState({
                            hasTel: false,
                            noCode: false
                        });
                    }
                }else{
                    this.changeMsg(false,"tel","");
                    this.setState({
                        hasTel: false,
                        noCode: false
                    });
                    fetch.get('account/getSmsRegister',{params:{mobile:val}})
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
                }
            })
            .catch((err)=>{
                console.log(err);
            });
            
            
        }
    }
    handleClick(event) {
        let name = this.state.userName;
        let pass = this.state.passWord;
        let tel = this.state.tel;
        let code = this.state.code;
        
        
        
        
        //用户名验证
        if(name==""){
            this.setState({
                userMessge: true
            });
            this.changeMsg(true,"user","请输入账号");
            states = false;
            return;
        }else if(Validator(name, 'number') || Validator(name, 'symbol') || !Validator(name,"account")){
            this.setState({
                userMessge: true
            });
            this.changeMsg(true,"user","输入信息不符合上述规则");
            states = false;
            return;
        }else{
            this.setState({
                userMessge: false
            });
            this.changeMsg(false,"user","");
            states = true;
        }
        
        //密码验证
        if(pass==""){
            this.changeMsg(true,"pass","请输入密码");
            states = false;
            return;
        }else if(!Validator(pass,"password")){
            this.changeMsg(true,"pass","请输入6-20个字母、数字或符号");
            states = false;
            return;
        }else{
            this.changeMsg(false,"pass","");
            states = true;
        }
        
        //手机验证
        if(tel==""){
            this.changeMsg(true,"tel","请输入手机号");
            states = false;
            return;
        }else if(!Validator(tel,"tel")){
            this.changeMsg(true,"tel","请输入正确的手机号");
            states = false;
            return;
        }else{
            this.changeMsg(false,"tel","");
            states = true;
        }
        
        //验证码非空验证
        if(code==""){
            this.changeMsg(true,"code","请输入验证码");
            states = false;
            return;
        }else{
            this.changeMsg(false,"code","");
            states = true;
        }
        
        if(states){
            //ajax请求
            fetch.post('account/register',
            {
                username:name,
                password:pass,
                mobile:tel,
                smscode:code
            })
            .then((res)=>{
                let data = res.data;
                if (data.code == 1) {
                    let userInfo = data.data;
                    setCookie('accountId', userInfo.account_id);
                    setCookie('username', userInfo.username);
                    window.location.href = "/portal";
                }else{
                    this.callBackMsg(data.message);
                }
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    }
    componentWillReceiveProps(){
        this.setState({
            userMessge:this.props.userMeesge,
        });
    }
    render() {
        let text = this.state.liked ? this.state.count + '秒后重发' : '发送验证码';
        let cname = this.state.liked ? 'btn disable' : 'btn ';
        
        let noBtn = false;
        let disable = false;
        
        if(this.state.hasUser || this.state.hasTel){
            noBtn = true;
        }else{
            noBtn = false;
        }
        
        if(this.state.liked || this.state.noCode){
            disable = true;
        }else{
            disable = false;
        }
        
        
        return (
            <div>
                <div className="login-wrap">
                    <div className="login-box">
                        <div className="login-form">
                            <div className="form-group">
                                <div className="form-input">
                                    <em className="icon-8"></em>
                                    <input
                                        className="input-text"
                                        name="userName"
                                        type="text"
                                        placeholder="账号"
                                        value={this.state.userName}
                                        onFocus={this.handleFocus.bind(this)}
                                        onBlur={this.handleBlur.bind(this)}
                                        onKeyDown={this.enterClick.bind(this)}
                                        onChange={this.handleChange.bind(this)} />
                                    <div className={this.state.userMessge ? "message show" : "message hide"}>1.长度为6-20个字符，支持字母，数字及"-"、"_"<br/>2.不可以输入纯数字、纯符号</div>
                                    <p className={this.state.userError ? "error show" : "error hide"} data-msg="name" dangerouslySetInnerHTML={{__html:this.state.userMsg}}></p>
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
                                        onFocus={this.handleFocus.bind(this)}
                                        onBlur={this.handleBlur.bind(this)}
                                        onKeyDown={this.enterClick.bind(this)}
                                        onChange={this.handleChange.bind(this)} />
                                    <p className={this.state.passError ? "error show" : "error hide"} data-msg="pass">{this.state.passMsg}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-input">
                                    <em className="icon-9"></em>
                                    <input
                                        className="input-text"
                                        name="tel"
                                        type="text"
                                        placeholder="手机号"
                                        value={this.state.tel}
                                        onFocus={this.handleFocus.bind(this)}
                                        onBlur={this.handleBlur.bind(this)}
                                        onKeyDown={this.enterClick.bind(this)}
                                        onChange={this.handleChange.bind(this)} />
                                    <p className={this.state.telError ? "error show" : "error hide"} data-msg="name" dangerouslySetInnerHTML={{__html:this.state.telMsg}}></p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-input">
                                    <em className="icon-11"></em>
                                    <input
                                        className="input-text input-code"
                                        name="code"
                                        type="text"
                                        placeholder="验证码"
                                        value={this.state.code}
                                        onFocus={this.handleFocus.bind(this)}
                                        onKeyDown={this.enterClick.bind(this)}
                                        onChange={this.handleChange.bind(this)} />
                                    <p className={this.state.codeError ? "error show" : "error hide"} data-msg="name">{this.state.codeMsg}</p>
                                </div>
                                <input disabled={disable} type="button" className={cname} onClick={this.handleClickCode.bind(this)} value={text} />
                            </div>
                            <div className="form-btn">
                                <input
                                    type="button"
                                    value="注册"
                                    disabled={noBtn ? true : false}
                                    onClick={this.handleClick.bind(this)}
                                    className={noBtn ? "btn btn-block disable" : "btn btn-block"} />
                            </div>
                            <div className="login-link register-link">
                                <span className="gray">点击注册即表示您同意</span><a href="javascript:;" className="blue" onClick={this.showDialog.bind(this)}>《国美内容创作平台协议》</a>
                            </div>
                            <div id="vm-dialog"></div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Register;