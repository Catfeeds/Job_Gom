/**
 * [面包屑导航]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import 'css/components/crumbs.scss';
import React, { Component } from 'react';

class Crumbs extends Component{
	constructor(props){
		super(props);
		this.state = {
			show: false,
			maps:[]
		};
	}

	render(){
		let maps = this.state.maps;
		let mapsLen = maps.length;
		let showCrumbs = this.state.show && maps.length > 1;
		let navs = [];

		if (showCrumbs) {
			maps.map((v,i)=>{
				if (i < mapsLen-1) {
					navs.push(<Link to={v.url}>{v.title}</Link>);
					navs.push(<span>&gt;</span>);
				}else{
					navs.push(<b>{v.title}</b>);
				}
			});
			return (
				<div className="crumbs">
					{navs}
				</div>
			);
		}else{
			return null;
		}
		
	}
}

export default Crumbs;