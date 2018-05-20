/**
 * [Confirm]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'components/Dialog';

let noop = function(){};

class Confirm extends Component{

	constructor(props){
		super(props);
		this.okValue = this.props.okValue;
		this.cancelValue = this.props.cancelValue;
		this.state = {
			visible: this.props.visible
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			visible: nextProps.visible
		});
	}

	onOk = ()=>{
		this.setState({
			visible:false
		}, ()=>{
			this.props.onOk(this.onClose);
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

		let defaultFooter = [
			<button key="1" className="btn sure-btn" onClick={this.onOk}>{this.okValue}</button>,
			<button key="2" className="btn cancel-btn" onClick={this.onCancel}>{this.cancelValue}</button>
		];

		let content = this.props.content ? (<p>{this.props.content}</p>) : '';
		let tips = this.props.tips ? (<span>{this.props.tips}</span>) : '';
		let footer = this.props.footer || defaultFooter;


		return (
			<Dialog 
				root={this.props.root} 
				style={this.props.style} 
				visible={this.state.visible} 
				exist={this.props.exist}
				onClose={this.onClose}
			>
				<div className="dialog-content">{content}{tips}</div>
				<div className="dialog-footer">
					{footer}
				</div>
			</Dialog>
		)
	}
}

Confirm.propTypes = {
	visible: PropTypes.bool.isRequired,
	content: PropTypes.string.isRequired,
	footer: PropTypes.node,
}

Confirm.defaultProps = {
	root: 'body',
	style: null,
	visible: false,
	exist: false,
	tips: '',
	okValue: '确定',
	cancelValue: '取消',
	onOk: noop,
	onCancel: noop,
	onClose: noop
}


export default Confirm;