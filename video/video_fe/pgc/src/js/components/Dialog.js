/**
 * [rc-Dialog]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 * Dialog默认是一个只带有关闭按钮的弹窗。
 * 属性配置：
 * {
 * 		root: 'body',   // 可选，配置插槽节点，默认body
 *		visible: false, // 必选，是否显示，
 *		exist: false,   // 可选，控制是否移除节点
 *		showMask: true, // 可选，是否显示背景蒙层
 *		style: null,    // 可选，弹窗容器的行内样式
 *		title: null,    // 可选，是否显示标题，值为字符串。
 *		onClose: noop   // 可选，关闭按钮的执行方法
 * }
 */
import "css/components/dialog.scss";

import React, { Component } from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

let noop = function(){};

class DialogConponent extends Component{
	
	constructor(props){
		super(props);
		this.root = document.querySelector(this.props.root);
		this.state = {
			visible: this.props.visible,
			exist: this.props.exist
		}
	}

	onClose = ()=>{
		this.setState({
			visible: false
		}, ()=>{
			this.props.onClose();
		})
	}

	componentWillReceiveProps({visible}){
		this.setState({ visible });
	}

	render(){
		let title = this.props.title;
		let $mask = this.props.showMask ? (<div className="dialog-mask"></div>) : null;

		if (this.state.exist) {
			return createPortal(
				<div className={this.state.visible ? "rc-dialog" : "rc-dialog-hide"}>
					{$mask}
					<div className="dialog-wrap" style={this.props.style}>
						<div onClick={this.onClose} className="dialog-close icon-19"></div>
						{title ? (<div className="dialog-header">{title}</div>) : null}
						{this.props.children}
					</div>
				</div>,
				this.root
			)
		}else{
			if (this.state.visible) {
				return createPortal(
					<div className="rc-dialog">
						{$mask}
						<div className="dialog-wrap" style={this.props.style}>
							<div onClick={this.onClose} className="dialog-close icon-19"></div>
							{title ? (<div className="dialog-header">{title}</div>) : null}
							{this.props.children}
						</div>
					</div>,
					this.root
				)
			}else{
				return null;
			}
		}
		
		
	}
}

DialogConponent.propTypes = {
	children: PropTypes.node.isRequired,
	visible: PropTypes.bool.isRequired
}

DialogConponent.defaultProps = {
	root: 'body',
	visible: false,
	exist: false,
	showMask: true,
	style: null,
	title: null,
	onClose: noop
}

export default DialogConponent;
