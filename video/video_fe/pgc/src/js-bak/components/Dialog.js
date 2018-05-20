/**
 * [rc-Dialog]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 * 参数
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
		console.log(this.root);
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
