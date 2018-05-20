/**
 * [提交成功]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';

class ApplySuccess extends Component{
	constructor(props){
		super(props);
		this.timer = null;
		this.state = {
			time: 3
		}
	}
	componentDidMount(){
		let time = this.state.time;
		const countDown = ()=>{
			this.setState({time});
			time--;
			if(time < 0){
				clearTimeout(this.timer);
				this.props.history.replace('/portal/userinfo');
				return false;
			}
			this.timer = setTimeout(countDown,1000);
		}
		countDown();
	}
	render(){
		return (
			<div className="id-card4">
				<div className="upload-success">
					<div className="icon-2 icon-suc"></div>
					<div className="title">提交成功</div>
					<div className="tip">申请资料审核中，请耐心等待~</div>
					<div className="action">
						<span>{this.state.time}</span>秒后进入<Link to="/portal/userinfo">国美内容创作平台</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default ApplySuccess;