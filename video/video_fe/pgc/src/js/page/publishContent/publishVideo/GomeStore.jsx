/* css */
import 'css/page/video_uploader/srcsass/sass/module/iframestyle.scss';
import 'css/page/video_uploader/srcsass/sass/module/ueditor.scss';

import React, { Component } from 'react';

import TabSearch from '../../../../../config/bin/linkShop.js';
import pubsub from 'io/pubsub';

// var tabSearch = require('goods/tabSearch/index.js');

// var Pubsub = require('io/pubsub.js');

// var pubName = require('io/channel');

class GomeStore extends Component{
	constructor(props){
		super(props);

    this.state = {
  		getCollectItem:'',
  		env:'dev',
  		pubsubName: 'Link',
			shop_arr: [],
			shop_html: [],
			init: true,
			resData: {}
    }
	}

	temphtml = (shop_arr) => {
		let	shop_html = [];
		// console.log(shop_arr)
		shop_arr.forEach((value, index) => {
			var list = value;
			shop_html.push(
				<div className="paste" key={index}>
						<em onClick={() => this.handleDel(index, list.skuId)} className="icon-4 del"></em>
						<img src={list.img}/>
						<div className="paste-right">
								<h6>{list.title}</h6>
								<p className="price">¥{list.price}</p>
								<a href={list.link}><span>查看详情</span></a>
						</div>
				</div>
			);
		})

		this.setState({
			shop_html : shop_html
		})
	}

	unique = (arr) => {
    var unique = {};
    arr.forEach(function(a){ unique[ JSON.stringify(a) ] = 1 });
    arr= Object.keys(unique).map(function(b){return JSON.parse(b)});
    return arr
	}

	handleDel = (index, skuId) => {
		let shop_arr = this.state.shop_arr;

		shop_arr.splice(index, 1);

		delete this.state.resData[skuId];
		this.temphtml(shop_arr);
	}

  onClick = () => {
			let reqData = this.state.resData;
      TabSearch.tabSearch(reqData,9,this.state);
  }

  componentDidMount() {
		let shop_arr = this.state.shop_arr,
				shop_html = this.state.shop_html,
				_this = this;

  	window.Comm_Pubsub(this.state.pubsubName).sub(function(data) {
				console.log(data)
				for (var list in data) {
					shop_arr.push(data[list]);
				}

				shop_arr = _this.unique(shop_arr);

				_this.setState({
					resData : data,
					shop_arr : shop_arr
				}, () => {
					_this.temphtml(shop_arr);
				})
  	})
  }

  render() {
    return (
			<div className="form-group">
					<label>
							<span className="color-rad">*</span>
							添加商品：
					</label>
					<div className="form-input">
							<div className="shop-list clearfix">
									{this.state.shop_html}
							</div>

							<div className="add-shop" onClick={this.onClick}>
								<em className="icon-7"></em>添加
							</div>
					</div>
			</div>
    )
  }
}

export default GomeStore;
