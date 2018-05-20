/**
 * [Confirm]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 * 组件通过renderDialog在页面render。基于Dialog组件。
 * 使用方法：
 * Confirm组件导出的是一个方法，参数可以是string和json。
 * confirm('提示内容');
 * confirm({
 * 		content: '提示内容', // 必填，提示内容
 *		tips: '',         // 可省略，个别场景需要的内容小提示
 * 		root: 'body',    // 可省略，配置的插槽节点
 *		style: null,     // 可省略，行内样式
 *		visible: true,   // 可省略，是否显示
 *		exist: false,    // 可省略，节点是否保留，如果为true，则只控制显示隐藏。false，会移除节点。
 *		showMask: true,  // 可省略，是否显示蒙层。
 *		okValue: '确定',  // 可省略，确定按钮的文案
 *		cancelValue: '取消', // 可省略，取消按钮的文案
 *		onOk: noop,       // 可省略，点击确认按钮执行的方法
 *		onCancel: noop,   // 可省略，点击取消按钮执行的方法
 *		onClose: noop     // 可省略，点击关闭按钮执行的方法
 * })
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'components/Dialog';
import renderDialog from 'components/renderDialog';

let noop = function(){};

class Confirm extends Component{

	constructor(props){
		super(props);
		this.state = {
			visible: this.props.visible
		}
	}

	componentWillReceiveProps({visible}){
		this.setState({visible});
	}

	onOk = ()=>{
		this.setState({
			visible:false
		}, ()=>{
			this.props.onOk();
		})
	}

	onCancel = ()=>{
		this.setState({
			visible: false
		}, ()=>{
			this.props.onCancel();
		});
	}

	onClose = ()=>{
		this.props.onClose();
	}

	render(){

		let content = this.props.content ? (<p>{this.props.content}</p>) : '';
		let tips = this.props.tips ? (<span>{this.props.tips}</span>) : null;
		return (
			<Dialog 
				root={this.props.root} 
				style={this.props.style} 
				visible={this.state.visible} 
				exist={this.props.exist}
				showMask={this.props.showMask}
				onClose={this.onClose}
			>
				<div className="dialog-content">{content}{tips}</div>
				<div className="dialog-footer">
					<button className="btn sure-btn" onClick={this.onOk}>{this.props.okValue}</button>
					<button className="btn cancel-btn" onClick={this.onCancel}>{this.props.cancelValue}</button>
				</div>
			</Dialog>
		)
	}
}

Confirm.propTypes = {
	content: PropTypes.string.isRequired,
}

Confirm.defaultProps = {
	root: 'body',
	style: null,
	visible: true,
	showMask: true,
	exist: false,
	tips: '',
	okValue: '确定',
	cancelValue: '取消',
	onOk: noop,
	onCancel: noop,
	onClose: noop
}


export default (options)=>{
	if(typeof options === 'string'){
		options = {content: options};
	}
	renderDialog(<Confirm {...options} />);
};