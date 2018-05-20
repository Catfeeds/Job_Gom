/**
 *
 Created by Akesure on 2018/3/14.

 用法：
     参数：
         1. visible: true/false，true是显示弹出框，false是隐藏弹出框
         2. msg: 弹出框说明
         3. onClose:  右上角关闭按钮
 */
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.visible,
        }
    }
    onClick = () => {
        this.setState({
            visible: false
        }, function(){
            let onClose = this.props.onClose;
            onClose && onClose();
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        });
    }

    render() {
			// <Dialog visible={this.state.visible}
			// 				onClose={this.onClose}
			// 				style={this.state.style}
			// 				closeStyle="icon-19"
			// 				footer={
			// 						<a className="alert-button" onClick={this.onClose}>确定</a>
			// 				}
			// >
			// 		<p className="alert-body">{this.props.msg}</p>
			// </Dialog>
        // if (!this.state.visible) {
        //     return null;
        // } else {
        if(location.pathname === "/portal/publishContent") {
            return(
                <div className="tab-wrap clearfix">
									<NavLink to="/portal/publishContent/publishArticle" onClick={this.onClick} className="art-btn btn active" activeClassName="active">发布文章</NavLink>
									<NavLink to="/portal/publishContent/publishVideo" onClick={this.onClick} className="vid-btn btn" activeClassName="active">发布视频</NavLink>
                </div>
            );
        } else {
            return(
                <div className="tab-wrap clearfix">
                  <NavLink to="/portal/publishContent/publishArticle" onClick={this.onClick} className="art-btn btn" activeClassName="active">发布文章</NavLink>
                  <NavLink to="/portal/publishContent/publishVideo" onClick={this.onClick} className="vid-btn btn" activeClassName="active">发布视频</NavLink>
                </div>
            );
        }
        // }
    }
}

export default Tab;
