/**
 * [Alert]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 * 组件通过renderDialog在页面render。基于Dialog组件。
 * 使用方法：
 * Alert组件导出的是一个方法，参数可以是string和json。
 * alert('提示内容');
 * alert({
 * 		content: '提示内容', // 必填，提示内容
 * 		root: 'body',    // 可省略，配置的插槽节点
 *		style: null,     // 可省略，行内样式
 *		visible: true,   // 可省略，是否显示
 *		exist: false,    // 可省略，节点是否保留，如果为true，则只控制显示隐藏。false，会移除节点。
 *		showMask: true,  // 可省略，是否显示蒙层。
 *		okValue: '确定',  // 可省略，按钮的文案
 *		onOk: noop,       // 可省略，点击按钮执行的方法
 *		onClose: noop     // 可省略，点击关闭按钮执行的方法
 * })
 * 
 */
import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import Dialog from 'components/Dialog';
import renderDialog from 'components/renderDialog';

let noop = function(){};

class Alert extends Component{

	constructor(props){
		super(props);
		this.state = {
			visible: this.props.visible
		}
	}

	componentWillReceiveProps({visible}){
		this.setState({ visible });
	}

	onOk = ()=>{
		this.setState({
			visible:false
		}, ()=>{
			this.props.onOk();
		})
	}

	onClose = ()=>{
		this.props.onClose();
	}

	render(){
		return (
			<Dialog
				root={this.props.root}
				style={this.props.style}
				visible={this.state.visible}
				exist={this.props.exist}
				showMask={this.props.showMask}
				onClose={this.onClose}
			>
				<div className="dialog-content"><p>{this.props.content}</p></div>
				<div className="dialog-footer">
					<button className="btn sure-btn" onClick={this.onOk}>{this.props.okValue}</button>
				</div>
			</Dialog>
		)
	}
}

Alert.propTypes = {
	content: PropTypes.string.isRequired,
}

Alert.defaultProps = {
	root: 'body',
	style: null,
	visible: true,
	exist: false,
	showMask: true,
	okValue: '确定',
	onOk: noop,
	onClose: noop
}

export default (options)=>{
	if(typeof options === 'string'){
		options = {content: options};
	}
	renderDialog(<Alert {...options} />);
};
