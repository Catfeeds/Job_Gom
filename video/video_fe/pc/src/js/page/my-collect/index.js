/* css */
import 'css/page/my-collect/index.scss';

/* header and footer */
import 'widgets/head/index.js';
import 'widgets/footer/index.js';

import fetch from 'io/fetch';
import React from 'react';
import ReactDom from 'react-dom';
import overflowStr from  'util/overflowStr';
import backTop from 'plugin/backTop.js';
import formatMsToDuration from 'util/formatMsToDuration.js';

import { loginFlag, page as CommonConfig, apiParams } from 'util/phpCommon';
var inParams = '?' + apiParams.inParams;

class Card extends React.Component {
	constructor(props){
		super(props);
	}

	handleDel = (e) => {
		e.stopPropagation();
		e.preventDefault();
		var data = this.props.data;
		this.props.onDel(data.collect_id, data);
	}

	render() {
		var card = this.props.data || {};
		var video_info = card.video_info || {};
		var publisher = video_info.publisher || {};
		var topicUrl = '/v/' + video_info.id + '.html';
		var title = overflowStr(video_info.title,35);
		var time = null;
		if(video_info.video_type == 1){ // 点播
			time = <span className="time">{formatMsToDuration(video_info.length)}</span>
		} else { // 直播
			topicUrl = '/s/' + video_info.id + '.html';
		}
		return (
			<li>
				<div className="img">
					<a href={topicUrl} target="_blank">
						<img src={video_info.image} />
						<em className="icon-13" onClick={this.handleDel}></em>
						{time}
						{video_info.online != 2 ? <span className="offline">已下线</span> : null}
					</a>
				</div>
				<a href={topicUrl}  target="_blank" className="list-title">{title}</a>
				<div className="num">
					<a href={'/sub/' + publisher.id + '.html'}  target="_blank" className="list-name">
						<img src={publisher.icon} />
						<span>{publisher.name}</span>
					</a>
				</div>
			</li>
		);
	}
}

class CardList extends React.Component{
	constructor(props){
		super(props);
		this.delList = [];
	}

	handleDel = (id, data) => {
		if(this.delList.indexOf(id) === -1){
			this.delCollect(id);
		}
	}

	delCollect(id){
		var that = this;
		var restore = function(){
			var delList = that.delList;
			var index = delList.indexOf(id);
			// 恢复数组
			if(index != -1){
				delList.splice(index, 1);
			}
		};

		fetch.get('v1/video/deleteCollect' + inParams, {
			domain: 'domain-sault',
			data: {
				ids: id
			}
		}).then(function(json){
			if(json && json.code === 200){
				that.props.onDel(id);
			} else {
				restore();
			}
		}).catch(function(){
			restore();
			// toast 提示删除失败?
		});
	}

	render(){
		var that = this;
		return (
			<ul className="clearfix list-card">
				{
					this.props.list.map(function(data){
						return (<Card data={data} key={data.collect_id} onDel={that.handleDel} />);
					})
				}
			</ul>
		);
	}
}

class ListContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			list: [],
			status: 'loading' // loading, done, fail, finished -> 没有更多数据
		};
		this.data = {
			size: 12/*,
			cursor: ''*/
		};
		this.url = 'v1/video/collectList' + inParams;
	}

	componentDidMount(){
		this.load();
		new backTop(); // 回到顶部
	}

	load(){
		var that = this;
		this.setState({
			status: 'loading'
		}, function(){
			fetch.get(this.url, {
				domain: 'domain-sault',
				data: this.data
			}).then(function(json){
				var status = 'done';
				var list = that.state.list;
				if(json && json.code === 200){
					var data = json.data || {};
					var total = data.total;
					var collect_data = data.collect_data || [];
					if(data.cursor){
						that.data.cursor = data.cursor;	
					}					 
					
					list = list.concat(collect_data);
					if(list.length === total){
						status = 'finished';
					}
				} else {
					status = 'fail';
				}
				that.setState({
					status: status,
					list: list
				});
			}).catch(function(){
				that.setState({
					status: 'fail'
				});
			});
		});
	}

	_getText() {
    	var text = '点击加载更多';
    	var status = this.state.status;
    	if(status === 'loading'){
    		text = '加载中...';
    	} else if(status === 'finished'){
    		text = '没有更多数据了';
    	}
    	return text;
    }

    handleClick = (e) => {
    	e.preventDefault();
    	var status = this.state.status;
        if(status !== 'finished' && status !== 'loading'){
	        this.load();
        }
    }

    handelDel = (id) => {
    	var list = this.state.list;
    	var status = this.state.status;
		for(var i = 0, len = list.length; i < len; i++){
			if(list[i].collect_id === id){
				list.splice(i, 1);
				break;
			}
		}
		this.setState({
			list: list
		});
    }

	render(){
		var card = null;
		var list = this.state.list;
		var status = this.state.status;
		var load = null;
		
		if(list.length){
			card = (<CardList list={list} onDel={this.handelDel} />);
			if(status !== 'finished'){
				load = (
					<div className="exchange">
	    				<a href="#" onClick={this.handleClick}>{this._getText()}</a>
	    			</div>
	    		);
    		}
		} else {
			if(status !== 'loading'){
				card = <div className="no-data col"><p>您还没有收藏过任何内容哦</p></div>
			}
		}
		return (
			<div className="list">
				{card}
				{load}
			</div>
		);
	}
}

ReactDom.render(<ListContainer /> ,
    document.getElementById('list-container')
);
