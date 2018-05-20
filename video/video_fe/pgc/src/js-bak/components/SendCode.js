/**
 *
 Created by sunguang on 2017/8/8.
 Email: sunguang@gomeplus.com

 用法：
     参数：
         1. visible: true/false，true是显示弹出框，false是隐藏弹出框
         2. msg: 弹出框说明
         3. onClose:  右上角关闭按钮
 */
import React, {Component} from 'react';
import Validator from 'util/Validator.js';
class SendCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	code: '',
        	count:10,
        	liked:true,
        	dis: true
    	};
    }
    handleChange(event) {
    	this.setState({code: event.target.value});
	}
    handleClick(event){
    	let val = this.props.val;
    	let msg = this.props.msg;
    	//手机验证
    	if(val==""){
    		msg(true,"tel","请输入手机号");
    	}else if(!Validator(val,"tel")){
    		msg(true,"tel","手机号出错");
    	}else{
    		msg(false,"tel","");
            this.timer = setInterval(function () {
            	var count = this.state.count;
            	this.state.liked = false;
            	count -= 1;
	            if (count < 1) {
	                this.setState({
	                	liked: true
	                });
	                count = 60;
					clearInterval(this.timer);
	            }
	            this.setState({
	                count: count
	            });
            }.bind(this), 1000);
    	}
    }
    render() {
        let text = this.state.liked ? '发送验证码' : this.state.count + '秒后重发';
        let cname = this.state.liked ? 'btn ' : 'btn disable';
        let dis = this.state.liked ? false : true;
        return(
        	<div className="form-group">
				<div className="form-input">
					<em className="icon-11"></em>
					<input
						className="input-text input-code"
						name="code"
			            type="text"
			            placeholder="验证码"
			            value={this.state.code}
			            onChange={this.handleChange.bind(this)} />
					<p className={this.state.codeError ? "error show" : "error hide"} data-msg="name">{this.state.codeMsg}</p>
				</div>
				<input disabled={dis} type="button" className={cname} onClick={this.handleClick.bind(this)} value={text} />
			</div>
		)
    }
}

export default SendCode;