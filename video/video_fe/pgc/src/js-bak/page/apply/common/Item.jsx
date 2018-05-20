/**
 * [Item]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, { Component } from 'react';
import FormGroup from './FormGroup.jsx';

class Item extends Component{
	constructor(props){
		super(props);
	}

	render(){
		let itemKey = this.props.itemKey;
		let data = this.props.data;
		let title = this.props.itemTile;
		let itemName = data.itemName;
		let formGroups = [];

		if (title) {
			formGroups.push(<div key={'t'+itemKey} className="apply-title">{title}</div>);
		}
		data.map((v,k) => {
			let formKey = itemKey+'-'+k;
			formGroups.push(<FormGroup  onFocus={this.props.onFocus} onBlur={this.props.onBlur} onChange={this.props.onChange} key={formKey} data={v} />);
		});
		return (
			<div>
				{formGroups}
			</div>
		)
	}
}

export default Item;