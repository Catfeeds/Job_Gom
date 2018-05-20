/**
 * [loading page]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import 'css/components/loading-box.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Loading extends Component{
	constructor(props){
		super(props);
	}

	render(){
		if (this.props.showLoading) {
			return (
				<div className="pgc-loading-box"><span className="icon-20"></span></div>
			)
		}
		return false;
	}
}

function mapStateToProps(state){
	return {
		showLoading: state.reducers.loadingBox.showLoading
	}
}

let LoadingBox = connect(mapStateToProps)(Loading);

export default LoadingBox;
